import { createContext } from "react";
import type { AuthContextProps } from "~/auth/authData";
import { log } from "~/lib/utils";

/**
 * AuthContext provides global authentication state and actions.
 * This includes:
 *  - authData: decoded user info
 *  - token: JWT token string
 *  - login: function to log in user
 *  - logout: function to log out user
 *
 * Default values ensure context consumers won’t break if no provider is present.
 */
export const AuthContext = createContext<AuthContextProps>({
    authData: null,
    token: null,
    login: async () => {
        log("AuthContext", "login() called without provider");
    },
    logout: () => {
        log("AuthContext", "logout() called without provider");
    }
});
