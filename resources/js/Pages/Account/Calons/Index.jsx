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
    //destruct props "calons"
    const { calons } = usePage().props;

    return (
        <>
            <Head>
                <title>PASLON - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div class="row mt-5">
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-3 col-12 mb-2">
                            {hasAnyPermission(["calons.create"]) && (
                                <Link
                                    href="/account/calons/create"
                                    class="btn btn-md btn-success border-0 shadow w-100"
                                    type="button"
                                >
                                    <i class="fa fa-plus-circle me-2"></i>
                                    Tambah Paslon
                                </Link>
                            )}
                            </div>
                            <div class="col-md-9 col-12 mb-2">
                                <Search URL={"/account/calons"} />
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
                                    <i className="fa fa-folder"></i> Paslon
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
                                                 Nama Paslon
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "15%" }}
                                                >
                                                    No Urut
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
                                            {calons.data.map(
                                                (calon, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">
                                                            {++index +
                                                                (calons.current_page -
                                                                    1) *
                                                                    calons.per_page}
                                                        </td>
                                                        <td>{calon.name}</td>
                                                        <td>{calon.no_urut}</td>           
                                                        <td className="text-center">
                                                        {hasAnyPermission(["calons.create"]) && (
                                                                <Link
                                                                    href={`/account/calons/${calon.id}/edit`}
                                                                    className="btn btn-default btn-sm me-2"
                                                                >
                                                                    <i className="fa fa-pencil-alt"></i>
                                                                </Link>
                                                        )}
                                                        {hasAnyPermission(["calons.create"]) && (
                                                                <Delete
                                                                    URL={
                                                                        "/account/calons"
                                                                    }
                                                                    id={
                                                                        calon.id
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
                                    links={calons.links}
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
