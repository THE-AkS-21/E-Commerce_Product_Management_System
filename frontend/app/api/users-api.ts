import axios from 'axios';
import { delay, log } from '~/lib/utils';

const API_URL = import.meta.env.VITE_API_URL + '/api/User';

/**
 * Fetches all users from the API
 * @returns Array of users
 */
export const getAllUsers = async () => {
    log('getAllUsers', 'Fetching all users');

    try {
        const response = await axios.get(`${API_URL}/Get`);
        log('getAllUsers → Response', response.data);

        await delay(300);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

/**
 * Fetches total number of users in the system
 * @returns Number of users
 */
export const getUsersCount = async () => {
    log('getUsersCount', 'Fetching total user count');

    try {
        const response = await axios.get(`${API_URL}/Get/count`);
        log('getUsersCount → Response', response.data);

        await delay(300);
        return response.data.totalUsers;
    } catch (error) {
        console.error('Error fetching user count:', error);
        throw error;
    }
};
