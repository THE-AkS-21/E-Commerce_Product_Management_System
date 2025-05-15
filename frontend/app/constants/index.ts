export const sidebarItems = [
    {
        id: 1,
        icon: "/assets/icons/home.svg",
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        id: 2,
        icon: "/assets/icons/users.svg",
        label: "All Products",
        href: "/all-product",
    },
    {
        id: 3,
        icon: "/assets/icons/itinerary.svg",
        label: "All Categories",
        href: "/all-categories",
    },
    {
        id: 4,
        icon: "/assets/icons/itinerary.svg",
        label: "All Customers",
        href: "/all-users",
    },
];

export const userSidebarItems = [
    {
        id: 1,
        icon: "/assets/icons/users.svg",
        label: "All Products",
        href: "/user-dashboard",
    },
];

export interface LoadingScreenProps {
    onComplete: () => void;
}

export const roles =[
    "ADMIN",
    "CUSTOMER",
];

