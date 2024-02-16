import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

import { HiDocumentText } from "react-icons/hi";
const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <Link
        to={"/dashboard/?tab=profile"}
        className="w-75 bg-transparent text-white border text-dark text-decoration-none  p-2 mt-4 text-start d-flex justify-content-between align-items-center mb-4 gap-2"
      >
        <div className="d-flex justify-content-center gap-2 text-white">
          <CgProfile className="fs-5 gap-5" />
          Profile
        </div>
        <span>{userInfo.role}</span>
      </Link>
      {userInfo.role === "admin" && (
        <Link
          to={"/dashboard/?tab=posts"}
          className="w-75 bg-transparent text-white border text-dark text-decoration-none  p-2 mt-4 text-start d-flex justify-content-between align-items-center mb-4 gap-2"
        >
          <div className="d-flex justify-content-center gap-2 text-white">
            <HiDocumentText className="fs-5 gap-5" />
            Posts
          </div>
        </Link>
      )}
      {userInfo.role === "admin" && (
        <Link
          to={"/dashboard/?tab=users"}
          className="w-75 bg-transparent text-white border text-dark text-decoration-none  p-2 mt-4 text-start d-flex justify-content-between align-items-center mb-4 gap-2"
        >
          <div className="d-flex justify-content-center gap-2 text-white">
            <FaRegUser className="fs-5 gap-5" />
            Users
          </div>
        </Link>
      )}
      <Link className="w-75 text-dark text-decoration-none text-white  bg-transparent border p-2 mt-4 text-start d-flex justify-content-between align-items-center mb-4 gap-2">
        <div className="d-flex justify-content-center gap-2">
          <IoMdLogOut className="fs-5 gap-5" />
          Signout
        </div>
      </Link>
    </div>
  );
};

export default DashboardSidebar;
