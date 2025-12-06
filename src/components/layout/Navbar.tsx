'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export function Navbar() {
    const { itemCount } = useCart();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 max-w-md items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold tracking-tight text-primary truncate"
                    >
                        Veshro Cafe
                    </motion.span>
                </Link>
                <Link href="/cart">
                    <div className="relative rounded-full p-2 text-foreground transition-colors hover:bg-accent active:scale-95 cursor-pointer">
                        <ShoppingBag className="h-6 w-6" />
                        <AnimatePresence>
                            {itemCount > 0 && (
                                <motion.span
                                    key="cart-badge"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-background"
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
