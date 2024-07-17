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

export default function CalonEdit() {

    //destruct props "errors" & "calon"
    const { errors, calon } = usePage().props;

    //state
    const [name, setName] = useState(calon.name);
    const [no_urut, setNoUrut] = useState(calon.no_urut);

    //method "updateCalon"
    const updateCalon = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post(`/account/calons/${calon.id}`, {

            //data
            name: name,
           no_urut:no_urut,
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
                <title>EDIT PASLON - SIPKADA</title>
            </Head>
            <LayoutAccount>
            <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Edit Paslon</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateCalon}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Edit Nama Paslon</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Edit Nama Paslon" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Edit No Urut</label>
                                        <input type="text" className="form-control" value={no_urut} onChange={(e) => setNoUrut(e.target.value)} placeholder="Edit Nomor Urut" />
                                    </div>
                                    {errors.no_urut && (
                                        <div className="alert alert-danger">
                                            {errors.no_urut}
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