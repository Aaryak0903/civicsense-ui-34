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
            if (storedToken) {
                setToken(storedToken);
                try {
                    const response = await authService.me();
                    if (response.success) {
                        setUser(response.data.user);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    logout();
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
            setToken(newToken);
            setUser(response.data.user);
            return response.data.user;
        }
        return null;
    };

    const logout = () => {
        localStorage.removeItem('token');
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
