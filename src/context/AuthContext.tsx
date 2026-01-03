import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (data: any) => Promise<User | null>;
    signup: (data: any) => Promise<User | null>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken) {
                setToken(storedToken);
                // Optimistically set user if available
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (e) {
                        console.error("Error parsing stored user", e);
                    }
                }

                try {
                    const response = await authService.me();
                    if (response.success) {
                        setUser(response.data.user);
                        localStorage.setItem('user', JSON.stringify(response.data.user)); // Update with fresh data
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    // Don't auto-logout immediately on network error, but if token is invalid, authService.me should handle it
                    // For now, if me() completely fails (e.g. 401), we logout
                    // logout(); 
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (data: any) => {
        const response = await authService.login(data);
        if (response.success && response.data.token) { // Check if token exists
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setToken(newToken);
            setUser(response.data.user);
            return response.data.user;
        }
        return null;
    };

    const signup = async (data: any) => {
        const response = await authService.signup(data);
        if (response.success && response.data.token) {
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setToken(newToken);
            setUser(response.data.user);
            return response.data.user;
        }
        return null;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, signup, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
