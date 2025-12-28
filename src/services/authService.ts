import { api } from './api';
import { AuthResponse, User } from '../types';

export const authService = {
    signup: async (data: any) => {
        const response = await api.post<AuthResponse>('/api/auth/signup', data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await api.post<AuthResponse>('/api/auth/login', data);
        return response.data;
    },
    me: async () => {
        const response = await api.get<{ success: boolean; data: { user: User } }>('/api/auth/me');
        return response.data;
    },
};
