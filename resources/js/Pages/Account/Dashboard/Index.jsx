// Dashboard.js
import React from "react";
import LayoutAccount from "../../../Layouts/Account";
import { Head, usePage } from "@inertiajs/inertia-react";
import PieChart from "../../../Components/PieChart"; // Adjust the import path as needed

export default function Dashboard() {
    const { calons, tps, count_tps } = usePage().props;

    // Check if tps and count_tps are objects with nested properties
    const totalTps = tps.total_tps || 0; // Adjust based on the structure
    const countedTps = count_tps.total_tps || count_tps; // Adjust based on the structure

    const totalVotes = calons.reduce((sum, calon) => sum + calon.total_suara, 0);

    const percentageCounted = countedTps > 0 ? (totalTps / countedTps) * 100 : 0;

    const barColor = percentageCounted < 50 ? 'bg-danger' : (percentageCounted < 75 ? 'bg-warning' : 'bg-success');

    return (
        <>
            <Head>
                <title>DASHBOARD - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="page-content">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 mt-4">
                        {calons.map((calon, index) => (
                            <div className="col" key={index}>
                                <div className="card radius-10 border-start border-0 border-4 border-info">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <p className="mb-0 text-secondary">
                                                    {calon.name}
                                                </p>
                                                <h4 className="my-1 text-info">
                                                    {calon.total_suara} suara
                                                </h4>
                                                <p className="mb-0 font-13">{calon.percentage} %</p>
                                            </div>
                                            <div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto">
                                                <i className="bx bxs-cart"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6 col-lg-6 d-flex">
                            <div className="card radius-10 w-100">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h6 className="mb-0">
                                                HASIL HITUNG CEPAT PILKADA 2024
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="chart-container-2">
                                        <div className="col-md-12">
                                            <PieChart data={calons} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 d-flex">
                            <div className="card radius-10 w-100">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h6 className="mb-0">
                                                JUMLAH TPS 
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="chart-container-2">
                                        <div className="col-md-12">
                                            <p className="mb-0 text-secondary">
                                                Total TPS: {countedTps}
                                            </p>
                                            <h4 className="my-1 text-info">
                                                TPS Masuk: {totalTps}
                                            </h4>
                                            {/* <p className="mb-0 font-13">
                                                Percentage Counted: {percentageCounted.toFixed(2)} %
                                            </p> */}
                                            <div className="progress" style={{ height: "20px", marginTop: "10px" }}>
                                                <div
                                                    className={`progress-bar ${barColor}`}
                                                    role="progressbar"
                                                    style={{ width: `${percentageCounted}%` }}
                                                    aria-valuenow={percentageCounted}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    {percentageCounted.toFixed(2)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
