import React from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";

const StaffLayout: React.FC = () => {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <StaffSidebar />
            <div style={{
                flex: 1,
                backgroundColor: "#f8fafc",
                overflow: "auto"
            }}>
                <Outlet />
            </div>
        </div>
    );
};

export default StaffLayout;