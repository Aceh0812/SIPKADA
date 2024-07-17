//import react  
import React, { useState,useEffect  } from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import Inertia adapter
import { Inertia } from "@inertiajs/inertia";

//import Sweet Alert
import Swal from 'sweetalert2';
import Select from 'react-select'
export default function kecamatanEdit() {

    //destruct props "errors" & "desa"
    const { errors, desa,kabupatens,kecamatans } = usePage().props;

    //state
    const [name, setName] = useState(desa.name);
    const [kabupaten_id, setKabupatenId] = useState(desa.kabupaten_id);
    const [kecamatan_id, setKecamatanId] = useState(desa.kecamatan_id);
  // Effect to set initial value of kabupaten_id
  useEffect(() => {
    const initialKabupaten = kabupatens.find(option => option.value === desa.kabupaten_id);
    const initialKecamatan = kecamatans.find(option => option.value === desa.kecamatan_id);
    setKabupatenId(initialKabupaten);
    setKecamatanId(initialKecamatan);
}, [desa.kabupaten_id, kabupatens,kecamatans]);
    //method "updateDesa"
    const updateDesa = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post(`/account/desas/${desa.id}`, {

            //data
            name: name,
            kabupaten_id: kabupaten_id.value,
            kecamatan_id: kecamatan_id.value,
     
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
                <title>EDIT DESA - SIPKAD</title>
            </Head>
            <LayoutAccount>
            <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Edit Desa</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateDesa}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Edit Nama Desa</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Edit Nama Desa" />
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