import React, { createContext, useState, useEffect } from "react";

import * as authApi from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (accessToken) {
            setIsAuthenticated(true);
        } else {
            setLoading(false);
            setUser(null);
            setIsAuthenticated(false);
        }
    }, [accessToken]);

    const login = async (userData) => {
        const data = await authApi.login(userData);
        setUser(data.user);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data;
    };

    const logout = async () => {
        await authApi.logout();
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    const refreshAccessToken = async () => {
        try {
            const data = await authApi.refreshToken();
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        } catch (error) {
            console.error("Failed to refresh access token:", error);
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshAccessToken, isAuthenticated, accessToken, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

