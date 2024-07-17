import React, { useEffect, useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function QuickCount() {
    const { errors, kabupatens, kecamatans, desas, tpses, calons, saksis } = usePage().props;

    const [tps_id, setTpsId] = useState(saksis.tps_id);
    const [kabupaten_id, setKabupatenId] = useState(saksis.kabupaten_id);
    const [kecamatan_id, setKecamatanId] = useState(saksis.kecamatan_id);
    const [desa_id, setDesaId] = useState(saksis.desa_id);
    const [tps, setTps] = useState(saksis.tps);
    const [kabupaten, setKabupaten] = useState(saksis.kabupaten_name);
    const [kecamatan, setKecamatan] = useState(saksis.kecamatan_name);
    const [desa, setDesa] = useState(saksis.desa_name);
    const [jumlah_dpt, setJumlahDpt] = useState(saksis.jumlah_dpt);
    const [suara_sah, setSuaraSah] = useState("");
    const [suara_tidak_sah, setSuaraTidakSah] = useState(0);
    const [total_suara, setTotalSuara] = useState("");
    const [file, setFile] = useState(null);
    const [calonVotes, setCalonVotes] = useState(
        calons.map((calon) => ({ calon_id: calon.id, votes: "" }))
    );
    const [isFormValid, setIsFormValid] = useState(false);

    const handleCalonVoteChange = (index, value) => {
        const newCalonVotes = [...calonVotes];
        newCalonVotes[index].votes = value;
        setCalonVotes(newCalonVotes);
    };

    useEffect(() => {
        const totalSuaraSah = calonVotes.reduce((total, calon) => total + Number(calon.votes || 0), 0);
        setSuaraSah(totalSuaraSah);
    }, [calonVotes]);

    useEffect(() => {
        setTotalSuara(Number(suara_sah) + Number(suara_tidak_sah));
    }, [suara_sah, suara_tidak_sah]);

    useEffect(() => {
        const totalVotes = Number(suara_sah) + Number(suara_tidak_sah);
        setIsFormValid(totalVotes === Number(jumlah_dpt));
    }, [suara_sah, suara_tidak_sah, jumlah_dpt]);

    const updateQuickCount = (e) => {
        e.preventDefault();

        const tpsValue = tps_id;
        const kabupatenValue = kabupaten_id;
        const kecamatanValue = kecamatan_id;
        const desaValue = desa_id;

        const data = {
            suara_sah: suara_sah,
            suara_tidak_sah: suara_tidak_sah,
            total_suara: total_suara,
            file: file,
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
                    title: "Success",
                    text: "Quick count data has been saved.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "There was an error saving the quick count data.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    return (
        <>
            <Head>
                <title>Upload C1 - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="page-content">
                    <div className="row mt-3">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={updateQuickCount}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Tps</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={tps}
                                                    onChange={(e) => setTps(e.target.value)}
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
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Kabupaten</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={kabupaten}
                                                    onChange={(e) => setKabupaten(e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Kecamatan</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={kecamatan}
                                                    onChange={(e) => setKecamatan(e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">Desa /Kelurahan</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={desa}
                                                    onChange={(e) => setDesa(e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-12 col-lg-12 d-flex">
                                            <div className="card radius-10 w-100">
                                                <div className="card-header">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <h6 className="mb-0">HASIL HITUNG CEPAT PILKADA 2024</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Paslon</th>
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
                                                                            placeholder="0"
                                                                            value={calonVotes[index].votes}
                                                                            onChange={(e) =>
                                                                                handleCalonVoteChange(index, e.target.value)
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-bold">
                                                                    Suara Sah <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={suara_sah}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            {errors.suara_sah && (
                                                                <div className="alert alert-danger">
                                                                    {errors.suara_sah}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-bold">
                                                                    Suara Tidak Sah <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={suara_tidak_sah}
                                                                    onChange={(e) => setSuaraTidakSah(e.target.value)}
                                                                    placeholder="Masukkan Suara Tidak Sah"
                                                                />
                                                            </div>
                                                            {errors.suara_tidak_sah && (
                                                                <div className="alert alert-danger">
                                                                    {errors.suara_tidak_sah}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-bold">Total Suara</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={total_suara}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-bold">
                                                                    Upload C1 <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    onChange={(e) => setFile(e.target.files[0])}
                                                                />
                                                            </div>
                                                            {errors.file && (
                                                                <div className="alert alert-danger">
                                                                    {errors.file}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 d-grid gap-2">
                                                        <button type="submit" className="btn btn-md btn-warning me-2" disabled={!isFormValid}>
                                                            <i className="fa fa-save"></i> Save
                                                        </button>
                                                        {!isFormValid && (
                                                            <div className="alert alert-danger text-center">
                                                                Total suara harus sama dengan jumlah DPT.
                                                            </div>
                                                        )}
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
