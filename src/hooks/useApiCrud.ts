import { useState, useEffect, useCallback, useRef } from 'react';
import apiClient from '@services/api.client';

interface UseApiCrudOptions<T> {
    endpoint: string;
    defaultData?: T[];
    pollingInterval?: number; // ms, default 30000
    autoFetch?: boolean;
    /** Transform API response to array of items */
    transformResponse?: (response: any) => T[];
}

interface UseApiCrudReturn<T> {
    items: T[];
    setItems: React.Dispatch<React.SetStateAction<T[]>>;
    loading: boolean;
    error: string | null;
    lastUpdated: Date;
    isPolling: boolean;
    /** Refetch data from API */
    refresh: () => Promise<void>;
    /** Create a new item via API */
    create: (data: Partial<T>) => Promise<T | null>;
    /** Update an item via API */
    update: (id: number | string, data: Partial<T>) => Promise<T | null>;
    /** Delete an item via API */
    remove: (id: number | string) => Promise<boolean>;
    /** Show a toast notification */
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
    /** Current toast state */
    toast: { message: string; type: 'success' | 'error' | 'info'; id: number } | null;
    /** Dismiss toast */
    dismissToast: () => void;
}

export function useApiCrud<T extends { id: number | string }>(
    options: UseApiCrudOptions<T>
): UseApiCrudReturn<T> {
    const {
        endpoint,
        defaultData = [],
        pollingInterval = 30000,
        autoFetch = true,
        transformResponse,
    } = options;

    const [items, setItems] = useState<T[]>(defaultData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [isPolling, setIsPolling] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; id: number } | null>(null);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isMountedRef = useRef(true);
    const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        const id = Date.now();
        setToast({ message, type, id });
        toastTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) setToast(null);
        }, 3500);
    }, []);

    const dismissToast = useCallback(() => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setToast(null);
    }, []);

    const fetchData = useCallback(async (silent = false) => {
        try {
            if (!silent) setLoading(true);
            else setIsPolling(true);

            const response = await apiClient.get(endpoint);

            if (!isMountedRef.current) return;

            let data: T[];
            if (transformResponse) {
                data = transformResponse(response.data);
            } else if (response.data?.data?.data) {
                // Paginated response: { data: { data: [...] } }
                data = response.data.data.data;
            } else if (response.data?.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            } else if (Array.isArray(response.data)) {
                data = response.data;
            } else {
                data = defaultData;
            }

            setItems(data);
            setError(null);
            setLastUpdated(new Date());
        } catch (e: any) {
            if (!isMountedRef.current) return;
            console.error(`Error fetching ${endpoint}:`, e);
            if (!silent) {
                setError(e.message || 'Failed to fetch data');
                // Keep default data on first-load error
                if (items.length === 0 && defaultData.length > 0) {
                    setItems(defaultData);
                }
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
                setIsPolling(false);
            }
        }
    }, [endpoint, defaultData, transformResponse]);

    // Initial fetch
    useEffect(() => {
        isMountedRef.current = true;
        if (autoFetch) {
            fetchData(false);
        } else {
            setLoading(false);
        }
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Polling
    useEffect(() => {
        if (pollingInterval > 0 && autoFetch) {
            intervalRef.current = setInterval(() => {
                fetchData(true);
            }, pollingInterval);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [pollingInterval, autoFetch, fetchData]);

    const refresh = useCallback(async () => {
        await fetchData(false);
        showToast('Data refreshed', 'info');
    }, [fetchData, showToast]);

    const create = useCallback(async (data: Partial<T>): Promise<T | null> => {
        try {
            const response = await apiClient.post(endpoint, data);
            const newItem = response.data?.data || response.data;

            // Optimistic update: add to top
            setItems(prev => [newItem, ...prev]);
            setLastUpdated(new Date());
            showToast('Created successfully', 'success');
            return newItem;
        } catch (e: any) {
            console.error(`Error creating ${endpoint}:`, e);
            showToast(e.response?.data?.message || 'Failed to create', 'error');
            return null;
        }
    }, [endpoint, showToast]);

    const update = useCallback(async (id: number | string, data: Partial<T>): Promise<T | null> => {
        try {
            const response = await apiClient.put(`${endpoint}/${id}`, data);
            const updatedItem = response.data?.data || response.data;

            // Optimistic update
            setItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
            setLastUpdated(new Date());
            showToast('Updated successfully', 'success');
            return updatedItem;
        } catch (e: any) {
            console.error(`Error updating ${endpoint}/${id}:`, e);
            showToast(e.response?.data?.message || 'Failed to update', 'error');
            return null;
        }
    }, [endpoint, showToast]);

    const remove = useCallback(async (id: number | string): Promise<boolean> => {
        try {
            await apiClient.delete(`${endpoint}/${id}`);

            // Optimistic update
            setItems(prev => prev.filter(item => item.id !== id));
            setLastUpdated(new Date());
            showToast('Deleted successfully', 'success');
            return true;
        } catch (e: any) {
            console.error(`Error deleting ${endpoint}/${id}:`, e);
            showToast(e.response?.data?.message || 'Failed to delete', 'error');
            return false;
        }
    }, [endpoint, showToast]);

    return {
        items,
        setItems,
        loading,
        error,
        lastUpdated,
        isPolling,
        refresh,
        create,
        update,
        remove,
        showToast,
        toast,
        dismissToast,
    };
}

export default useApiCrud;
