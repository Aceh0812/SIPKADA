import React, { useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import Select from "react-select";

export default function Dashboard() {
    const { errors, kabupatens, kecamatans, desas, tpses, calons,saksis } = usePage().props;

    const [tps_id, setTpsId] = useState(saksis.tps_id);
    const [kabupaten_id, setKabupatenId] = useState(saksis.kabupaten_id);
    const [kecamatan_id, setKecamatanId] = useState(saksis.kecamatan_id);
    const [desa_id, setDesaId] = useState(saksis.desa_id);
    const [tps, setTps] = useState(saksis.tps);
    const [kabupaten, setKabupaten] = useState(saksis.kabupaten_name);
    const [kecamatan, setKecamatan] = useState(saksis.kecamatan_name);
    const [desa, setDesa] = useState(saksis.desa_name);
    const [jumlah_dpt, setJumlahDpt] = useState(saksis.jumlah_dpt);
    const [calonVotes, setCalonVotes] = useState(calons.map(calon => ({ calon_id: calon.id, votes: "" })));

    const handleCalonVoteChange = (index, value) => {
        const newCalonVotes = [...calonVotes];
        newCalonVotes[index].votes = value;
        setCalonVotes(newCalonVotes);
    };

    const storeQuickCount = (e) => {
        e.preventDefault();

        const tpsValue = tps_id ? tps_id.value : null;
        const kabupatenValue = kabupaten_id ? kabupaten_id.value : null;
        const kecamatanValue = kecamatan_id ? kecamatan_id.value : null;
        const desaValue = desa_id ? desa_id.value : null;

        const data = {
            tps_id: tpsValue,
            kabupaten_id: kabupatenValue,
            kecamatan_id: kecamatanValue,
            desa_id: desaValue,
            jumlah_dpt,
            calonVotes,
        };

        Inertia.post("/account/quickcounts", data, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success',
                    text: 'Quick count data has been saved.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'There was an error saving the quick count data.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    return (
        <>
            <Head>
                <title>Upload C1 - Quickcount</title>
            </Head>
            <LayoutAccount>
                <div className="page-content">
                    <div className="row mt-3">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={storeQuickCount}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Tps</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={tps}
                                                    onChange={(e) => setTps(e.target.value)}
                                                    // placeholder="1.500"
                                                    readOnly
                                                />
                                            </div>
                                            {errors.tps_id && (
                                                <div className="alert alert-danger">
                                                    {errors.tps_id}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Jumlah Dpt</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={jumlah_dpt}
                                                    onChange={(e) => setJumlahDpt(e.target.value)}
                                                    // placeholder="1.500"
                                                    readOnly
                                                />
                                            </div>
                                            {errors.jumlah_dpt && (
                                                <div className="alert alert-danger">
                                                    {errors.jumlah_dpt}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Kabupaten</label>
                                        <input
                                                    type="text"
                                                    className="form-control"
                                                    value={kabupaten}
                                                    onChange={(e) => setKabupaten(e.target.value)}
                                                    // placeholder="1.500"
                                                    readOnly
                                                />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Kecamatan</label>
                                        <input
                                                    type="text"
                                                    className="form-control"
                                                    value={kecamatan}
                                                    onChange={(e) => setKecamatan(e.target.value)}
                                                    // placeholder="1.500"
                                                    readOnly
                                                />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Desa /Kelurahan</label>
                                        <input
                                                    type="text"
                                                    className="form-control"
                                                    value={desa}
                                                    onChange={(e) => setDesa(e.target.value)}
                                                    // placeholder="1.500"
                                                    readOnly
                                                />
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12 col-lg-12 d-flex">
                                            <div className="card radius-10 w-100">
                                                <div className="card-header">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <h6 className="mb-0">HASIL QUICKCOUNT PILKADA 2024</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Calon</th>
                                                                <th>Perolehan Suara</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {calons.map((calon, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{calon.name}</td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="30"
                                                                            value={calonVotes[index].votes}
                                                                            onChange={(e) => handleCalonVoteChange(index, e.target.value)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="mt-3 d-grid gap-2">
                                                        <button type="submit" className="btn btn-md btn-warning me-2">
                                                            <i className="fa fa-save"></i> Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
