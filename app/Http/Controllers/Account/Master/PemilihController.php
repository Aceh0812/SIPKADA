<?php

namespace App\Http\Controllers\Account\Master;

use App\Http\Controllers\Controller;
use App\Models\Desa;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use App\Models\Pemilih;
use Illuminate\Http\Request;

class PemilihController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
  
        //get pemilihs
        $pemilihs = Pemilih::when(request()->q, function($pemilihs) {
            $pemilihs = $pemilihs->where('name', 'like', '%'. request()->q . '%');
        })->with('kabupaten','kecamatan','desa')->latest()->paginate(5);

        //append query string to pagination links
        $pemilihs->appends(['q' => request()->q]);

     
        //return inertia
        return inertia('Account/Pemilihs/Index', [
            'pemilihs'    => $pemilihs,
        
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
        
   
        return inertia('Account/Pemilihs/Create',[
            'kabupatens'    => $kabupatens,
            'kecamatans'    => $kecamatans,
            'desas'         => $desas
            
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
            'name'              => 'required',
            'ktp'               => 'required|min:16|max:16|unique:pemilihs',
            'kabupaten_id'      => 'required',
            'kecamatan_id'      => 'required',
            'desa_id'           => 'required'
            
   
        ]);



         //upload image
 
         //create category
         Pemilih::create([
            'name'          => $request->name,
            'ktp'           => $request->ktp,
            'address'       => $request->address,
            'phone'         => $request->phone,
            'kabupaten_id'  => $request->kabupaten_id,
            'kecamatan_id'  => $request->kecamatan_id,
            'desa_id'       => $request->desa_id,
            
         ]);

        //redirect
        return redirect()->route('account.pemilihs.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Pemilih $pemilih)
    {
        $kabupatens = Kabupaten::select('name as label', 'id as value')->get();
        $kecamatans = Kecamatan::select('name as label', 'id as value')->get();
        $desas = Desa::select('name as label', 'id as value')->get();
        
        // $pemilih = Pemilih::findOrFail($id);
  
        return inertia('Account/Pemilihs/Edit', [
            'desas' => $desas,
            'pemilih'   => $pemilih,
            'kabupatens'    => $kabupatens,
            'kecamatans'    => $kecamatans
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      
        /**
         * validate
         */
        $this->validate($request, [
            'name'              => 'required',
            'ktp'               => 'required|min:16|max:16',
            'kabupaten_id'      => 'required',
            'kecamatan_id'      => 'required',
            'desa_id'           => 'required'

        ]);

       

        //update desa without image
        $tps = [
            'name'              => $request->name,
            'ktp'               => $request->ktp,
            'address'           => $request->address,
            'phone'             => $request->phone,
            'kabupaten_id'      => $request->kabupaten_id,
            'kecamatan_id'      => $request->kecamatan_id,
            'desa_id'           => $request->desa_id,
        ];

        Pemilih::whereId($id)->update($tps);

        //redirect
        return redirect()->route('account.pemilihs.index');
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
        $pemilihs = Pemilih::findOrFail($id);


        //delete
        $pemilihs->delete();

        //redirect
        return redirect()->route('account.pemilihs.index');
    }
}
