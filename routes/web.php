<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [\App\Http\Controllers\Auth\LoginController::class, 'index'])->name('login')->middleware('guest');
Route::get('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'index'])->name('register')->middleware('guest');
Route::post('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'store'])->name('register.store');
Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'store'])->name('login.store')->middleware('guest');
//route logout
Route::post('/logout', \App\Http\Controllers\Auth\LogoutController::class)->name('logout')->middleware('auth');
Route::prefix('account')->group(function() {
    //middleware "auth"
    Route::group(['middleware' => ['auth']], function () {
        //route dashboard
        Route::get('/dashboard', App\Http\Controllers\Account\DashboardController::class)->name('account.dashboard')->middleware('role_or_permission:dashboard.index');
        
        //route permissions
        Route::get('/permissions', \App\Http\Controllers\Account\PermissionController::class)->name('account.permissions')
        ->middleware('role_or_permission:permissions.index');
    
        //route resource roles
        Route::resource('/roles', \App\Http\Controllers\Account\RoleController::class, ['as' => 'account'])
            ->middleware('role_or_permission:roles.index|roles.create|roles.edit|roles.delete');
        
        //route resource users
        Route::resource('/users', \App\Http\Controllers\Account\Master\UserController::class, ['as' => 'account'])
            ->middleware('role_or_permission:users.index|users.create|users.edit|users.delete');
            
        //route resource categories
        Route::resource('/calons', \App\Http\Controllers\Account\Master\CalonController::class, ['as' => 'account'])
        ->middleware('role_or_permission:calons.index|calons.create|calons.edit|calons.delete');
        
        //route resource categories
        Route::resource('/saksis', \App\Http\Controllers\Account\Master\SaksiController::class, ['as' => 'account'])
        ->middleware('role_or_permission:saksis.index|saksis.create|saksis.edit|saksis.delete');
        //route resource kabupatens
        Route::resource('/kabupatens', \App\Http\Controllers\Account\Master\KabupatenController::class, ['as' => 'account'])
        ->middleware('role_or_permission:kabupatens.index|kabupatens.create|kabupatens.edit|kabupatens.delete');
        //route resource kecamatans
        Route::resource('/kecamatans', \App\Http\Controllers\Account\Master\KecamatanController::class, ['as' => 'account'])
        ->middleware('role_or_permission:kecamatans.index|kecamatans.create|kecamatans.edit|kecamatans.delete');
        //route resource desas
        Route::resource('/desas', \App\Http\Controllers\Account\Master\DesaController::class, ['as' => 'account'])
        ->middleware('role_or_permission:desas.index|desas.create|desas.edit|desas.delete');

        Route::get('/gettps', [\App\Http\Controllers\Account\Master\TpsController::class, 'getTps'])->name('account.gettps');
        //route resource tpses
        Route::resource('/tpses', \App\Http\Controllers\Account\Master\TpsController::class, ['as' => 'account'])
        ->middleware('role_or_permission:tpses.index|tpses.create|tpses.edit|tpses.delete');
        //route resource pemilihs
        Route::resource('/pemilihs', \App\Http\Controllers\Account\Master\PemilihController::class, ['as' => 'account'])
        ->middleware('role_or_permission:pemilihs.index|pemilihs.create|pemilihs.edit|pemilihs.delete');
        //route quickcounts
        Route::get('/list-quickcounts', [App\Http\Controllers\Account\QuickCountController::class, 'getQuickCount'])->name('account.quickcounts.list')
        ->middleware('role_or_permission:quickcount-lists.index');

        //route resource quickcounts
        Route::resource('/quickcounts', \App\Http\Controllers\Account\QuickCountController::class, ['as' => 'account'])
        ->middleware('role_or_permission:quickcounts.index');
  });
});