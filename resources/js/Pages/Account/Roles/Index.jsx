//import react  
import React from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage, Link
import { Head, usePage, Link } from '@inertiajs/inertia-react';

//import permissions
import hasAnyPermission from '../../../utils/Permissions';

//import component search
import Search from '../../../shared/Search';

//import component pagination
import Pagination from '../../../shared/Pagination';

//import component delete
import Delete from '../../../shared/Delete';

import { RiEdit2Line } from "react-icons/ri";



export default function RoleIndex() {

    //destruct props "roles"
    const { roles } = usePage().props;

    return(
        <>
            <Head>
                <title>Roles - Kita Mampu</title>
            </Head>
            <LayoutAccount>
                <div class="row mt-5">
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-3 col-12 mb-2">
                                <Link href="/account/roles/create" class="btn btn-md btn-success border-0 shadow w-100" type="button">
                                    <i class="fa fa-plus-circle me-2"></i>
                                    Add
                                </Link>
                            </div>
                            <div class="col-md-9 col-12 mb-2">

                                <Search URL={'/account/roles'}/>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-1 rounded shadow-sm ">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-shield-alt"></i> Roles</span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                        <tr>
                                            <th scope="col" style={{ width: '5%' }}>No.</th>
                                            <th scope="col" style={{ width: '15%' }}>Role Name</th>
                                            <th scope="col" style={{ width: '50%' }}>Permissions</th>
                                            <th scope="col" style={{ width: '15%' }}>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {roles.data.map((role, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index + (roles.current_page-1) * roles.per_page}</td>
                                                    <td>{role.name}</td>
                                                    <td>
                                                        {role.permissions.map((permission, index) => (
                                                            <li className="btn btn-success btn-sm shadow-sm  ms-2 mb-2" key={index}>
                                                                {permission.name}
                                                            </li>
                                                        ))}
                                                    </td>
                                                    <td className="text-center">
                                                        {hasAnyPermission(['roles.edit']) &&
                                                            <Link href={`/account/roles/${role.id}/edit`} className="btn btn-warning btn-sm me-2"><RiEdit2Line /></Link>
                                                        }
                                                        {hasAnyPermission(['roles.delete']) &&
                                                            <Delete URL={'/account/roles'} id={role.id} />
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={roles.links} align={'end'}/>

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )

}