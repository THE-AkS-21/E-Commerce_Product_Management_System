// Importing necessary dependencies and utilities
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from './authContext';
import { loginUser } from "~/api/auth-api";
import type { AuthContextProps, AuthData } from "~/auth/authData";
import { decodeToken } from "~/lib/decodeToken";
import { useNavigate } from "react-router";
import { log, delay } from '~/lib/utils';

/**
 * Provides authentication context across the app.
 * Manages user login, logout, and token/session persistence.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State to hold user authentication data
    const [authData, setAuthData] = useState<AuthData | null>(null);

    // State to hold the JWT token
    const [token, setToken] = useState<string | null>(null);

    // React Router's navigate hook for programmatic navigation
    const navigate = useNavigate();

    /**
     * Runs once on component mount
     * Loads token from localStorage if available
     */
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    /**
     * Runs on component mount to restore session
     * - Loads token & auth data from localStorage
     * - Configures axios Authorization header if token is present
     * - Logs info for debugging
     */
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("authData");

        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.Authorization = `Bearer ${storedToken}`;
            log('AuthProvider', `Token restored: ${storedToken}`);
        }

        if (storedUser) {
            setAuthData(JSON.parse(storedUser));
            log('AuthProvider', 'AuthData restored:', JSON.parse(storedUser));
        } else {
            delete axios.defaults.headers.common["Authorization"];
            setAuthData(null);
            log('AuthProvider', 'No user session found. Cleared auth data.');
        }
    }, []);

    /**
     * Logs user in:
     * - Calls login API
     * - Stores token and user info in localStorage
     * - Configures axios Authorization header
     * - Updates auth context state
     *
     * @param username User's username
     * @param password User's password
     */
    const login = async (username: string, password: string) => {
        log('AuthProvider', `Attempting login for: ${username}`);
        const response = await loginUser({ username, password });
        const newToken = response.token;

        if (newToken) {
            // Save token locally and set axios header
            localStorage.setItem("token", newToken);
            setToken(newToken);
            axios.defaults.headers.Authorization = `Bearer ${newToken}`;
            log('AuthProvider', 'Token set after login:', newToken);

            // Decode token to extract user data
            const decoded = decodeToken(newToken);
            const userData = {
                id: decoded.id,
                username: decoded.unique_name,
                role: decoded.role,
                token: newToken,
            };

            log('AuthProvider', 'Decoded user data:', userData);

            // Store user data locally and in state
            localStorage.setItem("authData", JSON.stringify(userData));
            setAuthData(userData);

            await delay(300); // Optional delay for UX smoothness
        } else {
            console.error("Invalid login response", response);
        }
    };

    /**
     * Logs user out:
     * - Removes token and user data from localStorage
     * - Clears axios Authorization header
     * - Resets authentication context state
     * - Redirects to login page
     */
    const logout = () => {
        log('AuthProvider', 'Logging out user');

        localStorage.removeItem("token");
        localStorage.removeItem("authData");

        setToken(null);
        setAuthData(null);

        axios.defaults.headers.Authorization = '';

        navigate("/");
    };

    // Context value provided to consuming components
    const value: AuthContextProps = { authData, token, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
