<?php

namespace App\Http\Controllers\Account\Master;

use App\Models\Saksi;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get users
        $users = User::when(request()->q, function($users) {
            $users = $users->where('name', 'like', '%'. request()->q . '%');
        })->with('roles')->latest()->paginate(5);
        
        //append query string to pagination links
        $users->appends(['q' => request()->q]);

        //return inertia
        return inertia('Account/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //get roles
        $roles = Role::all();

        //saksi
        $saksis = Saksi::select('name as label', 'id as value')->get();

        //return inertia
        return inertia('Account/Users/Create', [
            'roles'     => $roles,
            'saksis'    => $saksis
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
         * Validate request
         */
        $this->validate($request, [
            'name'     => 'required',
            'email'    => 'required|unique:users',
            'password' => 'required|confirmed',
            'type_user'=> 'required',
        ]);

        /**
         * Create user
         */
        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'saksi_id'  => $request->saksi_id,
            'password'  => bcrypt($request->password),
            'type_user' => $request->type_user,
            'saksi_id'  => $request->saksi_id,
        ]);

        //assign roles to user
        $user->assignRole($request->roles);

        //redirect
        return redirect()->route('account.users.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //get user
        $user = User::with('roles')->findOrFail($id);

        //get roles
        $roles = Role::all();

        //return inertia
        return inertia('Account/Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        // dd($user->id);
        /**
         * validate request
         */
        $this->validate($request, [
            'name'     => 'required',
            'email'    => 'required|unique:users,email,'.$user->id,
            'password' => 'nullable|confirmed' 
        ]);

        /**
         * check password is empty
         */
        if(Auth::user()->type_user != 1){
            if($request->password == '') {

                $user->update([
                    'name'     => $request->name,
                    'saksi_id' => $request->saksi_id,
                    'email'    => $request->email,
                    'type_user'=> $request->type_user,
                ]);
    
            } else {
                    
                $user->update([
                    'name'     => $request->name,
                    'saksi_id' => $request->saksi_id,
                    'email'    => $request->email,
                    'type_user'=> $request->type_user,
                    'password' => bcrypt($request->password)
                ]);
                
            }
    
            //assign roles to user
            $user->syncRoles($request->roles);
        }
       

        //redirect
        return redirect()->route('account.users.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //find user
        $user = User::findOrFail($id);

        //delete user
        $user->delete();

        //redirect
        return redirect()->route('account.users.index');
    }
}