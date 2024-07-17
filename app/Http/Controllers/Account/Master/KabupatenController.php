<?php

namespace App\Http\Controllers\Account\Master;

use App\Http\Controllers\Controller;
use App\Models\Kabupaten;
use Illuminate\Http\Request;

class KabupatenController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
  
        //get kabupatens
        $kabupatens = Kabupaten::when(request()->q, function($kabupatens) {
            $kabupatens = $kabupatens->where('name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $kabupatens->appends(['q' => request()->q]);

        //return inertia
        return inertia('Account/Kabupatens/Index', [
            'kabupatens' => $kabupatens,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Account/Kabupatens/Create');
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
   
        ]);



         //upload image
 
         //create category
         Kabupaten::create([
             'name'          => $request->name,
  
         ]);

        //redirect
        return redirect()->route('account.kabupatens.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Kabupaten $kabupaten)
    {
        return inertia('Account/Kabupatens/Edit', [
            'kabupaten' => $kabupaten,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kabupaten $kabupaten)
    {
      
        /**
         * validate
         */
        $this->validate($request, [
            'name'              => 'required',

        ]);

       

        //update kabupaten without image
        $kabupaten->update([
            'name'              => $request->name,
        ]);

        //redirect
        return redirect()->route('account.kabupatens.index');
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
        $kabupaten = Kabupaten::findOrFail($id);


        //delete
        $kabupaten->delete();

        //redirect
        return redirect()->route('account.kabupatens.index');
    }
}
