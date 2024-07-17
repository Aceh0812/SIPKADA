//import hook react
import React, { useState } from "react";

//import Head, usePage and Link
import { Head, usePage, Link } from "@inertiajs/inertia-react";

//import inertia adapter
import { Inertia } from "@inertiajs/inertia";
import { CiLogin } from "react-icons/ci";
import { MdAttachEmail, MdPassword } from "react-icons/md";

export default function Login() {
    //destruct props "errors"
    const { errors } = usePage().props;

    //state user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //function "loginHandler"
    const loginHandler = async (e) => {
        e.preventDefault();

        //login
        Inertia.post("/login", {
            email: email,
            password: password,
        });
    };
    React.useEffect(() => {
        // Hide vertical scroll bar
        document.body.style.overflowY = "hidden";

        // Cleanup the style when the component unmounts
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);
    const customUnderlineStyle = {
        borderBottom: "10px solid #029662", // Menggunakan warna success di Bootstrap (hijau)
        display: "inline-block", // Membuat garis bawah hanya sepanjang teks
        paddingBottom: "5px", // Menyesuaikan jarak antara teks dan garis bawah
        borderRadius: "5px", // Menambahkan border radius
        width: "100px",
        
    };
    return (
        <>
            <Head>
                <title>Login SIPKADA</title>
            </Head>
            <div className="bg-grey">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-7 mt-70 ">
                            <img src="/assets/images/kas.png" width={"500"} />
                        </div>
                        <div className="col-md-5 mt-100">
                            <div className="text-center mb-4">
                                {/* <h4>Aplikasi Keuangan</h4> */}
                            </div>
                            <div className="card border-0 rounded-4 shadow-sm border-top-success">
                                <div className="card-body">
                                    <div className="text-center">
                                        <h6 className="fw-bold">
                                            LOGIN SIPKADA
                                        </h6>
                                        <hr />
                                    </div>
                                    <form onSubmit={loginHandler}>
                                        <label className="mb-1">
                                            Email Address
                                        </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <MdAttachEmail size={30} />
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder="Email Address"
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="alert alert-danger">
                                                {errors.email}
                                            </div>
                                        )}

                                        <label className="mb-1">Password</label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <MdPassword size={30} />
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                placeholder="Password"
                                            />
                                        </div>
                                        {errors.password && (
                                            <div className="alert alert-danger">
                                                {errors.password}
                                            </div>
                                        )}

                                        <button
                                            className="btn btn-success shadow-sm rounded-sm px-4 w-100"
                                            type="submit"
                                        >
                                            <CiLogin size={25} /> LOGIN
                                        </button>
                                    </form>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}