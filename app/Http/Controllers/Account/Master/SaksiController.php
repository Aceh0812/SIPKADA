<?php

namespace App\Http\Controllers\Account\Master;

use App\Http\Controllers\Controller;
use App\Models\Desa;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use App\Models\Saksi;
use App\Models\Tps;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class SaksiController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
  
        //get saksis
        $saksis = Saksi::when(request()->q, function($saksis) {
            $saksis = $saksis->where('name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(10);

        //append query string to pagination links
        $saksis->appends(['q' => request()->q]);

        //return inertia
        return inertia('Account/Saksis/Index', [
            'saksis' => $saksis,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $kabupatens = Kabupaten::select('name as label', 'id as value')->get();
        $kecamatans = Kecamatan::select('name as label', 'id as value')->get();
        $desas = Desa::select('name as label', 'id as value')->get();
        $tpses = Tps::select('tps as label', 'id as value')->get();
        return inertia('Account/Saksis/Create',[
            'kabupatens'    => $kabupatens,
            'kecamatans'    => $kecamatans,
            'desas'         => $desas,
            'tpses'         => $tpses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'ktp'               => 'required|image|mimes:jpeg,jpg,png|max:2000',
            'name'              => 'required',
            'phone'             => 'required',
            'address'           => 'required',
            'tps_id'            => 'required',
            'kabupaten_id'      => 'required',
            'kecamatan_id'      => 'required',
            'desa_id'           => 'required',
        ]);



         //upload image
         $image = $request->file('ktp');
         $image->storeAs('public/Saksis', $image->hashName());
 
         //create category
         $saksi = Saksi::create([
             'ktp'          => $image->hashName(),
             'name'         => $request->name,
             'address'      => $request->address,
             'phone'        => $request->phone,
             'tps_id'       => $request->tps_id,
             'kabupaten_id' => $request->kabupaten_id,
             'kecamatan_id' => $request->kecamatan_id,
             'desa_id'      => $request->desa_id,
         ]);
         $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
            'saksi_id'  => $saksi->id,
            'type_user' => 2,
        ]);

        Tps::where('id', $request->tps_id)->where('desa_id', $request->desa_id)->update([
            'status_saksi_tps' => 1
        ]);
        //assign roles to user
        $user->assignRole(3);

        //redirect
        return redirect()->route('account.saksis.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Saksi $saksi)
    {
        $kabupatens = Kabupaten::select('name as label', 'id as value')->get();
        $kecamatans = Kecamatan::select('name as label', 'id as value')->get();
        $desas = Desa::select('name as label', 'id as value')->get();
        $tpses = Tps::select('tps as label', 'id as value')->get();
        $user = User::where('saksi_id', $saksi->id)->first();
  
        return inertia('Account/Saksis/Edit', [
            'saksi' => $saksi,
            'kabupatens'    => $kabupatens,
            'kecamatans'    => $kecamatans,
            'desas'         => $desas,
            'tpses'         => $tpses,
            'user'      => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Saksi $saksi)
    {
      
        /**
         * validate
         */
        $this->validate($request, [
            'name'              => 'required',
            'phone'             => 'required',
            'address'           => 'required',
            'tps_id'            => 'required',
            'kabupaten_id'      => 'required',
            'kecamatan_id'      => 'required',
            'desa_id'           => 'required',
            
        ]);

        //check image update
        if ($request->file('ktp')) {

            //remove old image
            Storage::disk('local')->delete('public/saksis/'.basename($saksi->image));

            //upload new image
            $image = $request->file('ktp');
            $image->storeAs('public/saksis', $image->hashName());

            //update saksi with new image
            $saksi->update([
                'ktp'           => $image->hashName(),
                'name'          => $request->name,
                'address'       => $request->address,
                'phone'         => $request->phone,
                'tps_id'        => $request->tps_id,
                'kabupaten_id'  => $request->kabupaten_id,
                'kecamatan_id'  => $request->kecamatan_id,
                'desa_id'       => $request->desa_id,
            ]);

        }

        //update saksi without image
        $saksi->update([
            'name'          => $request->name,
            'address'       => $request->address,
            'phone'         => $request->phone,
            'tps_id'        => $request->tps_id,
            'kabupaten_id'  => $request->kabupaten_id,
            'kecamatan_id'  => $request->kecamatan_id,
            'desa_id'       => $request->desa_id,
        ]);
        
        $user = User::where('saksi_id', $saksi->id)->first();
        if($request->password == '') {

            $user->update([
                'name'     => $request->name,
                'email'    => $request->email,
            ]);

        } else {
                
            $user->update([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => bcrypt($request->password)
            ]);
            
        }

        // //assign roles to user
        // $user->syncRoles($request->roles);
        //redirect
        return redirect()->route('account.saksis.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //find by ID
        $saksi = Saksi::findOrFail($id);


        //delete
        $saksi->delete();

        //redirect
        return redirect()->route('account.saksis.index');
    }
}
