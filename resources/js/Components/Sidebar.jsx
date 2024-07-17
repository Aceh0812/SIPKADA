//import React
import React, { useState } from "react";

//import permissions
import hasAnyPermission from "../utils/Permissions.jsx";

import { Link, usePage } from "@inertiajs/inertia-react";
import {
    MdOutlineDashboard,
    MdOutlineStorage,
    MdOutlineCategory,
    MdSpaceDashboard,
} from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { HiReceiptRefund } from "react-icons/hi";
import { LiaUsersCogSolid } from "react-icons/lia";
import { TbCategoryPlus } from "react-icons/tb";
import { CgProductHunt } from "react-icons/cg";
import { FaPeopleRoof } from "react-icons/fa6";
import { IoBarChartOutline } from "react-icons/io5";
import { BiSolidLabel, BiSolidReport } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { TbCreditCardFilled } from "react-icons/tb";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaHotel,FaUserShield  } from "react-icons/fa";
import { PiSubtitlesBold } from "react-icons/pi";
import { TbStatusChange } from "react-icons/tb";
import { GiServerRack } from "react-icons/gi";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FiType } from "react-icons/fi";
import { GiShop, GiMechanicGarage,GiFireplace  } from "react-icons/gi";
import { FaMotorcycle,FaUsers,FaFileUpload   } from "react-icons/fa";
import { LuAlignVerticalDistributeCenter } from "react-icons/lu";
import { MdHolidayVillage } from "react-icons/md";

export default function Sidebar() {
    const { url } = usePage();
    const [isManagementOpen, setManagemenOpen] = useState(false);
    const [isMasterOpen, setMasterOpen] = useState(false);
    const [isTransactionPosOpen, setTransactionPosOpen] = useState(false);
    const [isServiceOpen, setServiceOpen] = useState(false);
    const [isPurchaseOpen, setPurchaseOpen] = useState(false);
    const handleManagementToggle = () => {
        setManagemenOpen(!isManagementOpen);
    };
    const handleTransactionPosToggle = () => {
        setTransactionPosOpen(!isTransactionPosOpen);
    };
    const handleMasterToggle = () => {
        setMasterOpen(!isMasterOpen);
    };
    const handleServiceToggle = () => {
        setServiceOpen(!isServiceOpen);
    };
    const handlePurchaseToggle = () => {
        setPurchaseOpen(!isPurchaseOpen);
    };

    return (
        <>
            <div className="list-group list-group-flush d-flex justify-content-center p-2">
                {/* Dashboard Item */}
                {hasAnyPermission(["dashboard.index"]) && (
                    <Link
                        href="/account/dashboard"
                        className={`${
                            url.startsWith("/account/dashboard")
                            ? "active list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                                : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/dashboard")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <MdOutlineDashboard
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>Dashboard</span>
                        </div>
                    </Link>
                )}
                {hasAnyPermission(["quickcount-lists.index"]) && (
                    <Link
                        href="/account/list-quickcounts"
                        className={`${
                            url.startsWith("/account/list-quickcounts")
                            ? "active list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                                : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/list-quickcounts")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <FaFileUpload
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>List TPS</span>
                        </div>
                    </Link>
                )}
                {hasAnyPermission(["quickcounts.index"]) && (
                    <Link
                        href="/account/quickcounts"
                        className={`${
                            url.startsWith("/account/quickcounts")
                            ? "active list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                                : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/quickcounts")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <FaFileUpload
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>Upload C1</span>
                        </div>
                    </Link>
                )}
                {/* )} */}
  {hasAnyPermission(["calons.index"]) && (
  <div class=" text-light ms-2 mb-1 mt-1">
                        <hr />
                        <h6>Master</h6>
                        <hr />
                    </div>
                )}
                {hasAnyPermission(["calons.index"]) && (
                <Link
                        href="/account/calons"
                        className={`${
                            url.startsWith("/account/calons")
                                ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                              : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/calons")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <FaUserShield 
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>Paslon</span>
                        </div>
                    </Link>
                )}
                {hasAnyPermission(["saksis.index"]) && (
                    <Link
                        href="/account/saksis"
                        className={`${
                            url.startsWith("/account/saksis")
                                ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                              : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/saksis")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <FaUsers
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>Saksi</span>
                        </div>
                    </Link>
                )}
                {hasAnyPermission(["kabupatens.index"]) && (
                    <Link
                        href="/account/kabupatens"
                        className={`${
                            url.startsWith("/account/kabupatens")
                                ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                              : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/kabupatens")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <LuAlignVerticalDistributeCenter
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>Kabupaten</span>
                        </div>
                    </Link>
                )}
                {hasAnyPermission(["kecamatans.index"]) && (
                    <Link
                        href="/account/kecamatans"
                        className={`${
                            url.startsWith("/account/kecamatans")
                                ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                              : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/kecamatans")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <LuAlignVerticalDistributeCenter
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>Kecamatan</span>
                        </div>
                    </Link>
                )}
                {hasAnyPermission(["desas.index"]) && (
                    <Link
                        href="/account/desas"
                        className={`${
                            url.startsWith("/account/desas")
                                ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                              : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/desas")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <MdHolidayVillage
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>Desa</span>
                        </div>
                    </Link>
                )}
                {hasAnyPermission(["tpses.index"]) && (
                    <Link
                        href="/account/tpses"
                        className={`${
                            url.startsWith("/account/tpses")
                                ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                              : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/tpses")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <GiFireplace
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>TPS</span>
                        </div>
                    </Link>
                )}
                {hasAnyPermission(["pemilihs.index"]) && (
                    <Link
                        href="/account/pemilihs"
                        className={`${
                            url.startsWith("/account/pemilihs")
                                ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                              : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                             } text-light`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            className={`${
                                url.startsWith("/account/pemilihs")
                                    ? "active text-white "
                                    : "text-second"
                                 } text-light`}
                        >
                            {" "}
                            <GiFireplace
                                className="mb-2 me-3"
                                size={20}
                            />{" "}
                            <span>Pemilih Tetap</span>
                        </div>
                    </Link>
                )}
                
                {hasAnyPermission(["roles.index"]) && (
                    <div class=" text-light ms-2 mb-1 mt-1">
                        <hr />
                        <h6>Setting</h6>
                        <hr />
                    </div>
                )}


<>
                        {hasAnyPermission(["roles.index"]) && (
                            <Link
                                href="/account/roles"
                                className={`${
                                    url.startsWith("/account/roles")
                                        ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                                      : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                                     } text-light`}
                                style={{ textDecoration: "none" }}
                            >
                                <div
                                    className={`${
                                        url.startsWith("/account/roles")
                                            ? "active text-white "
                                            : "text-second"
                                         } text-light`}
                                >
                                    {" "}
                                    <i className="fa fa-shield-alt me-2"></i>{" "}
                                    <span>Roles</span>
                                </div>
                            </Link>
                        )}
                        {hasAnyPermission(["permissions.index"]) && (
                            <Link
                                href="/account/permissions"
                                className={`${
                                    url.startsWith("/account/permissions")
                                        ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                                      : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                                     } text-light`}
                                style={{ textDecoration: "none" }}
                            >
                                <div
                                    className={`${
                                        url.startsWith("/account/permissions")
                                            ? "active text-white "
                                            : "text-second"
                                         } text-light`}
                                >
                                    {" "}
                                    <i className="fa fa-key me-2"></i>{" "}
                                    <span>Permissions</span>
                                </div>
                            </Link>
                        )}
                        {hasAnyPermission(["users.index"]) && (
                            <Link
                                href="/account/users"
                                className={`${
                                    url.startsWith("/account/users")
                                        ? "active list-group-item list-group-item-action list-group-item-light p-2 rounded-tops mb-2"
                                      : "list-group-item list-group-item-action list-group-item-light rounded-tops p-3"
                                     } text-light`}
                                style={{ textDecoration: "none" }}
                            >
                                <div
                                    className={`${
                                        url.startsWith("/account/users")
                                            ? "active text-white "
                                            : "text-second"
                                         } text-light`}
                                >
                                    {" "}
                                    <i className="fa fa-users me-2"></i>{" "}
                                    <span>users</span>
                                </div>
                            </Link>
                        )}
                    </>

               
            </div>
        </>
    );
}
