export const decodeToken = (token: string): any => {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (e) {
        console.error("Failed to decode token", e);
        return null;
    }
};
