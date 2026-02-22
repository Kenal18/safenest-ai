"use client";

import { GamifiedPlanData } from "@/app/page";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function XPHeader({ sipPlan }: { sipPlan: GamifiedPlanData | null }) {
    const level = sipPlan?.level || 1;
    const levelName = sipPlan?.level_name || "New Investor";
    const xp = sipPlan?.xp || 0;
    const nextLevelXp = sipPlan?.next_level_xp || 100;
    const isMaxLevel = level >= 5;
    const percentage = Math.min(100, Math.max(0, (xp / nextLevelXp) * 100));

    const [animatedWidth, setAnimatedWidth] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedWidth(isMaxLevel ? 100 : percentage);
        }, 100);
        return () => clearTimeout(timeout);
    }, [percentage, isMaxLevel]);

    const levelBarColor: Record<number, string> = {
        1: "from-cyan-400 to-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]",
        2: "from-cyan-400 to-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]",
        3: "from-cyan-400 to-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]",
        4: "from-cyan-400 to-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]",
        5: "from-cyan-400 to-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]",
    };

    const barGlow = levelBarColor[level] || levelBarColor[1];

    // Determine glow based on level
    const levelCardGlow: Record<number, string> = {
        1: "border-gray-500/30 bg-gray-900/50 shadow-[0_0_15px_rgba(156,163,175,0.1)]",
        2: "border-blue-500/30 bg-blue-900/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
        3: "border-purple-500/30 bg-purple-900/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]",
        4: "border-teal-500/30 bg-teal-900/50 shadow-[0_0_15px_rgba(20,184,166,0.1)]",
        5: "border-yellow-400/30 bg-yellow-900/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    };

    const glowClass = levelCardGlow[level] || levelCardGlow[1];

    return (
        <div className="w-full px-8 py-4 sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-slate-950/80">
            <div className={`max-w-[1200px] mx-auto glass-card rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 ${glowClass}`}>

                {/* Avatar and Level Info */}
                <div className="flex items-center gap-4 w-full md:w-1/2">
                    <div className="w-16 h-16 relative bg-slate-800 rounded-full border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] p-1 flex-shrink-0 animate-float">
                        <Image
                            src={`/avatars/avatar-level-${level}.svg`}
                            alt={`Level ${level} Avatar`}
                            layout="fill"
                            className="object-contain p-1"
                        />
                    </div>
                    <div>
                        <div className="text-xs font-extrabold tracking-wider uppercase text-slate-300 mb-1">
                            Level {level}
                        </div>
                        <h2 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">{levelName}</h2>
                    </div>
                </div>

                {/* XP Progress Bar */}
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-300">
                            {isMaxLevel ? "Max Level!" : "XP Progress"}
                        </span>
                        <span className="text-xs font-extrabold text-cyan-300 font-mono drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{Math.round(xp)} / {nextLevelXp} XP</span>
                    </div>
                    <div className="w-full bg-slate-800/80 rounded-full h-3 border border-white/5 overflow-hidden">
                        <div
                            className={`bg-gradient-to-r h-full rounded-full ease-out transition-[width] duration-800 ${barGlow}`}
                            style={{
                                width: `${animatedWidth}%`
                            }}
                        >
                            <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-pulse_2s_linear_infinite]" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
