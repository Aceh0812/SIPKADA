//import react  
import React, { useState } from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import Inertia adapter
import { Inertia } from "@inertiajs/inertia";

//import Sweet Alert
import Swal from 'sweetalert2';

export default function kabuaptenEdit() {

    //destruct props "errors" & "kabupaten"
    const { errors, kabupaten } = usePage().props;

    //state
    const [name, setName] = useState(kabupaten.name);

    //method "updateKabupaten"
    const updateKabupaten = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post(`/account/kabupatens/${kabupaten.id}`, {

            //data
            name: name,
     
            _method: "PUT"
        }, {
            onSuccess: () => {

                //show alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }
    return (
        <>
            <Head>
                <title>EDIT KABUPATEN - SIPKADA</title>
            </Head>
            <LayoutAccount>
            <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Edit Kabuapten</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateKabupaten}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Edit Nama Kabupaten</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Edit Nama Kabupaten" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}

                                    <div>
                                        <button type="submit" className="btn btn-md btn-success me-2"><i className="fa fa-save"></i> Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    )

}