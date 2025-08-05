'use client';

import { motion } from 'framer-motion';

export function MobileMenu({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            // transition={{ type: 'tween', duration: 0.3 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute left-0 top-0 h-full w-3/4 bg-primary p-6 space-y-4"
        >
            {children}
        </motion.div>
    );
}