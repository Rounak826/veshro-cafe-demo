'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if splash has been shown in this session (optional, for dev I'll keep it always on or short)
        const hasShown = sessionStorage.getItem('splash-shown');
        // if (hasShown) {
        //   setIsVisible(false);
        //   return;
        // }

        const timer = setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('splash-shown', 'true');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-primary-foreground"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-4xl font-black tracking-tighter sm:text-6xl">
                            VESHRO
                        </div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-1 bg-white mt-2 rounded-full"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="mt-4 font-medium tracking-widest text-sm uppercase"
                        >
                            Cafe & Dining
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
