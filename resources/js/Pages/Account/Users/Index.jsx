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

export default function UserIndex() {

    //destruct props "users"
    const { users } = usePage().props;

    return(
        <>
            <Head>
                <title>USER - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div class="row mt-5">
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-3 col-12 mb-2">
                                <Link href="/account/users/create" class="btn btn-md btn-success border-0 shadow w-100" type="button">
                                    <i class="fa fa-plus-circle me-2"></i>
                                    Tambah User
                                </Link>
                            </div>
                            <div class="col-md-9 col-12 mb-2">

                                <Search URL={'/account/users'}/>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-users"></i> User</span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                        <tr>
                                            <th scope="col" style={{ width: '5%' }}>No.</th>
                                            <th scope="col" style={{ width: '15%' }}>Nama User</th>
                                            <th scope="col" style={{ width: '15%' }}>Email</th>
                                            <th scope="col" style={{ width: '30%' }}>Role</th>
                                            <th scope="col" style={{ width: '15%' }}>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {users.data.map((user, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">{++index + (users.current_page-1) * users.per_page}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        {user.roles.map((role, index) => (
                                                            <span className="btn btn-success btn-sm shadow-sm border-0 ms-2 mb-2" key={index}>
                                                                {role.name}
                                                            </span>
                                                        ))}
                                                    </td>
                                                    <td className="text-center">
                                                        {user.id !== 1 && hasAnyPermission(['users.edit']) &&
                                                            <Link href={`/account/users/${user.id}/edit`} className="btn btn-default btn-sm me-2"><i className="fa fa-pencil-alt"></i></Link>
                                                        }
                                                        {user.id !== 1 && hasAnyPermission(['users.delete']) && // Check if user.id is not 1
                        <Delete URL={'/account/users'} id={user.id} />
                    }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={users.links} align={'end'}/>

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )

}