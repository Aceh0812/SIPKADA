//import react  
import React, { useState,useEffect } from "react";

//import layout
import LayoutAccount from '../../../Layouts/Account';

//import Head, usePage
import { Head, usePage } from '@inertiajs/inertia-react';

//import Inertia adapter
import { Inertia } from "@inertiajs/inertia";

//import Sweet Alert
import Swal from 'sweetalert2';
import Select from 'react-select'

export default function pemilihEdit() {

    //destruct props "errors" & "pemilih"
    const { errors, pemilih,kabupatens,desas,kecamatans,tpses } = usePage().props;

    //state
    const [name, setName] = useState(pemilih.name);
    const [address, setAddress] = useState(pemilih.address);
    const [phone, setPhone] = useState(pemilih.phone);
    const [ktp, setKtp] = useState(pemilih.ktp);
    const [kabupaten_id, setKabupatenId] = useState(pemilih.kabupaten_id);
    const [kecamatan_id, setKecamatanId] = useState(pemilih.kecamatan_id);
    const [desa_id, setDesaId] = useState(pemilih.desa_id);
  // Effect to set initial value of kabupaten_id
  useEffect(() => {
    const initialKabupaten = kabupatens.find(option => option.value === pemilih.kabupaten_id);
    const initialKecamatan = kecamatans.find(option => option.value === pemilih.kecamatan_id);
    const initialDesa = desas.find(option => option.value === pemilih.desa_id);
    setKabupatenId(initialKabupaten);
    setKecamatanId(initialKecamatan);
    setDesaId(initialDesa);
}, [pemilih.kabupaten_id, kabupatens,kecamatans,desas]);
    //method "updatePemilih"
    const updatePemilih = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post(`/account/pemilihs/${pemilih.id}`, {

            //data
            name: name,
            phone: phone,
            address:address,
            ktp:ktp,
            kabupaten_id:kabupaten_id.value,
            kecamatan_id:kecamatan_id.value,
            desa_id:desa_id.value,
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
                <title>EDIT PEMILIH - SIPKADA</title>
            </Head>
            <LayoutAccount>
            <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Edit Pemilih</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updatePemilih}>
                                <div className="mb-3">
                                        <label className="form-label fw-bold">Edit No. NIK / KTP</label>
                                        <input type="text" className="form-control" value={ktp} onChange={(e) => setKtp(e.target.value)} placeholder="Edit No. NIK / KTP" />
                                    </div>
                                    {errors.ktp && (
                                        <div className="alert alert-danger">
                                            {errors.ktp}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Edit Nama Pemilih</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Edit Nama Pemilih" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Edit No. Hp</label>
                                        <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Edit No. Hp" />
                                    </div>
                                    {errors.phone && (
                                        <div className="alert alert-danger">
                                            {errors.phone}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Alamat</label>
                                        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat" />
                                    </div>
                                    {errors.address && (
                                        <div className="alert alert-danger">
                                            {errors.address}
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