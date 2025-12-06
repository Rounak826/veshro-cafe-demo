'use client';

import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CategorySelectorProps {
    categories: Category[];
    activeCategoryId: string;
    onSelectCategory: (id: string) => void;
}

export function CategorySelector({
    categories,
    activeCategoryId,
    onSelectCategory,
}: CategorySelectorProps) {
    return (
        <div className="sticky top-16 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 border-b border-border/50">
            <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-1 scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={cn(
                            "relative whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
                            activeCategoryId === category.id
                                ? "text-white"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                    >
                        {activeCategoryId === category.id && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute inset-0 rounded-full bg-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
