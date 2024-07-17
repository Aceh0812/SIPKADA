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
import Select from 'react-select'
export default function KecamatanCreate() {

    //destruct props "errors"
    const { errors, kabupatens } = usePage().props;

    //state
    const [name, setName] = useState("");
    const [kabupaten_id, setKabupatenId] = useState(null);


    //method "storeKecamatan"
    const storeKecamatan = async (e) => {
   
        e.preventDefault();

        //sending data
        Inertia.post('/account/kecamatans', {

            //data
            name: name,
            kabupaten_id:kabupaten_id.value
   
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
                <title>TAMBAH KECAMATAN - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Tambah Kecamatan</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeKecamatan}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Nama Kecamatan</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tambah Nama Kecamatan" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                   <div className="mb-3">
                                    <label className="form-label fw-bold">Kabupaten</label>
                                    <Select options={kabupatens} value={kabupaten_id} onChange={(option) => setKabupatenId(option)}/>
                                   </div>

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