<?php

namespace App\Http\Controllers\Account\Master;

use App\Http\Controllers\Controller;
use App\Models\Calon;
use Illuminate\Http\Request;

class CalonController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
  
        //get calons
        $calons = Calon::when(request()->q, function($calons) {
            $calons = $calons->where('name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $calons->appends(['q' => request()->q]);

        //return inertia
        return inertia('Account/Calons/Index', [
            'calons' => $calons,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Account/Calons/Create');
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
            'no_urut'           => 'required',
        ]);



         //upload image
 
         //create category
         Calon::create([
             'name'          => $request->name,
             'no_urut'          => $request->no_urut,
         ]);

        //redirect
        return redirect()->route('account.calons.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Calon $calon)
    {
        return inertia('Account/Calons/Edit', [
            'calon' => $calon,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Calon $calon)
    {
      
        /**
         * validate
         */
        $this->validate($request, [
            'name'              => 'required',
            'no_urut'           => 'required'
        ]);

       

        //update calon without image
        $calon->update([
            'name'              => $request->name,
            'no_urut'           => $request->no_urut,
        ]);

        //redirect
        return redirect()->route('account.calons.index');
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
        $category = Calon::findOrFail($id);


        //delete
        $category->delete();

        //redirect
        return redirect()->route('account.calons.index');
    }
}
