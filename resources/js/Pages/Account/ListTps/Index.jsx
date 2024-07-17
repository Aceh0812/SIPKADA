//import react
import React from "react";

//import layout
import LayoutAccount from "../../../Layouts/Account";

//import Head, usePage, Link
import { Head, usePage, Link } from "@inertiajs/inertia-react";

//import permissions
import hasAnyPermission from "../../../utils/Permissions";

//import component search
import Search from "../../../shared/Search";

//import component pagination
import Pagination from "../../../shared/Pagination";
import Select from "react-select";
//import component delete
import Delete from "../../../shared/Delete";

export default function TpsIndex() {
    //destruct props "quickcounts"
    const { quickcounts, tpses } = usePage().props;
    const [tps_id, setTpsId] = React.useState(null);

    //method "filterTps"
    const filterTps = (e, updateStatus = null) => {
        e.preventDefault();

        // Redirect to the URL with the selected TPS ID and update status as query parameters
        const url = new URL(window.location.href);
        url.searchParams.set('tps_id', tps_id ? tps_id.value : '');
        if (updateStatus !== null) {
            url.searchParams.set('update_status', updateStatus);
        }
        window.location.href = url.toString();
    }

    return (
        <>
            <Head>
                <title>HASIL UPDATE TPS - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-9">
                        <form onSubmit={(e) => filterTps(e)}>
                            <div className="row">
                                <div className="col-md-3 col-12 mb-2">
                                    <Select
                                        options={tpses}
                                        value={tps_id}
                                        onChange={(option) => setTpsId(option)}
                                    />
                                </div>
                                <div className="col-md-3 col-12 mb-2">
                                    <button
                                        type="submit"
                                        className="btn btn-md btn-success border-0 shadow w-100"
                                    >
                                        <i className="fa fa-filter me-2"></i>
                                        Cari TPS
                                    </button>
                                </div>
                                <div className="col-md-3 col-12 mb-2">
                                    <button
                                        type="button"
                                        className="btn btn-md btn-primary border-0 shadow w-100"
                                        onClick={(e) => filterTps(e, 1)}
                                    >
                                        <i className="fa fa-check-circle me-2"></i>
                                        Update
                                    </button>
                                </div>
                                <div className="col-md-3 col-12 mb-2">
                                    <button
                                        type="button"
                                        className="btn btn-md btn-warning border-0 shadow w-100"
                                        onClick={(e) => filterTps(e, 0)}
                                    >
                                        <i className="fa fa-times-circle me-2"></i>
                                        Belum Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>

                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card rounded shadow">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-folder"></i> TPS
                                </span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered table-md">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: "5%" }}>No.</th>
                                                <th scope="col" style={{ width: "15%" }}>Kecamatan</th>
                                                <th scope="col" style={{ width: "15%" }}>Desa</th>
                                                <th scope="col" style={{ width: "15%" }}>TPS</th>
                                                <th scope="col" style={{ width: "15%" }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {quickcounts.data.map((tps, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {++index + (quickcounts.current_page - 1) * quickcounts.per_page}
                                                    </td>
                                                    <td>{tps.kecamatan_name}</td>
                                                    <td>{tps.desa_name}</td>
                                                    <td>{tps.tps_name}</td> 
                                                    <td>
                                                    {hasAnyPermission(["quickcount-lists.edit"]) && (
                                                        <Link href={`/account/quickcounts/${tps.tps_id}/edit`} className="btn btn-default btn-sm me-2">
                                                            <i className="fa fa-pencil-alt"></i>
                                                        </Link>
                                                    )}
                                                    {hasAnyPermission(["quickcount-lists.show"]) && (
                                                        <Link href={`/account/quickcounts/${tps.tps_id}`} className="btn btn-warning btn-sm me-2">
                                                            <i className="fa fa-eye"></i>
                                                        </Link>
                                                    )}
                                                    {hasAnyPermission(["quickcounts.delete"]) && (
                                                        <Delete URL={"/account/quickcounts"} id={tps.id} />
                                                    )}
                                                
                                                     
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={quickcounts.links} align={"end"} />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
