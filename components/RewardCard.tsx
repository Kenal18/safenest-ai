"use client";

import { ArrowUpCircle } from "lucide-react";

export default function RewardCard({ tip }: { tip: string }) {
    if (!tip) return null;

    return (
        <div className="h-full glass-card rounded-2xl p-6 border border-white/10 border-l-4 border-l-orange-500 bg-slate-800/40 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                +XP Potential
            </div>

            <div className="flex items-start gap-3 mt-2 relative z-10 w-full">
                <ArrowUpCircle className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
                <div className="w-full">
                    <h4 className="text-white font-semibold mb-2 text-sm md:text-base">Level Up Challenge</h4>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                        {tip}
                    </p>
                </div>
            </div>
        </div>
    );
}
