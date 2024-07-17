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

export default function CategoryCreate() {

    //destruct props "errors"
    const { errors } = usePage().props;

    //state
    const [name, setName] = useState("");
    const [no_urut, setNoUrut] = useState(null);


    //method "storeCalon"
    const storeCalon = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post('/account/calons', {

            //data
            name: name,
            no_urut: no_urut
   
        }, {
            onSuccess: () => {

                //show alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Data saved successfully!',
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
                <title>TAMBAH PASLON - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Tambah Paslon</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeCalon}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Nama Paslon</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tambah Nama Paslon" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">No Urut</label>
                                        <input type="text" className="form-control" value={no_urut} onChange={(e) => setNoUrut(e.target.value)} placeholder="Tambah No Urut" />
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