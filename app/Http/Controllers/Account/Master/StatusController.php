<?php

namespace App\Http\Controllers\Account\Master;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    
    public function index()
    {
  
        //get statuses
        $statuses = Status::when(request()->q, function($statuses) {
            $statuses = $statuses->where('name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $statuses->appends(['q' => request()->q]);

        //return inertia
        return inertia('Account/Status/Index', [
            'statuses' => $statuses,
        ]);
    }

  
    public function create()
    {
        return inertia('Account/Status/Create');
    }

   
    public function store(Request $request)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'name'          => 'required|unique:statuses',
        ]);



        //create status
        Status::create([
            'name'          => $request->name,
        ]);

        //redirect
        return redirect()->route('account.statuses.index');
    }

  
    public function edit(Status $status)
    {
        return inertia('Account/Status/Edit', [
            'status' => $status,
        ]);
    }

   
    public function update(Request $request, Status $status)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'name'          => 'required|unique:statuses,name,'.$status->id,
        ]);


        //update status 
        $status->update([
            'name'          => $request->name,
        ]);

        //redirect
        return redirect()->route('account.statuses.index');
    }

   
    public function destroy($id)
    {
        //find by ID
        $status = Status::findOrFail($id);


        //delete
        $status->delete();

        //redirect
        return redirect()->route('account.statuses.index');
    }
}
