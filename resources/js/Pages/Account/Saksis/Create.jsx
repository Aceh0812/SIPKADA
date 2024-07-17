//import react
import React, { useState, useEffect } from "react";

//import layout
import LayoutAccount from "../../../Layouts/Account";

//import Head, usePage
import { Head, usePage } from "@inertiajs/inertia-react";

//import Inertia adapter
import { Inertia } from "@inertiajs/inertia";

//import Sweet Alert
import Swal from "sweetalert2";
import Select from "react-select";

export default function SaksiCreate() {
    //destruct props "errors"
    const { errors, kabupatens, kecamatans, desas } = usePage().props;

    //state
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState(null);
    const [ktp, setKtp] = useState(null);
    const [tps_id, setTpsId] = useState(null);
    const [kabupaten_id, setKabupatenId] = useState(null);
    const [kecamatan_id, setKecamatanId] = useState(null);
    const [desa_id, setDesaId] = useState(null);
    const [tpsOptions, setTpsOptions] = useState([]);

    //user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    //method to fetch TPS options
    const fetchTpsOptions = async (desaId) => {
        const response = await fetch(`/account/gettps?desa_id=${desaId}`);

        const data = await response.json();
        setTpsOptions(data);
    };

    //useEffect to fetch TPS options when desa_id changes
    useEffect(() => {
        if (desa_id) {
            fetchTpsOptions(desa_id.value);
        } else {
            setTpsOptions([]);
        }
    }, [desa_id]);

    //method "storeSaksi"
    const storeSaksi = async (e) => {
        e.preventDefault();

        //sending data
        Inertia.post(
            "/account/saksis",
            {
                //data
                name: name,
                phone: phone,
                address: address,
                ktp: ktp,
                kabupaten_id: kabupaten_id.value,
                kecamatan_id: kecamatan_id.value,
                desa_id: desa_id.value,
                tps_id: tps_id.value,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            },
            {
                onSuccess: () => {
                    //show alert
                    Swal.fire({
                        title: "Success!",
                        text: "Data saved successfully!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );
    };

    return (
        <>
            <Head>
                <title>TAMBAH SAKSI - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-folder"></i> Tambah Saksi
                                </span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeSaksi}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Nama Saksi
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    placeholder="Tambah Nama Saksi"
                                                />
                                            </div>
                                            {errors.name && (
                                                <div className="alert alert-danger">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    No. Hp
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                    placeholder="Tambah No. Hp"
                                                />
                                            </div>
                                            {errors.phone && (
                                                <div className="alert alert-danger">
                                                    {errors.phone}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Tambah Alamat
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={address}
                                                    onChange={(e) =>
                                                        setAddress(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Tambah Alamat Lengkap"
                                                />
                                            </div>
                                            {errors.address && (
                                                <div className="alert alert-danger">
                                                    {errors.address}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Upload Foto KTP
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) =>
                                                setKtp(e.target.files[0])
                                            }
                                        />
                                    </div>
                                    {errors.ktp && (
                                        <div className="alert alert-danger">
                                            {errors.ktp}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Kabupaten
                                        </label>
                                        <Select
                                            options={kabupatens}
                                            value={kabupaten_id}
                                            onChange={(option) =>
                                                setKabupatenId(option)
                                            }
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Kecamatan
                                                </label>
                                                <Select
                                                    options={kecamatans}
                                                    value={kecamatan_id}
                                                    onChange={(option) =>
                                                        setKecamatanId(option)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Desa /Kelurahan
                                                </label>
                                                <Select
                                                    options={desas}
                                                    value={desa_id}
                                                    onChange={(option) =>
                                                        setDesaId(option)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Pilih TPS
                                                </label>
                                                <Select
                                                    options={tpsOptions}
                                                    value={tps_id}
                                                    onChange={(option) =>
                                                        setTpsId(option)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Tambah Email
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    placeholder="Tambah Alamat Email"
                                                />
                                            </div>
                                            {errors.email && (
                                                <div className="alert alert-danger">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Tambah Password"
                                                />
                                            </div>
                                            {errors.password && (
                                                <div className="alert alert-danger">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Konfirmasi Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    value={passwordConfirmation}
                                                    onChange={(e) =>
                                                        setPasswordConfirmation(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Konfirmasi Password"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-md btn-success me-2"
                                        >
                                            <i className="fa fa-save"></i> Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
