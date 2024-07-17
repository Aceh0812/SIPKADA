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

export default function CategoryIndex() {
    //destruct props "desas"
    const { desas } = usePage().props;

    return (
        <>
            <Head>
                <title>DESA - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <Link
                                    href="/account/desas/create"
                                    className="btn btn-md btn-success border-0 shadow w-100"
                                    type="button"
                                >
                                    <i className="fa fa-plus-circle me-2"></i>
                                    Tambah Desa
                                </Link>
                            </div>
                            <div className="col-md-9 col-12 mb-2">
                                <Search URL={"/account/desas"} />
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
                                    <i className="fa fa-folder"></i> Desa
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
                                                 Nama Desa
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
                                                 Kabupaten
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
                                            {desas.data.map(
                                                (desa, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">
                                                            {++index +
                                                                (desas.current_page -
                                                                    1) *
                                                                    desas.per_page}
                                                        </td>
                                                        <td>{desa.name}</td>   
                                                        <td>{desa.kecamatan.name}</td>         
                                                        <td>{desa.kabupaten.name}</td>         
                                                        <td className="text-center">
                                                           
                                                                <Link
                                                                    href={`/account/desas/${desa.id}/edit`}
                                                                    className="btn btn-default btn-sm me-2"
                                                                >
                                                                    <i className="fa fa-pencil-alt"></i>
                                                                </Link>
                                                          
                                                                <Delete
                                                                    URL={
                                                                        "/account/desas"
                                                                    }
                                                                    id={
                                                                        desa.id
                                                                    }
                                                                />
                                                          
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination
                                    links={desas.links}
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
