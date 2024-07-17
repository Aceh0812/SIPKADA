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
    const { errors, kabupatens,kecamatans } = usePage().props;

    //state
    const [name, setName] = useState("");
    const [kabupaten_id, setKabupatenId] = useState(null);
    const [kecamatan_id, setKecamatanId] = useState(null);


    //method "storeDesa"
    const storeDesa = async (e) => {
   
        e.preventDefault();

        //sending data
        Inertia.post('/account/desas', {

            //data
            name: name,
            kabupaten_id:kabupaten_id.value,
            kecamatan_id:kecamatan_id.value
   
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
                <title>TAMBAH DESA - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Tambah Desa</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeDesa}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Nama Desa</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tambah Nama Desa" />
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
                                   <div className="mb-3">
                                    <label className="form-label fw-bold">Kecamatan</label>
                                    <Select options={kecamatans} value={kecamatan_id} onChange={(option) => setKecamatanId(option)}/>
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