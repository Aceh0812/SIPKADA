import React, { useEffect, useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function QuickCount() {
    const { errors, quickcount, quickcount_details, calons } = usePage().props;

    // Log the quickcount object
    console.log("quickcount:", quickcount);

    // Ensure quickcount object has the values
    const initialSuaraSah =
        quickcount && quickcount.suara_sah ? Number(quickcount.suara_sah) : 0;
    const initialSuaraTidakSah =
        quickcount && quickcount.suara_tidak_sah
            ? Number(quickcount.suara_tidak_sah)
            : 0;
    const initialTotalSuara =
        quickcount && quickcount.total_suara
            ? Number(quickcount.total_suara)
            : 0;

    console.log("Initial Values:", {
        initialSuaraSah,
        initialSuaraTidakSah,
        initialTotalSuara,
    });

    const [tps_id, setTpsId] = useState(quickcount?.tps_name || "");
    const [kabupaten_id, setKabupatenId] = useState(quickcount.kabupaten_id);
    const [kecamatan_id, setKecamatanId] = useState(quickcount.kecamatan_id);
    const [desa_id, setDesaId] = useState(quickcount.desa_id);
    const [tps, setTps] = useState(quickcount.tps);
    const [kabupaten, setKabupaten] = useState(quickcount.kabupaten_name);
    const [kecamatan, setKecamatan] = useState(quickcount.kecamatan_name);
    const [desa, setDesa] = useState(quickcount.desa_name);
    const [jumlah_dpt, setJumlahDpt] = useState(quickcount?.jumlah_dpt || 0);
    const [suara_sah, setSuaraSah] = useState(initialSuaraSah);
    const [suara_tidak_sah, setSuaraTidakSah] = useState(initialSuaraTidakSah);
    const [total_suara, setTotalSuara] = useState(initialTotalSuara);
    const [file, setFile] = useState(null);
    const [calonVotes, setCalonVotes] = useState(
        quickcount_details.map((calon) => ({
            calon_id: calon.calon_id,
            total_suara_calon: calon.total_suara_calon || "",
        }))
    );

    const [isFormValid, setIsFormValid] = useState(false);

    const handleCalonVoteChange = (index, value) => {
        const newCalonVotes = [...calonVotes];
        newCalonVotes[index].total_suara_calon = value;
        setCalonVotes(newCalonVotes);
    };

    useEffect(() => {
        const totalSuaraSah = calonVotes.reduce(
            (total, calon) => total + Number(calon.total_suara_calon || 0),
            0
        );
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

       
        Inertia.post(`/account/quickcounts/${quickcount.id}`, {
            suara_sah: suara_sah,
            suara_tidak_sah: suara_tidak_sah,
            total_suara: total_suara,
            file: file,
            tps_id: tps_id,
            jumlah_dpt: jumlah_dpt,
            calonVotes: calonVotes,
            quickcount_id: quickcount.id,
            _method: "PUT"
        }, {
        
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
                <title>DETAIL C1 - SIPKADA</title>
            </Head>
            <LayoutAccount>
                <div className="page-content">
                    <div className="row mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Detail C1 - SIPKADA</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateQuickCount}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Nama TPS
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={tps_id}
                                                    onChange={(e) =>
                                                        setTpsId(e.target.value)
                                                    }
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
                                                <label className="form-label fw-bold">
                                                    Jumlah Dpt
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={jumlah_dpt}
                                                    onChange={(e) =>
                                                        setJumlahDpt(
                                                            e.target.value
                                                        )
                                                    }
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
                                                <label className="form-label fw-bold">
                                                    Kabupaten
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={kabupaten}
                                                    onChange={(e) =>
                                                        setKabupaten(
                                                            e.target.value
                                                        )
                                                    }
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Kecamatan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={kecamatan}
                                                    onChange={(e) =>
                                                        setKecamatan(
                                                            e.target.value
                                                        )
                                                    }
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Desa /Kelurahan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={desa}
                                                    onChange={(e) =>
                                                        setDesa(e.target.value)
                                                    }
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
                                                            <h6 className="mb-0">
                                                                HASIL HITUNG CEPAT
                                                                PILKADA 2024
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Paslon</th>
                                                                <th>
                                                                    Perolehan
                                                                    Suara
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {quickcount_details.map((calon, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{calon.calon_name}</td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="30"
                                                                            value={calonVotes[index].total_suara_calon}
                                                                            onChange={(e) =>
                                                                                handleCalonVoteChange(index, e.target.value)
                                                                            }
                                                                            readOnly
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                        </tbody>
                                                    </table>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-bold">
                                                                    Suara Sah
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={
                                                                        suara_sah
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSuaraSah(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    readOnly
                                                                />
                                                            </div>
                                                            {errors.suara_sah && (
                                                                <div className="alert alert-danger">
                                                                    {
                                                                        errors.suara_sah
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-bold">
                                                                    Suara Tidak
                                                                    Sah
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={
                                                                        suara_tidak_sah
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSuaraTidakSah(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    readOnly    
                                                                />
                                                            </div>
                                                            {errors.suara_tidak_sah && (
                                                                <div className="alert alert-danger">
                                                                    {
                                                                        errors.suara_tidak_sah
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-bold">
                                                                    Total Suara
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={
                                                                        total_suara
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setTotalSuara(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    readOnly
                                                                />
                                                            </div>
                                                            {errors.total_suara && (
                                                                <div className="alert alert-danger">
                                                                    {
                                                                        errors.total_suara
                                                                    }   
                                                                </div>
                                                            )}
                                                        </div>

                                                     
                                                    </div>
                                                    <div className="mt-3 row">
                                                        <h5>Hasil Upload C1</h5>
                                                    </div>
                                                    <div className="mt-3 d-grid gap-2">
                                                    <a  href={`http://127.0.0.1:8000/storage/quickcounts/${quickcount.file}`} target="_blank"><img src={`http://127.0.0.1:8000/storage/quickcounts/${quickcount.file}`} alt="" /></a>
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
