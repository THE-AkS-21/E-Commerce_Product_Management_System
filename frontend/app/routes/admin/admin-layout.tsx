import React from 'react';
import { Navigate, Outlet } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSidebar, NavItems } from "../../../components";

const AdminLayout = () => {
    // Check if the code is running on the client side
    if (typeof window === "undefined") {
        return null; // Return null or a loader if it's server-side rendering
    }

    const authData = JSON.parse(localStorage.getItem("authData") || "null");

    // Redirect if not logged in
    if (!authData) {
        return <Navigate to="/log-in" replace />;
    }

    // Redirect if the user is not an Admin
    if (authData.role !== "ADMIN") {
        return <Navigate to="/user-dashboard" replace />;
    }

    return (
        <div className="admin-layout">
            {/* Mobile Sidebar for smaller screens */}
            <MobileSidebar />

            {/* Desktop Sidebar for larger screens */}
            <aside className="w-full max-w-[270px] hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>
            </aside>

            {/* Main Content Area */}
            <aside className="children">
                <Outlet />
            </aside>
        </div>
    );
};

export default AdminLayout;
