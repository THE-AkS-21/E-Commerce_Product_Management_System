import { Link } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";

/**
 * MobileSidebar component.
 * Uses Syncfusion SidebarComponent for a slide-out mobile sidebar.
 * Includes site logo, brand title, and a hamburger menu toggle button.
 */
const MobileSidebar = () => {
    // Sidebar instance (via ref)
    let sidebar: SidebarComponent;

    /**
     * Toggle the sidebar open/close.
     * Adds error handling if sidebar ref isn't set.
     */
    const toggleSidebar = () => {
        if (sidebar) {
            console.log("Waiting 500ms before toggling sidebar...");
            setTimeout(() => {
                sidebar.toggle();
            }, 500);
        } else {
            console.warn("Sidebar reference is not available.");
        }
    };

    return (
        <div className="mobile-sidebar wrapper">
            {/* Top header section */}
            <header>
                <Link to="/">
                    <img
                        src="/assets/icons/cosmos.png"
                        alt="Logo"
                        className="size-[30px]"
                    />
                    <h1>THE AKS</h1>
                </Link>

                {/* Hamburger Menu Button */}
                <button onClick={toggleSidebar}>
                    <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
                </button>
            </header>

            {/* SidebarComponent (Syncfusion) */}
            <SidebarComponent
                width={270}
                ref={(Sidebar) => (sidebar = Sidebar)}
                created={() => {
                    if (sidebar) {
                        console.log("Sidebar created, hiding it by default.");
                        sidebar.hide();
                    }
                }}
                closeOnDocumentClick={true}
                showBackdrop={true}
                type="over"
            >
                {/* Sidebar Nav Items */}
                <NavItems handleClick={toggleSidebar} />
            </SidebarComponent>
        </div>
    );
};

export default MobileSidebar;
