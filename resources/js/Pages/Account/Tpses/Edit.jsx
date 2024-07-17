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
    const { errors, tpsed,kabupatens,kecamatans,desas } = usePage().props;

    //state
    const [tps, setTps] = useState(tpsed.tps);
    const [kabupaten_id, setKabupatenId] = useState(tpsed.kabupaten_id);
    const [kecamatan_id, setKecamatanId] = useState(tpsed.kecamatan_id);
    const [desa_id, setDesaId] = useState(null);
    const [jumlah_dpt, setJumlahDpt] = useState(tpsed.jumlah_dpt);
  // Effect to set initial value of kabupaten_id
  useEffect(() => {
    const initialKabupaten = kabupatens.find(option => option.value === tpsed.kabupaten_id);
    const initialKecamatan = kecamatans.find(option => option.value === tpsed.kecamatan_id);
    const initialDesa = desas.find(option => option.value === tpsed.desa_id);
    setKabupatenId(initialKabupaten);
    setKecamatanId(initialKecamatan);
    setDesaId(initialDesa);
}, [tpsed.kabupaten_id, kabupatens,kecamatans,desas]);
    //method "updateTps"
    const updateTps = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post(`/account/tpses/${tpsed.id}`, {

            //data
            tps: tps,
            kabupaten_id: kabupaten_id.value,
            kecamatan_id: kecamatan_id.value,
            desa_id: desa_id.value,
            jumlah_dpt:jumlah_dpt,
     
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
                <title>EDIT TPS - SIPKADA</title>
            </Head>
            <LayoutAccount>
            <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Edit TPS</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateTps}>
                                <div className="row">
                                    <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Edit TPS</label>
                                        <input type="text" className="form-control" value={tps} onChange={(e) => setTps(e.target.value)} placeholder="Edit Nama TPS" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                    </div>
                                    <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Jumlah DPT</label>
                                        <input type="text" className="form-control" value={jumlah_dpt} onChange={(e) => setJumlahDpt(e.target.value)} placeholder="Edit Jumlah DPT" />
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