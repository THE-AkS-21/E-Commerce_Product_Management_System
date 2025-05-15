import { Navigate, Outlet } from "react-router-dom";
import { MobileSidebar, UserNavItems } from "../../../components";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import React from "react";

const CustomerLayout = () => {
    // Prevent rendering on the server (for SSR compatibility or if window is undefined)
    if (typeof window === "undefined") {
        return null;  // Alternatively, you can return a loading spinner or placeholder here
    }

    // Retrieve authentication data from localStorage
    const authData = JSON.parse(localStorage.getItem("authData") || "null");

    // Redirect to login if no authData found
    if (!authData) {
        return <Navigate to="/" replace />;
    }

    // Redirect to dashboard if the user is an ADMIN
    if (authData.role === "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    // Render the CustomerLayout with sidebar and content area
    return (
        <div className="admin-layout">
            {/* Mobile Sidebar Component */}
            <MobileSidebar />

            {/* Desktop Sidebar, visible on larger screens */}
            <aside className="w-full max-w-[270px] hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <UserNavItems /> {/* Navigation items for the user */}
                </SidebarComponent>
            </aside>

            {/* Main content area */}
            <aside className="children">
                <Outlet /> {/* Render the child route components here */}
            </aside>
        </div>
    );
};

export default CustomerLayout;
