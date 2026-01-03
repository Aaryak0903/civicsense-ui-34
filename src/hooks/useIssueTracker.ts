import { useEffect, useState } from 'react';
import { API_URL } from '../services/api';
import { useQueryClient } from '@tanstack/react-query';

export interface IssueUpdate {
    type: 'ISSUE_CREATED' | 'ISSUE_UPDATED' | 'ISSUE_UPVOTED';
    data: any;
    timestamp?: string;
}

const useIssueTracker = () => {
    const [updates, setUpdates] = useState<IssueUpdate[]>([]);
    const queryClient = useQueryClient();

    useEffect(() => {
        // 1. Open Connection
        const eventSource = new EventSource(`${API_URL}/api/sse/stream`);

        // 2. Listen for messages
        eventSource.onmessage = (event) => {
            try {
                const update = JSON.parse(event.data);
                console.log('Real-time update received:', update);

                // Add new update to state
                setUpdates((prev) => [update, ...prev]);

                // Invalidate queries to refresh lists across the app (Citizen & Officer dashboards)
                queryClient.invalidateQueries({ queryKey: ['issues'] });

            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        };

        eventSource.onerror = (err) => {
            console.error('SSE Connection Error:', err);
            // The user snippet suggests closing on error, which stops reconnects.
            // We'll follow the instruction, but normally SSE auto-reconnects.
            eventSource.close();
        };

        // 3. Cleanup on unmount
        return () => {
            eventSource.close();
        };
    }, [queryClient]);

    return updates;
};

export default useIssueTracker;
