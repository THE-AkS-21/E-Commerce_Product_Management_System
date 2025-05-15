import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string): string => {
    return dayjs(dateString).format("MMMM DD, YYYY");
};

/**
 * Adds an artificial delay (in ms)
 * @param ms Number of milliseconds to delay
 * @returns Promise that resolves after the given time
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Standardized logging utility to keep logs consistent
 * @param context Source context of the log (like function name)
 * @param data Data or message to log
 */
export const log = (source: string, message: string, data?: any) => {
    console.log(`[${source}] ${message}`, data ?? '');
};
