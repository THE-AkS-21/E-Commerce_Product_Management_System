import { useContext } from 'react';
import {AuthContext} from "~/auth/authContext";
import type {AuthContextProps} from "~/auth/authData";

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
