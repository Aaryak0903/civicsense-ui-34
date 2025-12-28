import { api } from './api';
import { Issue, IssueResponse, IssuesResponse } from '../types';

export const issueService = {
    createIssue: async (data: any) => {
        const response = await api.post<IssueResponse>('/api/issues/create', data);
        return response.data;
    },
    getAllIssues: async (params?: any) => {
        const response = await api.get<IssuesResponse>('/api/issues', { params });
        return response.data;
    },
    getNearbyIssues: async (longitude: number, latitude: number, maxDistance?: number) => {
        const response = await api.get<IssuesResponse>('/api/issues/nearby', {
            params: { longitude, latitude, maxDistance },
        });
        return response.data;
    },
    getIssueById: async (id: string) => {
        const response = await api.get<IssueResponse>(`/api/issues/${id}`);
        return response.data;
    },
    updateIssueStatus: async (id: string, status: string) => {
        const response = await api.patch<IssueResponse>(`/api/issues/${id}/status`, { status });
        return response.data;
    },
    upvoteIssue: async (id: string) => {
        const response = await api.post<IssueResponse>(`/api/issues/${id}/upvote`);
        return response.data;
    },
    addComment: async (id: string, text: string) => {
        const response = await api.post<IssueResponse>(`/api/issues/${id}/comment`, { text });
        return response.data;
    },
};
