'use client';

import { CartItem, MenuItem } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
    items: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('veshro-cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('veshro-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (item: MenuItem) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setItems((prev) => {
            return prev.map((i) => {
                if (i.id === itemId) {
                    const newQty = i.quantity + delta;
                    return newQty > 0 ? { ...i, quantity: newQty } : i;
                }
                return i;
            });
        });
    };

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
