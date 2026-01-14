
import { MenuItem } from "@/features/menu/types";

export const MOCK_MENU_ITEMS: MenuItem[] = [
    {
        id: '1',
        name: 'Classic Burger',
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and our secret sauce.',
        price: 1299,
        category: 'Mains',
        image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60',
        images: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
        ],
        active: true,
        dietary_tags: []
    },
    {
        id: '2',
        name: 'Vegan Buddha Bowl',
        description: 'Quinoa, roasted chickpeas, avocado, kale, and tahini dressing.',
        price: 1450,
        category: 'Mains',
        image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60',
        images: [
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        ],
        active: true,
        dietary_tags: ['vegan', 'gluten-free']
    },
    {
        id: '3',
        name: 'Spicy Tuna Roll',
        description: 'Fresh tuna with spicy mayo and cucumber.',
        price: 899,
        category: 'Appetizers',
        image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60',
        images: [
            'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        ],
        active: true,
        dietary_tags: ['gluten-free']
    },
    {
        id: '4',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
        price: 950,
        category: 'Desserts',
        image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=500&q=60',
        images: [
            'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
        ],
        active: true,
        dietary_tags: ['vegetarian']
    },
    {
        id: '5',
        name: 'Caesar Salad',
        description: 'Romaine lettuce, parmesan cheese, croutons, and caesar dressing.',
        price: 1099,
        category: 'Appetizers',
        image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=60',
        images: [
            'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
        ],
        active: true,
        dietary_tags: []
    }
]
