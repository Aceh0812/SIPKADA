<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{    
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //return inertia
        return inertia('Auth/Login');
    }
    
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
     
        //set validation
        $request->validate([
            'email'     => 'required|email',
            'password'  => 'required',
        ]);

         //get email and password from request
         $credentials = $request->only('email', 'password');

         //attempt to login
         if (auth()->attempt($credentials)) {
            $auth_user = Auth::user()->type_user;
             //regenerate session
             $request->session()->regenerate();
            if($auth_user == 2 || $auth_user == 1){
                //redirect route dashboard
                return redirect()->route('account.quickcounts.list');
                
            }
            return redirect()->route('account.dashboard');
         }
 
         //if login fails
         return back()->withErrors([
             'email' => 'The provided credentials do not match our records.',
         ]);
    }
}