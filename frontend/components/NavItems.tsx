import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router";
import { sidebarItems } from "~/constants";
import { cn } from "~/lib/utils";
import { AuthContext } from "~/auth/authContext";

/**
 * NavItems component.
 * Renders a sidebar navigation with dynamic links, user info, and logout.
 */
const NavItems = () => {
    // Access auth data and logout method from context
    const { authData, logout } = useContext(AuthContext);

    // State to hold user role-based icon
    const [imageUrl, setImageUrl] = useState<string>('');

    // React Router navigation hook
    const navigate = useNavigate();

    /**
     * Handle user logout.
     * Clears auth state and redirects to login page.
     */
    const handleLogout = () => {
        console.log("Logging out in 500ms...");
        setTimeout(() => {
            logout();
            navigate("/log-in");
        }, 500);
    };

    /**
     * Update the sidebar profile image based on user's role.
     * Runs when `authData` changes.
     */
    useEffect(() => {
        if (authData) {
            console.log(`Setting profile icon for role: ${authData.role}`);
            switch (authData.role) {
                case 'ADMIN':
                    setImageUrl('/assets/icons/admin.png');
                    break;
                default:
                    setImageUrl('/assets/icons/customer.png');
            }
        } else {
            console.warn("No authenticated user found.");
        }
    }, [authData]);

    return (
        <section className="nav-items">
            {/* Logo + Brand */}
            <Link to={'/dashboard'} className={'link-logo'}>
                <img src='/assets/icons/cosmos.png' alt="Logo" className="size-[40px]" />
                <h1><span className="text-gray-600">COSMOS</span></h1>
            </Link>

            <div className="container">
                {/* Navigation Links */}
                <nav>
                    {sidebarItems.map(({ id, href, icon, label }) => (
                        <NavLink to={href} key={id}>
                            {({ isActive }: { isActive: boolean }) => (
                                <div className={cn('group nav-item', {
                                    'bg-primary-100 !text-white': isActive
                                })}>
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

                {/* Footer Section */}
                <footer className="nav-footer">
                    {/* User Info */}
                    {authData ? (
                        <>
                            <img
                                src={imageUrl || "/assets/icons/customer.png"}
                                alt={authData.username}
                            />
                            <article>
                                <h2>{authData.username}</h2>
                                <p>{authData.role}</p>
                            </article>
                        </>
                    ) : (
                        <p>SIGN IN</p>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={() => {
                            handleLogout();
                        }}
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

export default NavItems;
