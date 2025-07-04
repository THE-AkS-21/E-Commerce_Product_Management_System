import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "~/auth/authContext";
import { Link, NavLink, useNavigate } from "react-router";
import { userSidebarItems } from "~/constants";
import { cn } from "~/lib/utils";

const UserNavItems = () => {
    const { authData, logout } = useContext(AuthContext); // Accessing authentication context
    const [imageUrl, setImageUrl] = useState<string>('');  // State to hold the user's profile image URL
    const navigate = useNavigate(); // Hook to navigate between routes

    // Handle user logout
    const handleLogout = () => {
        logout();  // Call logout function from context
        console.log("Logging out...");  // Log message for debugging
        navigate("/");  // Redirect to login page after logout
    };

    // Update profile image based on user role (ADMIN or default customer)
    useEffect(() => {
        if (authData) {
            switch (authData.role) {
                case 'ADMIN':
                    setImageUrl('/assets/icons/admin.png'); // Set admin icon
                    break;
                default:
                    setImageUrl('/assets/icons/customer.png'); // Set default customer icon
            }
        }
    }, [authData]); // Trigger this effect when authData changes

    return (
        <section className="nav-items">
            {/* Logo and link to home */}
            <Link to={'/dashboard'} className={'link-logo'}>
                <img src='/assets/icons/cosmos.png' alt="Logo" className="size-[30px]" />
                <h1>COSMOS</h1>
            </Link>

            <div className="container">
                {/* Sidebar navigation */}
                <nav>
                    {userSidebarItems.map(({ id, href, icon, label }) => (
                        <NavLink to={href} key={id}>
                            {({ isActive }) => (
                                <div className={cn('group nav-item', {
                                    'bg-primary-100 !text-white': isActive  // Style active link differently
                                })}>
                                    {/* Icon for the navigation item */}
                                    <img
                                        src={icon}
                                        alt={label}
                                        className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`}
                                    />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer with user info */}
                <footer className="nav-footer">
                    {authData ? (
                        <>
                            {/* Display user profile image */}
                            <img
                                src={imageUrl || "/assets/icons/default.png"} // Fallback to default icon if imageUrl is not set
                                alt={authData.username || "User Profile"}
                                className="user-profile-img" // You may want to define a specific class for styling
                            />
                            <article>
                                <h2>{authData.username}</h2>
                                <p>{authData.role}</p>
                            </article>
                        </>
                    ) : (
                        <p>SIGN IN</p>  // Prompt for login if no user is authenticated
                    )}

                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer"
                    >
                        <img
                            src="/assets/icons/logout.svg"
                            alt="Logout"
                            className="size-6"
                        />
                    </button>
                </footer>
            </div>
        </section>
    );
};

export default UserNavItems;
