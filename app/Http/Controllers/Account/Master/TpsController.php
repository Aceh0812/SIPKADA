<?php

namespace App\Http\Controllers\Account\Master;

use App\Http\Controllers\Controller;
use App\Models\Desa;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use App\Models\Tps;
use Illuminate\Http\Request;

class TpsController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get tpses
        $tpses = Tps::when(request()->q, function($tpses) {
            $tpses = $tpses->where('tps', 'like', '%'. request()->q . '%');
        })->with('kabupaten','kecamatan','desa')->latest()->paginate(5);

        //append query string to pagination links
        $tpses->appends(['q' => request()->q]);

     
        //return inertia
        return inertia('Account/Tpses/Index', [
            'tpses'    => $tpses,
        
        ]);
    }

    public function getTps(Request $request)
    {
        $tpses = Tps::select('tps as label', 'id as value')->where('desa_id', $request->desa_id)->where('status_saksi_tps', Null)->get();
        return response()->json($tpses);
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
   
        return inertia('Account/Tpses/Create',[
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
            'tps'               => 'required',
            'kabupaten_id'      => 'required',
            'kecamatan_id'      => 'required',
            'desa_id'           => 'required',
            'jumlah_dpt'        => 'required',
   
        ]);



         //upload image
 
         //create category
         Tps::create([
            'tps'           => $request->tps,
            'kabupaten_id'  => $request->kabupaten_id,
            'kecamatan_id'  => $request->kecamatan_id,
            'desa_id'       => $request->desa_id,
            'jumlah_dpt'    => $request->jumlah_dpt,
         ]);

        //redirect
        return redirect()->route('account.tpses.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $kabupatens = Kabupaten::select('name as label', 'id as value')->get();
        $kecamatans = Kecamatan::select('name as label', 'id as value')->get();
        $desas = Desa::select('name as label', 'id as value')->get();
        $tpsed = Tps::findOrFail($id);
  
        return inertia('Account/Tpses/Edit', [
            'desas' => $desas,
            'tpsed'   => $tpsed,
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
            'tps'               => 'required',
            'kabupaten_id'      => 'required',
            'kecamatan_id'      => 'required',
            'desa_id'           => 'required',
            'jumlah_dpt'        => 'required',

        ]);

       

        //update desa without image
        $tps = [
            'tps'               => $request->tps,
            'kabupaten_id'      => $request->kabupaten_id,
            'kecamatan_id'      => $request->kecamatan_id,
            'desa_id'           => $request->desa_id,
            'jumlah_dpt'        => $request->jumlah_dpt,
        ];

        Tps::whereId($id)->update($tps);

        //redirect
        return redirect()->route('account.tpses.index');
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
        $tpses = Tps::findOrFail($id);


        //delete
        $tpses->delete();

        //redirect
        return redirect()->route('account.tpses.index');
    }
}
