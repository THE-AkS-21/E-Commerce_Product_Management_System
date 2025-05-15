import React from 'react'
import { cn } from "~/lib/utils";
import { Link, useLocation } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

// Props interface for type-safety and autocomplete
interface HeaderProps {
    title: string;
    description: string;
    createText?: string;
    createUrl?: string;
}

/**
 * Reusable header component.
 * Dynamically changes its text size and weight based on current route.
 * Optionally displays a CTA button (like "Create User" or "Add Product").
 */
const Header = ({ title, description, createText, createUrl }: HeaderProps) => {
    const location = useLocation(); // Get the current route

    // Log current location for debugging during development
    console.log("Current Path:", location.pathname);

    // Warn if createText or createUrl is missing when one exists
    if ((createText && !createUrl) || (!createText && createUrl)) {
        console.warn("Both 'createText' and 'createUrl' should be provided together.");
    }

    return (
        <header className="header">
            {/* Title and Description */}
            <article>
                <h1
                    className={cn(
                        "text-gray-700",
                        location.pathname === '/'
                            ? 'text-2xl md:text-4 font-bold'
                            : 'text-xl md:text-2xl font-semibold'
                    )}
                >
                    {title}
                </h1>
                <p
                    className={cn(
                        "text-gray-100 font-normal",
                        location.pathname === '/'
                            ? 'text-base md:text-lg'
                            : 'text-sm md:text-lg'
                    )}
                >
                    {description}
                </p>
            </article>

            {/* Optional CTA Button */}
            {createText && createUrl && (
                <Link to={createUrl}>
                    <ButtonComponent
                        type="button"
                        className="button-class !bg-primary-100 !h-10 !w-30 md:w-[240px]"
                    >
                        <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />
                        <span className="p-16-semibold text-white">{createText}</span>
                    </ButtonComponent>
                </Link>
            )}
        </header>
    )
}

export default Header;
