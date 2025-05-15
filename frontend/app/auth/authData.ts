export type AuthData = {
    id: string;
    username: string;
    role: string;
    token: string;
};

export type AuthContextProps = {
    authData: AuthData | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

