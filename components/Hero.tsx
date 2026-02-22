"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-sm text-blue-300 mb-8">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Smart, Safe & Secure Investing</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                    Grow Your Wealth with <br className="hidden md:block" />
                    <span className="text-gradient">SafeNest AI</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
                    AI-powered, conservative investment recommendations tailored for Indian GenZ.
                    Discover safe SIPs, blue-chip stocks, and government bonds to secure your future.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#financial-profile" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-white shadow-lg hover:shadow-cyan-500/25 transition-all w-full sm:w-auto flex items-center justify-center gap-2 group">
                        Get Your Free Plan
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#growth-simulator" className="px-8 py-4 rounded-full glass-card glass-card-hover font-medium w-full sm:w-auto transition-all flex items-center justify-center">
                        Try Growth Simulator
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
