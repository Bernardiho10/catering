import { useState, useEffect } from 'react';
import { MenuItem } from '@/features/menu/types';
import { createClient } from '@/lib/supabase/client';
import { cacheMenuItems, getCachedMenuItems } from '@/lib/db';
import { toast } from 'sonner';

export function useMenu() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true);
            const supabase = createClient();

            // 1. Try to get cached data first (stale-while-revalidate)
            try {
                const cached = await getCachedMenuItems();
                if (cached.length > 0) {
                    setItems(cached);
                    setLoading(false); // Show content immediately
                }
            } catch (error) {
                console.warn('Failed to load from cache:', error);
            }

            // 2. Fetch fresh data
            try {
                const { data, error } = await supabase
                    .from('menu_items')
                    .select('*')
                    .eq('active', true);

                if (error) throw error;

                if (data) {
                    setItems(data as MenuItem[]);
                    // 3. Update cache
                    await cacheMenuItems(data as MenuItem[]);
                }
                setIsOffline(false);
            } catch (error) {
                // Verify if it's a network error or Supabase error
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';

                // Don't spam console with connection errors if local dev
                if (process.env.NODE_ENV === 'development' && errorMessage.includes('fetch')) {
                    console.warn('Could not connect to Supabase. Is the local server running?');
                } else {
                    console.error('Menu fetch error:', error);
                }

                // If we didn't have cache, and fetch failed, we are in trouble.
                // But if we had cache, we are fine, just notify user maybe.
                if (!navigator.onLine) {
                    setIsOffline(true);
                    toast.info("You're offline. Viewing cached menu.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();

        // Listen for online status
        const handleOnline = () => { setIsOffline(false); toast.success("Back online!"); fetchMenu(); };
        const handleOffline = () => { setIsOffline(true); toast.info("You're offline."); };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return { items, loading, isOffline };
}
