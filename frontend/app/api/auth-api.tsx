import axios from 'axios';
import { delay, log } from '~/lib/utils';

const API_URL = import.meta.env.VITE_API_URL + '/api/Auth';

/**
 * Logs in a user by sending credentials to the backend
 * @param data Object containing username and password
 * @param addDelay Optional boolean to enable artificial delay for smoother UX
 * @returns The response data from the API
 */
export const loginUser = async (
    data: { username: string; password: string },
    addDelay: boolean = false
) => {
    log('loginUser → Request', data);

    const response = await axios.post(`${API_URL}/login`, data);

    log('loginUser → Response', response.data);

    if (addDelay) await delay(500);

    return response.data;
};

/**
 * Registers a new user by sending the registration data to the backend
 * @param data Object containing username, email, password, and role
 * @param addDelay Optional boolean to enable artificial delay for smoother UX
 * @returns The response data from the API
 */
export const registerUser = async (
    data: { username: string; email: string; password: string; role: string },
    addDelay: boolean = false
) => {
    log('registerUser → Request', data);

    const response = await axios.post(`${API_URL}/register`, data);

    log('registerUser → Response', response.data);

    if (addDelay) await delay(500);

    return response.data;
};
