<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Calon;
use App\Models\Desa;
use App\Models\DetailQuickcount;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use App\Models\Quickcount;
use App\Models\Tps;
use DB;
use Auth;
use Illuminate\Http\Request;

class QuickCountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $auth_saksi = Auth::user()->id;
        //get saksi data
        
       
        $saksis = DB::table('users')
                    ->join('saksis', 'users.saksi_id', '=', 'saksis.id')
                    ->join('tps', 'saksis.tps_id', '=', 'tps.id')
                    ->join('desas', 'saksis.desa_id', '=', 'desas.id')
                    ->join('kecamatans', 'saksis.kecamatan_id', '=', 'kecamatans.id')
                    ->join('kabupatens', 'saksis.kabupaten_id', '=', 'kabupatens.id')
                    ->select(
                        'tps.tps',
                        'tps.status_tps',
                        'tps.id as tps_id',
                        'tps.jumlah_dpt',
                        'desas.name as desa_name',
                        'desas.id as desa_id',
                        'kabupatens.name as kabupaten_name',
                        'kabupatens.id as kabupaten_id',
                        'kecamatans.name as kecamatan_name',
                        'kecamatans.id as kecamatan_id'
                    )
                    ->where('users.id', $auth_saksi)
                    ->first();
             
        $calons = Calon::get();
        if($saksis == null || $saksis->status_tps == 1){
            return redirect()->route('account.quickcounts.list'); 
        }

        //return inertia view
        return inertia('Account/QuickCounts/Index', [
            'calons' => $calons,
            'saksis' => $saksis
        ]);
    }

    public function getQuickCount(Request $request)
    {
        $tps_id = $request->tps_id;
        $update_status = $request->update_status;
        $auth_type = Auth::user()->type_user;
        if($auth_type == 2) {
            $tpses = Tps::select('tps as label', 'id as value')->get();
                // Get quickcounts with join on tps table
                $quickcounts = Quickcount::when(request()->q, function($query) {
                $query->where('quickcounts.tps_id', 'like', '%' . request()->q . '%')
                    ->orWhere('tps.tps', 'like', '%' . request()->q . '%');
            })
            ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
            ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
            ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
            ->join('desas', 'tps.desa_id', '=', 'desas.id')
            ->select('quickcounts.*', 'tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
            ->orderBy('quickcounts.created_at', 'desc')
            ->where('user_id', Auth::user()->id)
            ->paginate(5);
    
    
            //append query string to pagination links
            $quickcounts->appends(['q' => request()->q]);
            if($tps_id == null){
    
            
                if($tps_id == null && $update_status == 1){
                    
                    $tpses = Tps::select('tps as label', 'id as value')->get();
                    // Get quickcounts with join on tps table
                        $quickcounts = Quickcount::when(request()->q, function($query) {
                        $query->where('quickcounts.tps_id', 'like', '%' . request()->q . '%')
                            ->orWhere('tps.tps', 'like', '%' . request()->q . '%');
                    })
                    ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
                    ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
                    ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
                    ->join('desas', 'tps.desa_id', '=', 'desas.id')
                    ->select('quickcounts.*', 'tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
                    ->where('tps.status_tps', 1)
                    ->orderBy('quickcounts.created_at', 'desc')
                    ->where('user_id', Auth::user()->id)
                    ->paginate(5);
    
                    //append query string to pagination links
                    $quickcounts->appends(['q' => request()->q]);
                    // Update TPS status
                    return inertia('Account/ListTps/Index', [
                        'quickcounts' => $quickcounts,
                        'tpses'       => $tpses,
                    ]);
                }else if($tps_id == null && $update_status == 0){
                    $tpses = Tps::select('tps as label', 'id as value')->get();
                    // Get quickcounts with join on tps table
                        $quickcounts = Quickcount::when(request()->q, function($query) {
                        $query->where('quickcounts.tps_id', 'like', '%' . request()->q . '%')
                            ->orWhere('tps.tps', 'like', '%' . request()->q . '%');
                    })
                    ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
                    ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
                    ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
                    ->join('desas', 'tps.desa_id', '=', 'desas.id')
                    ->select('quickcounts.*', 'tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
                    ->orderBy('quickcounts.created_at', 'desc')
                    ->where('user_id', Auth::user()->id)
                    ->paginate(5);
    
                    //append query string to pagination links
                    $quickcounts->appends(['q' => request()->q]);
                    // Update TPS status
                    return inertia('Account/ListTps/Index', [
                        'quickcounts' => $quickcounts,
                        'tpses'       => $tpses,
                    ]);
                }else if($tps_id == null && $update_status == null){{
                    return inertia('Account/ListTps/Index', [
                        'quickcounts' => $quickcounts,
                        'tpses'       => $tpses,
                    ]);
                }
                return inertia('Account/ListTps/Index', [
                    'quickcounts' => $quickcounts,
                    'tpses'       => $tpses,
                ]);
            }  
                
            }else{
                // Get quickcounts with join on tps table
                $quickcounts = Quickcount::when(request()->q, function($query) {
                    $query->where('quickcounts.tps_id', 'like', '%' . request()->q . '%')
                        ->orWhere('tps.tps', 'like', '%' . request()->q . '%');
                })
                ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
                ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
                ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
                ->join('desas', 'tps.desa_id', '=', 'desas.id')
                ->select('quickcounts.*', 'tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
                ->where('quickcounts.tps_id', $tps_id)
                ->orderBy('quickcounts.created_at', 'desc')
                ->where('user_id', Auth::user()->id)
                ->paginate(5);
    
    
                //append query string to pagination links
                $quickcounts->appends(['q' => request()->q]);
    
    
                return inertia('Account/ListTps/Index', [
                    'quickcounts' => $quickcounts,
                    'tpses'       => $tpses,
                ]);
            }
        }else{
            $tpses = Tps::select('tps as label', 'id as value')->get();
            // Get quickcounts with join on tps table
            $quickcounts = Quickcount::when(request()->q, function($query) {
             $query->where('quickcounts.tps_id', 'like', '%' . request()->q . '%')
                 ->orWhere('tps.tps', 'like', '%' . request()->q . '%');
         })
         ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
         ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
         ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
         ->join('desas', 'tps.desa_id', '=', 'desas.id')
         ->select('quickcounts.*', 'tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
         ->orderBy('quickcounts.created_at', 'desc')
         ->paginate(5);
 
 
         //append query string to pagination links
         $quickcounts->appends(['q' => request()->q]);
         if($tps_id == null){
 
         
             if($tps_id == null && $update_status == 1){
                
                 $tpses = Tps::select('tps as label', 'id as value')->get();
                 // Get quickcounts with join on tps table
                     $quickcounts = Quickcount::when(request()->q, function($query) {
                     $query->where('quickcounts.tps_id', 'like', '%' . request()->q . '%')
                         ->orWhere('tps.tps', 'like', '%' . request()->q . '%');
                 })
                 ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
                 ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
                 ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
                 ->join('desas', 'tps.desa_id', '=', 'desas.id')
                 ->select('quickcounts.*', 'tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
                 ->where('tps.status_tps', 1)
                 ->orderBy('quickcounts.created_at', 'desc')
                 ->paginate(5);
 
                   //append query string to pagination links
                 $quickcounts->appends(['q' => request()->q]);
                 // Update TPS status
                 return inertia('Account/ListTps/Index', [
                     'quickcounts' => $quickcounts,
                     'tpses'       => $tpses,
                 ]);
             }else if($tps_id == null && $update_status == 0){
                 $tpses = Tps::select('tps as label', 'id as value')->get();
                 // Get quickcounts with join on tps table
                     $quickcounts = Quickcount::when(request()->q, function($query) {
                     $query->where('quickcounts.tps_id', 'like', '%' . request()->q . '%')
                         ->orWhere('tps.tps', 'like', '%' . request()->q . '%');
                 })
                 ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
                 ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
                 ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
                 ->join('desas', 'tps.desa_id', '=', 'desas.id')
                 ->select('quickcounts.*', 'tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
                 ->orderBy('quickcounts.created_at', 'desc')
                 ->paginate(5);
 
                   //append query string to pagination links
                 $quickcounts->appends(['q' => request()->q]);
                 // Update TPS status
                 return inertia('Account/ListTps/Index', [
                     'quickcounts' => $quickcounts,
                     'tpses'       => $tpses,
                 ]);
             }else if($tps_id == null && $update_status == null){{
                 return inertia('Account/ListTps/Index', [
                     'quickcounts' => $quickcounts,
                     'tpses'       => $tpses,
                 ]);
             }
             return inertia('Account/ListTps/Index', [
                 'quickcounts' => $quickcounts,
                 'tpses'       => $tpses,
             ]);
         }  
            
         }else{
              // Get quickcounts with join on tps table
             $quickcounts = Quickcount::when(request()->q, function($query) {
                 $query->where('quickcounts.tps_id', 'like', '%' . request()->q . '%')
                     ->orWhere('tps.tps', 'like', '%' . request()->q . '%');
             })
             ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
             ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
             ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
             ->join('desas', 'tps.desa_id', '=', 'desas.id')
             ->select('quickcounts.*', 'tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
             ->where('quickcounts.tps_id', $tps_id)
             ->orderBy('quickcounts.created_at', 'desc')
             ->paginate(5);
 
 
             //append query string to pagination links
             $quickcounts->appends(['q' => request()->q]);
 
 
             return inertia('Account/ListTps/Index', [
                 'quickcounts' => $quickcounts,
                 'tpses'       => $tpses,
             ]);
         }
        }
       
        
       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tps_id'            => 'required|integer',
            'kabupaten_id'      => 'required|integer',
            'kecamatan_id'      => 'required|integer',
            'desa_id'           => 'required|integer',
            'suara_sah'         => 'required|integer',
            'suara_tidak_sah'   => 'required|integer',
            'total_suara'       => 'required|integer',
            'file'              => 'required|image|mimes:jpeg,jpg,png|max:2000',
            'calonVotes'        => 'required|array',
            'calonVotes.*.calon_id' => 'required|integer',
            'calonVotes.*.votes'    => 'required|integer',
        ]);
        
        //upload image
        $image = $request->file('file');
        $image->storeAs('public/Quickcounts', $image->hashName());

        // Create Quickcount entry
        $quickcount = Quickcount::create([
            'tps_id'            => $request->tps_id,
            'kabupaten_id'      => $request->kabupaten_id,
            'kecamatan_id'      => $request->kecamatan_id,
            'desa_id'           => $request->desa_id,
            'suara_sah'         => $request->suara_sah,
            'suara_tidak_sah'   => $request->suara_tidak_sah,
            'total_suara'       => $request->total_suara,
            'saksi_id'          => \Auth::user()->id,
            'user_id'           => \Auth::user()->id,
            'file'              => $image->hashName(),
        ]);

        // Store the quick count data
        foreach ($request->calonVotes as $voteData) {
            DetailQuickcount::create([
                'quickcount_id' => $quickcount->id,
                'calon_id' => $voteData['calon_id'],
                'total_suara_calon' => $voteData['votes'],
            ]);
        }

        // Update TPS status
        Tps::whereId($request->tps_id)->update(['status_tps' => 1]);

        //redirect
        return redirect()->route('account.quickcounts.list');
    }

  

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
        $auth_saksi = Auth::user()->id;
        //get saksi data
        

        $saksis = DB::table('users')
                    ->join('saksis', 'users.saksi_id', '=', 'saksis.id')
                    ->join('tps', 'saksis.tps_id', '=', 'tps.id')
                    ->join('desas', 'saksis.desa_id', '=', 'desas.id')
                    ->join('kecamatans', 'saksis.kecamatan_id', '=', 'kecamatans.id')
                    ->join('kabupatens', 'saksis.kabupaten_id', '=', 'kabupatens.id')
                    ->select(
                        'tps.tps',
                        'tps.status_tps',
                        'tps.id as tps_id',
                        'tps.jumlah_dpt',
                        'desas.name as desa_name',
                        'desas.id as desa_id',
                        'kabupatens.name as kabupaten_name',
                        'kabupatens.id as kabupaten_id',
                        'kecamatans.name as kecamatan_name',
                        'kecamatans.id as kecamatan_id'
                    )
                    ->where('users.id', $auth_saksi)
                    // ->where('tps.id', $id)
                    ->first();
            $quickcount = DB::table('quickcounts')
                        ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
                        ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
                        ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
                        ->join('desas', 'tps.desa_id', '=', 'desas.id')
                        ->select('quickcounts.*', 'tps.jumlah_dpt','tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
                        ->where('quickcounts.tps_id', $id) 
                        ->first();
            $quickcount_details = DB::table('detail_quickcounts')
                        ->join('calons', 'detail_quickcounts.calon_id', '=', 'calons.id')
                        ->select('detail_quickcounts.*', 'calons.name as calon_name') // Adjust select as needed
                        ->where('detail_quickcounts.quickcount_id', $quickcount->id) 
                        ->get();
               
        $calons = Calon::get();
   
        //return inertia view
        return inertia('Account/ListTps/Edit', [
            'calons' => $calons,
            'saksis' => $saksis,
            'quickcount'   =>   $quickcount,
            'quickcount_details'    => $quickcount_details
        ]);
        
    }

    public function show(string $id)
    {
        
        $auth_saksi = Auth::user()->id;
        //get saksi data
        

        // $saksis = DB::table('users')
        //             ->join('saksis', 'users.saksi_id', '=', 'saksis.id')
        //             ->join('tps', 'saksis.tps_id', '=', 'tps.id')
        //             ->join('desas', 'saksis.desa_id', '=', 'desas.id')
        //             ->join('kecamatans', 'saksis.kecamatan_id', '=', 'kecamatans.id')
        //             ->join('kabupatens', 'saksis.kabupaten_id', '=', 'kabupatens.id')
        //             ->select(
        //                 'tps.tps',
        //                 'tps.status_tps',
        //                 'tps.id as tps_id',
        //                 'tps.jumlah_dpt',
        //                 'desas.name as desa_name',
        //                 'desas.id as desa_id',
        //                 'kabupatens.name as kabupaten_name',
        //                 'kabupatens.id as kabupaten_id',
        //                 'kecamatans.name as kecamatan_name',
        //                 'kecamatans.id as kecamatan_id'
        //             )
        //             ->where('users.id', $auth_saksi)
        //             // ->where('tps.id', $id)
        //             ->first();
            $quickcount = DB::table('quickcounts')
                        ->join('tps', 'quickcounts.tps_id', '=', 'tps.id')
                        ->join('kabupatens', 'tps.kabupaten_id', '=', 'kabupatens.id')
                        ->join('kecamatans', 'tps.kecamatan_id', '=', 'kecamatans.id')
                        ->join('desas', 'tps.desa_id', '=', 'desas.id')
                        ->select('quickcounts.*', 'tps.jumlah_dpt','tps.tps as tps_name', 'kabupatens.name as kabupaten_name', 'kecamatans.name as kecamatan_name', 'desas.name as desa_name') // Adjust select as needed
                        ->where('quickcounts.tps_id', $id) 
                        ->first();
            
            $quickcount_details = DB::table('detail_quickcounts')
                        ->join('calons', 'detail_quickcounts.calon_id', '=', 'calons.id')
                        ->select('detail_quickcounts.*', 'calons.name as calon_name') // Adjust select as needed
                        ->where('detail_quickcounts.quickcount_id', $quickcount->id) 
                        ->get();
            // dd($quickcount_details);
        $calons = Calon::get();
   
        //return inertia view
        return inertia('Account/ListTps/Show', [
            'calons' => $calons,
            // 'saksis' => $saksis,
            'quickcount'   =>   $quickcount,
            'quickcount_details'    => $quickcount_details
        ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            // 'tps_id'            => 'required|integer',
            // 'kabupaten_id'      => 'required|integer',
            // 'kecamatan_id'      => 'required|integer',
            // 'desa_id'           => 'required|integer',
            'suara_sah'         => 'required|integer',
            'suara_tidak_sah'   => 'required|integer',
            'total_suara'       => 'required|integer',
            // 'file'              => 'image|mimes:jpeg,jpg,png|max:2000',
            'calonVotes'        => 'required|array',
            'calonVotes.*.calon_id' => 'required|integer',
            'calonVotes.*.total_suara_calon'    => 'required|integer',
        ]);
    
        // Upload image if provided
        $image = $request->file('file');
    
        if ($image) {
            $image->storeAs('public/Quickcounts', $image->hashName());
            // Create Quickcount entry
            $quickcount = [
                // 'tps_id'            => $request->tps_id,
                // 'kabupaten_id'      => $request->kabupaten_id,
                // 'kecamatan_id'      => $request->kecamatan_id,
                // 'desa_id'           => $request->desa_id,
                'suara_sah'         => $request->suara_sah,
                'suara_tidak_sah'   => $request->suara_tidak_sah,
                'total_suara'       => $request->total_suara,
                // 'saksi_id'          => \Auth::user()->id,
                'user_id'           => \Auth::user()->id,
                'file'              => $image->hashName(),
            ];
    
        } else {
            // Create Quickcount entry
            $quickcount = [
                // 'tps_id'            => $request->tps_id,
                // 'kabupaten_id'      => $request->kabupaten_id,
                // 'kecamatan_id'      => $request->kecamatan_id,
                // 'desa_id'           => $request->desa_id,
                'suara_sah'         => $request->suara_sah,
                'suara_tidak_sah'   => $request->suara_tidak_sah,
                'total_suara'       => $request->total_suara,
                // 'saksi_id'          => \Auth::user()->id,
                'user_id'           => \Auth::user()->id,
            ];
        }
    
        // Update the quickcount record
        Quickcount::where('id', $id)->update($quickcount);
    
        // Loop through calonVotes and update each DetailQuickcount
        foreach ($request->calonVotes as $voteData) {
            $detailQuickcountData = [
                'total_suara_calon' => $voteData['total_suara_calon'],
            ];
    
            DetailQuickcount::where('quickcount_id', $id)
                ->where('calon_id', $voteData['calon_id'])
                ->update($detailQuickcountData);
        }
    
        // Redirect to the dashboard
        return redirect()->route('account.dashboard');
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Delete the quickcount record
        Quickcount::destroy($id);
        
        // delete detail quickcount
        DetailQuickcount::where('quickcount_id', $id)->delete();
        // Redirect to the dashboard
        return redirect()->route('account.dashboard');
    }
}
