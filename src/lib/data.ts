import { Category, MenuItem } from "@/types";

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Popular', slug: 'popular' },
    { id: '2', name: 'Coffee', slug: 'coffee' },
    { id: '3', name: 'Snacks', slug: 'snacks' },
    { id: '4', name: 'Desserts', slug: 'desserts' },
    { id: '5', name: 'Drinks', slug: 'drinks' },
];

export const MENU_ITEMS: MenuItem[] = [
    {
        id: '1',
        categoryId: '2',
        name: 'Cappuccino',
        description: 'Rich espresso with steamed milk foam.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop', // Placeholder
        isPopular: true,
        isVeg: true,
    },
    {
        id: '2',
        categoryId: '2',
        name: 'Iced Latte',
        description: 'Espresso with cold milk and ice.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1974&auto=format&fit=crop',
        isPopular: true,
        isVeg: true,
    },
    {
        id: '3',
        categoryId: '3',
        name: 'Grilled Cheese Sandwich',
        description: 'Classic grilled cheese with herbs.',
        price: 220,
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop',
        isVeg: true,
    },
    {
        id: '4',
        categoryId: '3',
        name: 'Chicken Burger',
        description: 'Juicy chicken patty with fresh lettuce and mayo.',
        price: 290,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
        isPopular: true,
        isVeg: false,
    },
    {
        id: '5',
        categoryId: '4',
        name: 'Chocolate Brownie',
        description: 'Fudgy brownie with walnuts.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop',
        isVeg: true,
    },
];
