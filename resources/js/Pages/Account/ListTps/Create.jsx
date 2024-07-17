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
    const { errors, kabupatens,kecamatans,desas } = usePage().props;

    //state
    const [tps, setTps] = useState("");
    const [kabupaten_id, setKabupatenId] = useState(null);
    const [kecamatan_id, setKecamatanId] = useState(null);
    const [desa_id, setDesaId] = useState(null);
    const [jumlah_dpt, setJumlahDpt] = useState("");


    //method "storeDesa"
    const storeDesa = async (e) => {
   
        e.preventDefault();

        //sending data
        Inertia.post('/account/tpses', {

            //data
            tps: tps,
            jumlah_dpt:jumlah_dpt,
            kabupaten_id:kabupaten_id.value,
            kecamatan_id:kecamatan_id.value,
            desa_id:desa_id.value
   
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
                <title>LISH TPS - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> List TPS</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeDesa}>
                                <div className="row">
                                    <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Tps</label>
                                        <input type="text" className="form-control" value={tps} onChange={(e) => setTps(e.target.value)} placeholder="Enter Tps Name" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                    </div>
                                    <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Jumlah Dpt</label>
                                        <input type="text" className="form-control" value={jumlah_dpt} onChange={(e) => setJumlahDpt(e.target.value)} placeholder="Enter Tps Name" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                    </div>
                                </div>
                                   <div className="mb-3">
                                    <label className="form-label fw-bold">Kabupaten</label>
                                    <Select options={kabupatens} value={kabupaten_id} onChange={(option) => setKabupatenId(option)}/>
                                   </div>
                                   <div className="mb-3">
                                    <label className="form-label fw-bold">Kecamatan</label>
                                    <Select options={kecamatans} value={kecamatan_id} onChange={(option) => setKecamatanId(option)}/>
                                   </div>
                                   <div className="mb-3">
                                    <label className="form-label fw-bold">Desa /Kelurahan</label>
                                    <Select options={desas} value={desa_id} onChange={(option) => setDesaId(option)}/>
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