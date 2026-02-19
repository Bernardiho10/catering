import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { MenuItem } from '@/features/menu/types';

interface MyDB extends DBSchema {
    menu: {
        key: string;
        value: MenuItem;
    };
    cart: {
        key: string;
        value: {
            id: string;
            items: any[]; // Replace with CartItem type
            updatedAt: number;
        };
    };
    sync_queue: {
        key: number;
        value: {
            id?: number;
            action: string;
            payload: any;
            createdAt: number;
        };
        indexes: { 'by-date': number };
    };
}

const DB_NAME = 'davids-delights-db';
const DB_VERSION = 1;

export async function initDB() {
    return openDB<MyDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('menu')) {
                db.createObjectStore('menu', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('cart')) {
                db.createObjectStore('cart', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('sync_queue')) {
                const store = db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
                store.createIndex('by-date', 'createdAt');
            }
        },
    });
}

// Menu Functions
export async function cacheMenuItems(items: MenuItem[]) {
    const db = await initDB();
    const tx = db.transaction('menu', 'readwrite');
    await Promise.all([
        ...items.map(item => tx.store.put(item)),
        tx.done
    ]);
}

export async function getCachedMenuItems(): Promise<MenuItem[]> {
    const db = await initDB();
    return db.getAll('menu');
}

// Cart Functions
export async function saveCartToDB(items: any[]) {
    const db = await initDB();
    await db.put('cart', {
        id: 'current_cart',
        items,
        updatedAt: Date.now()
    });
}

export async function getCartFromDB() {
    const db = await initDB();
    const cart = await db.get('cart', 'current_cart');
    return cart?.items || [];
}
