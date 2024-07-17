<?php

namespace App\Http\Controllers\Account;

use App\Models\Calon;
use App\Models\Tps;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use DB;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
         
        $calons = DB::table('calons')
        ->leftJoin('detail_quickcounts', 'calons.id', '=', 'detail_quickcounts.calon_id')
        ->select('calons.name', DB::raw('SUM(detail_quickcounts.total_suara_calon) AS total_suara'))
        ->groupBy('calons.name')
        ->get();

        // Calculate the total votes across all candidates
        $totalVotes = $calons->sum('total_suara');

        // Add the percentage to each candidate's result
        $calons = $calons->map(function ($candidate) use ($totalVotes) {
            $candidate->percentage = $totalVotes > 0 ? round(($candidate->total_suara / $totalVotes) * 100, 2) : 0;
            return $candidate;
        });
        
        $tps = DB::table('tps')
        ->select( DB::raw('COUNT(tps.id) AS total_tps'))
        ->where('tps.status_tps', 1)
        ->first();

        $count_tps = DB::table('tps')
        ->count('*');

        //return view
        return inertia('Account/Dashboard/Index',[
            'calons'    => $calons,
            'tps'       => $tps,
            'count_tps' => $count_tps,
        ]);
    }
}