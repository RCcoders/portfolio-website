'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
    children: ReactNode;
    className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "relative group rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-xl",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200" />
            <div className="relative z-10 p-6 h-full">
                {children}
            </div>
        </motion.div>
    );
}
