<?php

namespace App\Http\Controllers\Account\Master;

use App\Http\Controllers\Controller;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use Illuminate\Http\Request;

class KecamatanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
  
        //get kecamatans
        $kecamatans = Kecamatan::when(request()->q, function($kecamatans) {
            $kecamatans = $kecamatans->where('name', 'like', '%'. request()->q . '%');
        })->with('kabupaten')->latest()->paginate(10);

        //append query string to pagination links
        $kecamatans->appends(['q' => request()->q]);

     
        //return inertia
        return inertia('Account/Kecamatans/Index', [
            'kecamatans'    => $kecamatans,
        
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


   
        return inertia('Account/Kecamatans/Create',[
            'kabupatens'    => $kabupatens
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
            'kabupaten_id'      => 'required',
   
        ]);



         //upload image
 
         //create category
         Kecamatan::create([
            'name'          => $request->name,
            'kabupaten_id'  => $request->kabupaten_id
         ]);

        //redirect
        return redirect()->route('account.kecamatans.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Kecamatan $kecamatan)
    {
        $kabupatens = Kabupaten::select('name as label', 'id as value')->get();
        return inertia('Account/Kecamatans/Edit', [
            'kecamatan' => $kecamatan,
            'kabupatens'    => $kabupatens
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kecamatan $kecamatan)
    {
      
        /**
         * validate
         */
        $this->validate($request, [
            'name'              => 'required',
            'kabupaten_id'      => 'required',

        ]);

       

        //update kecamatan without image
        $kecamatan->update([
            'name'              => $request->name,
            'kabupaten_id'  => $request->kabupaten_id
        ]);

        //redirect
        return redirect()->route('account.kecamatans.index');
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
        $kecamatan = Kecamatan::findOrFail($id);


        //delete
        $kecamatan->delete();

        //redirect
        return redirect()->route('account.kecamatans.index');
    }
}
