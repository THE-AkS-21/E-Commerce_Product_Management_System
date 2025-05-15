import React from 'react';
import {Link} from "react-router";

interface StatsCardProps {
    headerTitle: string;  // Title of the card (e.g., "Total Users")
    total: number | string;  // Total number, which is displayed in a large font
    img: string;  // Image name for the icon (used in the assets path)
    ctaUrl?: string;
}

/**
 * StatsCard component.
 * Displays a stat card with a title, total number, and an icon.
 */
const StatsCard: React.FC<StatsCardProps> = ({ headerTitle, total, img, ctaUrl }) => {

    return (
        <Link to={ctaUrl} className="stats-card border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
        <article >
            {/* Header of the stats card (e.g., "Total Users") */}
            <h3 className="text-base font-large">
                {headerTitle}
            </h3>

            {/* Content of the stats card */}
            <div className="content">
                <div className="flex flex-col gap-4">
                    {/* Total number displayed with larger font size */}
                    <h2 className="text-4xl font-semibold">{total}</h2>
                </div>

                {/* Image representing the stat */}
                {/* Fallback icon if img is missing or wrong */}
                <img
                    src={`/assets/icons/${img}.png`}
                    className="xl:w-30 w-40 h-40 md:h-32 md:w-30 xl:h-full"
                    alt={img ? `${headerTitle} icon` : "Missing Icon"} // Improved alt text for accessibility
                    onError={(e) => e.currentTarget.src = '/assets/icons/default.png'} // Fallback icon on error
                />
            </div>
        </article>
        </Link>
    );
};

export default StatsCard;
