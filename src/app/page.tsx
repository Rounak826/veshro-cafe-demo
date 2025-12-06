'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { CategorySelector } from '@/components/features/CategorySelector';
import { MenuItemCard } from '@/components/features/MenuItemCard';
import { CATEGORIES, MENU_ITEMS } from '@/lib/data';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;

    // Filter by Category (if not "Popular" or "All", logic depends on how we define IDs)
    // Assuming '1' is Popular, which shows popular items from all categories
    if (activeCategory === '1') {
      items = items.filter(item => item.isPopular);
    } else {
      items = items.filter(item => item.categoryId === activeCategory);
    }

    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <div className="px-4 py-3 bg-background">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-xl bg-secondary pl-9 pr-4 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>
      </div>

      {/* Category Selector */}
      <CategorySelector
        categories={CATEGORIES}
        activeCategoryId={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Menu List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            <p>No items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
