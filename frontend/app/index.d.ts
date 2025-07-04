// declare interface BaseUser {
//     id?: number;
//     username: string;
//     email: string;
//     password: string;
//     role: string;
//     createdAt?: string;
// }
//
// declare interface UserData extends BaseUser {
//     itineraryCreated: number | string;
//     status: "user" | "admin";
// }
//
// declare type User = BaseUser;

declare interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt?: string;
}

declare interface DropdownItem {
    name: string;
}

declare interface SelectProps {
    data: Country[] | DropdownItem[];
    onValueChange: (value: string) => void;
    id: string;
    label: string;
    placeholder: string;
}

declare interface PillProps {
    text: string;
    bgColor?: string;
    textColor?: string;
}


declare interface Product{
    id?: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    imageUrl?: string;
    createdAt?: string | null;
    updatedAt?: string | null;
}

declare interface Category {
    id?: number;
    name: string;
    description: string;
}

declare interface StatsCard {
    headerTitle: string;
    total: number;
    img: string;
}

declare interface TrendResult {
    trend: "increment" | "decrement" | "no change";
    percentage: number;
}

declare interface InfoPillProps {
    text: string;
    image: string;
}

