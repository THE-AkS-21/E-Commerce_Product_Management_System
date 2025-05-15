import { useEffect, useState } from "react";
import { getAllUsers, getUsersCount } from "~/api/users-api";
import { delay } from "~/lib/utils";

/**
 *  Hook: Get total user count.
 * Fetches the total number of users and sets the state.
 */
export const UserCount = () => {
    // State to hold the total user count
    const [userCount, setCount] = useState<number>(0);

    useEffect(() => {
        // Fetch total users count when the component mounts
        const fetchCount = async () => {
            try {
                // Call the API to get the total count of users
                const Count = await getUsersCount();
                console.log("Fetched user count:", Count);  // Log the fetched count
                setCount(Count);  // Update the state with the fetched count
            } catch (error) {
                // Log any error that occurs during the fetch
                console.error("Error fetching user count:", error);
            }
        };
        fetchCount();  // Trigger the count fetch on component mount
    }, []);

    return userCount;  // Return the user count for use in the component
};

/**
 * Hook: Fetch all users data.
 * Retrieves a list of all users and handles error state.
 */
export const AllUsersData = () => {
    // State to hold the list of users
    const [users, setUsers] = useState<User[]>([]);
    // State to hold any error message in case of failure
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch all users when the component mounts
        const fetchUsers = async () => {
            try {
                // Call the API to get all users
                const data = await getAllUsers();
                console.log("Fetched all users:", data);  // Log the fetched data
                await delay(300);  // Optional delay to make UI updates smoother
                setUsers(data);  // Update the users state with the fetched data
            } catch (err: any) {
                // Log any error that occurs during the fetch
                console.error("Error fetching users:", err);
                // Set the error state with a user-friendly message
                setError('Failed to load users');
            }
        };

        fetchUsers();  // Trigger the user fetch on component mount
    }, []);  // Empty dependency array to only run this once on mount

    return { users, error };  // Return the users data and any error encountered
};
