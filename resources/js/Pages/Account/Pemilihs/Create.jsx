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

export default function pemilihCreate() {

    //destruct props "errors"
    const { errors, kabupatens,kecamatans,desas } = usePage().props;

    //state
    const [name, setName] = useState("");
    const [ktp, setKtp] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState(null);
    const [kabupaten_id, setKabupatenId] = useState(null);
    const [kecamatan_id, setKecamatanId] = useState(null);
    const [desa_id, setDesaId] = useState(null);


    //method "storepemilih"
    const storepemilih = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post('/account/pemilihs', {

            //data
            ktp: ktp,
            name: name,
            phone: phone,
            address:address,
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
                <title>TAMBAH PEMILIH - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold"><i className="fa fa-folder"></i> Tambah Pemilih</span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storepemilih}>
                                <div className="mb-3">
                                        <label className="form-label fw-bold">NIK / KTP</label>
                                        <input type="text" className="form-control" value={ktp} onChange={(e) => setKtp(e.target.value)} placeholder="No. NIK / KTP" />
                                    </div>
                                    {errors.ktp && (
                                        <div className="alert alert-danger">
                                            {errors.ktp}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Nama Pemilih</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tambah Nama Pemilih" />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">No. Hp</label>
                                        <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="No. Hp" />
                                    </div>
                                    {errors.phone && (
                                        <div className="alert alert-danger">
                                            {errors.phone}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Alamat</label>
                                        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Tambah Alamat" />
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