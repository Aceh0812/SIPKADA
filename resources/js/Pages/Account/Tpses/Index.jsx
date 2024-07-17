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

//import component delete
import Delete from "../../../shared/Delete";

export default function TpsIndex() {
    //destruct props "tpses"
    const { tpses } = usePage().props;

    return (
        <>
            <Head>
                <title>TPS - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                            {hasAnyPermission(["tpses.create"]) && (
                                <Link
                                    href="/account/tpses/create"
                                    className="btn btn-md btn-success border-0 shadow w-100"
                                    type="button"
                                >
                                    <i className="fa fa-plus-circle me-2"></i>
                                    Tambah TPS
                                </Link>
                            )}
                            </div>
                            <div className="col-md-9 col-12 mb-2">
                                <Search URL={"/account/tpses"} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card  rounded shadow ">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-folder"></i> TPS
                                </span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    style={{ width: "5%" }}
                                                >
                                                    No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "15%" }}
                                                >
                                                 Nama TPS
                                                </th>
                                                
                                                <th
                                                    scope="col"
                                                    style={{ width: "15%" }}
                                                >
                                                 Jumlah DPT
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "15%" }}
                                                >
                                                 Kecamatan
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "15%" }}
                                                >
                                                 Desa
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "15%" }}
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tpses.data.map(
                                                (tps, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">
                                                            {++index +
                                                                (tpses.current_page -
                                                                    1) *
                                                                    tpses.per_page}
                                                        </td>
                                                        <td>{tps.tps}</td>   
                                                        <td>{tps.jumlah_dpt}</td>         
                                                        <td>{tps.kecamatan.name}</td>   
                                                        <td>{tps.desa.name}</td>         
                                                        <td className="text-center">
                                                        {hasAnyPermission(["tpses.create"]) && (
                                                                <Link
                                                                    href={`/account/tpses/${tps.id}/edit`}
                                                                    className="btn btn-default btn-sm me-2"
                                                                >
                                                                    <i className="fa fa-pencil-alt"></i>
                                                                </Link>
                                                        )}
                                                                {hasAnyPermission(["tpses.create"]) && (
                                                                <Delete
                                                                    URL={
                                                                        "/account/tpses"
                                                                    }
                                                                    id={
                                                                        tps.id
                                                                    }
                                                                />
                                                                )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination
                                    links={tpses.links}
                                    align={"end"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
