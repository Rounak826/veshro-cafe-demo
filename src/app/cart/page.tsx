'use client';

import { useCart } from '@/context/CartContext';
import { formatWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp';
import { ChevronLeft, MapPin, Navigation, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MenuItemCard } from '@/components/features/MenuItemCard';
import { cn } from '@/lib/utils';
import { Order } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();

    const [orderType, setOrderType] = useState<'takeaway' | 'delivery'>('takeaway');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // Geolocation State
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [location, setLocation] = useState<{ lat: number; lng: number; mapLink: string } | null>(null);

    const handleGetLocation = () => {
        setIsLoadingLocation(true);
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
                setLocation({ lat, lng, mapLink });
                setAddress(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`); // Auto-fill address for visibility
                setIsLoadingLocation(false);
            },
            () => {
                alert("Unable to retrieve your location");
                setIsLoadingLocation(false);
            }
        );
    };

    const handleCheckout = () => {
        if (!name || !phone || (orderType === 'delivery' && !address && !location)) {
            alert('Please fill in all details');
            return;
        }

        const order: Order = {
            items,
            total: cartTotal,
            recipientName: name,
            recipientPhone: phone,
            deliveryAddress: address,
            geolocation: location || undefined,
            orderType,
            paymentMethod: 'cash',
        };

        const message = formatWhatsAppMessage(order);
        openWhatsApp("917587859408", message);
    };

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <ShoppingBag className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
                    <p className="mt-2 text-muted-foreground text-sm max-w-[250px]">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link href="/" className="mt-8 rounded-2xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-95 transition-transform">
                        Explore Menu
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-40">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-4 flex items-center gap-4">
                <Link href="/" className="rounded-full bg-secondary p-2.5 hover:bg-secondary/80 transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-xl font-bold tracking-tight">Your Cart</h1>
            </header>

            {/* Content */}
            <div className="p-4 space-y-6">

                {/* Items List */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {items.map((item) => (
                            <MenuItemCard key={item.id} item={item} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Delivery Options */}
                <div className="rounded-3xl bg-secondary/50 p-2 flex gap-2">
                    <button
                        onClick={() => setOrderType('takeaway')}
                        className={cn(
                            "flex-1 rounded-2xl py-3 text-sm font-bold transition-all duration-300",
                            orderType === 'takeaway'
                                ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                                : "text-muted-foreground hover:bg-background/50"
                        )}
                    >
                        Takeaway
                    </button>
                    <button
                        onClick={() => setOrderType('delivery')}
                        className={cn(
                            "flex-1 rounded-2xl py-3 text-sm font-bold transition-all duration-300",
                            orderType === 'delivery'
                                ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                                : "text-muted-foreground hover:bg-background/50"
                        )}
                    >
                        Delivery
                    </button>
                </div>

                {/* Details Form */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold px-1">Order Details</h3>

                    <div className="grid gap-4">
                        <div className="relative group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=" "
                                className="peer w-full rounded-2xl border-none bg-secondary px-5 py-4 text-base font-medium placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            <label className="absolute left-5 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs">
                                Your Name
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder=" "
                                className="peer w-full rounded-2xl border-none bg-secondary px-5 py-4 text-base font-medium placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            <label className="absolute left-5 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs">
                                Phone Number
                            </label>
                        </div>
                    </div>

                    <AnimatePresence>
                        {orderType === 'delivery' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden space-y-4 pt-2"
                            >
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleGetLocation}
                                        disabled={isLoadingLocation}
                                        className={cn(
                                            "flex items-center justify-center gap-2 w-full rounded-2xl py-4 font-bold transition-all active:scale-[0.98]",
                                            location
                                                ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                                                : "bg-primary/10 text-primary hover:bg-primary/20"
                                        )}
                                    >
                                        {isLoadingLocation ? (
                                            <span className="animate-pulse">Locating...</span>
                                        ) : location ? (
                                            <>
                                                <MapPin className="h-5 w-5" />
                                                Location Captured
                                            </>
                                        ) : (
                                            <>
                                                <Navigation className="h-5 w-5" />
                                                Detect My Location
                                            </>
                                        )}
                                    </button>

                                    <div className="relative group">
                                        <textarea
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder=" "
                                            className="peer w-full min-h-[100px] resize-none rounded-2xl border-none bg-secondary px-5 py-4 text-base font-medium placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                        <label className="absolute left-5 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs">
                                            Address / Landmark
                                        </label>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 pb-8 safe-area-bottom">
                <div className="mx-auto max-w-md space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-muted-foreground font-medium">Total Amount</span>
                        <span className="text-2xl font-bold text-foreground">₹{cartTotal}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full rounded-2xl bg-primary py-4 text-center text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 active:scale-[0.98] transition-all hover:brightness-110"
                    >
                        Place Order via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
