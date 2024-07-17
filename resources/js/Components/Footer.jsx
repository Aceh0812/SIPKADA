//import React
import React from "react";

//import permissions
import hasAnyPermission from "../utils/Permissions.jsx";
import { GrCaretNext } from "react-icons/gr";
import { TbSquareRoundedChevronRight } from "react-icons/tb";
//import Link and usePage
import { Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
export default function Footer({ myCoursesChild,courseIds }) {
    //destruct URL from props
    const { url } = usePage();
    const [isListVisible, setListVisible] = useState(false);
    const [isButtonActive, setButtonActive] = useState(false);
console.log(courseIds)
    const toggleListVisibility = () => {
        setListVisible(!isListVisible);
        // Mengubah status tombol active
        setButtonActive(!isButtonActive);
    };

    return (
        <>
         <div className="bg-light">
<div className="row justify-content-md-center p-3 text-white text-center container-fluid">
    <div className="row">
        <div className="col-md-4 mt-4">
            {/* Footer Logo */}
            <img src="/assets/images/mwd.png" alt="Company Logo" className="rounded" height={50} />
            <p>
                &copy; {new Date().getFullYear()} MWD
                COURSE
            </p>
        </div>
        <div className="col-md-8">
            <div className="row">
                <div className="col-md-3">
                    <h5>COMPANY</h5>
                    <p>About Us</p>
                    <p>Our Team</p>
                </div>
                <div className="col-md-3">
                    <h5>PRODUCTS</h5>
                    <p>Product 1</p>
                    <p>Product 2</p>
                </div>
                <div className="col-md-3">
                    <h5>RESOURCES</h5>
                    <p>Blog</p>
                    <p>FAQ</p>
                </div>
                <div className="col-md-3">
                    <h5>CONTACT</h5>
                    <p>
                        Email: mulyawardhana@gmail.com
                    </p>
                    <p>WA: 08121299429</p>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
        </>
    );
}


