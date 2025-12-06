'use client';

import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Minus, Plus, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MenuItemCardProps {
    item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
    const { items, addToCart, updateQuantity, removeFromCart } = useCart();
    const cartItem = items.find((i) => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => addToCart(item);
    const handleIncrement = () => updateQuantity(item.id, 1);
    const handleDecrement = () => {
        if (quantity === 1) {
            removeFromCart(item.id);
        } else {
            updateQuantity(item.id, -1);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-card rounded-3xl p-4  border border-border/40 transition-all duration-300"
        >
            <div className="flex gap-4">
                {/* Left Content */}
                <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                        {/* Badges */}
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "flex items-center justify-center p-[2px] rounded-[4px] border-[1.5px]",
                                item.isVeg ? "border-green-600" : "border-red-600"
                            )}>
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    item.isVeg ? "bg-green-600" : "bg-red-600"
                                )} />
                            </div>
                            {item.isPopular && (
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100">
                                    <Flame className="w-3 h-3 text-orange-600 fill-orange-600" />
                                    <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase">
                                        Bestseller
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Title & Desc */}
                        <div>
                            <h3 className="font-bold text-lg leading-tight text-foreground/90 mb-1">
                                {item.name}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mt-2 font-bold text-lg text-foreground">
                        ₹{item.price}
                    </div>
                </div>

                {/* Right Image & Button */}
                <div className="relative shrink-0 w-32 pb-4">
                    <div className="relative h-28 w-32 rounded-2xl overflow-hidden bg-muted shadow-inner">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="128px"
                        />
                        <div className="absolute inset-0 bg-black/5" />
                    </div>

                    {/* Floating Button */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 filter">
                        <div className="bg-background rounded-xl overflow-hidden border-2 border-primary ring-1 ring-border/50">
                            {quantity === 0 ? (
                                <button
                                    onClick={handleAdd}
                                    className="w-full py-2 text-sm font-extrabold text-primary uppercase tracking-wide hover:bg-primary/5 active:bg-primary/10 transition-colors"
                                >
                                    Add
                                </button>
                            ) : (
                                <div className="flex items-center justify-between px-2 py-1.5 bg-background">
                                    <button
                                        onClick={handleDecrement}
                                        className="p-0.5 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-sm font-bold text-primary w-6 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={handleIncrement}
                                        className="p-0.5 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
