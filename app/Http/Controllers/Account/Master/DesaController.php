<?php

namespace App\Http\Controllers\Account\Master;

use App\Http\Controllers\Controller;
use App\Models\Desa;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use Illuminate\Http\Request;

class DesaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
  
        //get desas
        $desas = Desa::when(request()->q, function($desas) {
            $desas = $desas->where('name', 'like', '%'. request()->q . '%');
        })->with('kabupaten','kecamatan')->latest()->paginate(10);

        //append query string to pagination links
        $desas->appends(['q' => request()->q]);

     
        //return inertia
        return inertia('Account/Desas/Index', [
            'desas'    => $desas,
        
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


   
        return inertia('Account/Desas/Create',[
            'kabupatens'    => $kabupatens,
            'kecamatans'    => $kecamatans
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
            'kecamatan_id'       => 'required',
   
        ]);



         //upload image
 
         //create category
         Desa::create([
            'name'          => $request->name,
            'kabupaten_id'  => $request->kabupaten_id,
            'kecamatan_id'  => $request->kecamatan_id
         ]);

        //redirect
        return redirect()->route('account.desas.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Desa $desa)
    {
        $kabupatens = Kabupaten::select('name as label', 'id as value')->get();
        $kecamatans = Kecamatan::select('name as label', 'id as value')->get();
        return inertia('Account/Desas/Edit', [
            'desa' => $desa,
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
    public function update(Request $request, Desa $desa)
    {
      
        /**
         * validate
         */
        $this->validate($request, [
            'name'              => 'required',
            'kabupaten_id'      => 'required',
            'kecamatan_id'      => 'required',

        ]);

       

        //update desa without image
        $desa->update([
            'name'              => $request->name,
            'kabupaten_id'  => $request->kabupaten_id,
            'kecamatan_id'  => $request->kecamatan_id
        ]);

        //redirect
        return redirect()->route('account.desas.index');
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
        $desa = Desa::findOrFail($id);


        //delete
        $desa->delete();

        //redirect
        return redirect()->route('account.desas.index');
    }
}
