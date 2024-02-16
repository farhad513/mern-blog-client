import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
import Posts from "./Posts";
import DashboardUser from "./DashboardUser";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 bg_color">
            <DashboardSidebar />
          </div>
          <div className="col-md-8">
            {tab === "profile" && <DashboardProfile />}
            {tab === "posts" && <Posts />}
            {tab === "users" && <DashboardUser />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
