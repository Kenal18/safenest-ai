"use client";

import { useEffect, useState } from "react";

export default function XPProgressBar({ xp, nextLevelXp, currentLevel }: { xp: number; nextLevelXp: number; currentLevel: number }) {
    const percentage = Math.min(100, Math.max(0, (xp / nextLevelXp) * 100));
    const isMaxLevel = currentLevel >= 5;
    const [animatedWidth, setAnimatedWidth] = useState(0);

    useEffect(() => {
        // Delay animation slightly for better visual entrance, run only once
        const timeout = setTimeout(() => {
            setAnimatedWidth(isMaxLevel ? 100 : percentage);
        }, 100);
        return () => clearTimeout(timeout);
    }, [percentage, isMaxLevel]);

    const levelBarColor: Record<number, string> = {
        1: "from-gray-400 to-gray-600 shadow-[0_0_10px_rgba(156,163,175,0.5)]",
        2: "from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
        3: "from-purple-400 to-purple-600 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
        4: "from-teal-400 to-teal-600 shadow-[0_0_10px_rgba(20,184,166,0.5)]",
        5: "from-yellow-400 to-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.5)]",
    };

    const barGlow = levelBarColor[currentLevel] || levelBarColor[1];

    return (
        <div className="glass-card rounded-2xl p-6 w-full relative transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-300">
                    {isMaxLevel ? "Max Level Reached!" : "Progress to Next Level"}
                </span>
                <span className="text-sm font-bold text-white font-mono">{Math.round(xp)} / {nextLevelXp} XP</span>
            </div>

            <div className="w-full bg-slate-800/80 rounded-full h-6 border border-white/5 overflow-hidden">
                <div
                    className={`bg-gradient-to-r h-6 rounded-full ease-out transition-[width] duration-800 ${barGlow}`}
                    style={{
                        width: `${animatedWidth}%`
                    }}
                >
                    <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-pulse_2s_linear_infinite]" />
                </div>
            </div>

            {!isMaxLevel && (
                <div className="text-xs text-slate-400 mt-3 text-right">
                    Only <span className="font-semibold text-purple-300 font-mono">{nextLevelXp - Math.round(xp)} XP</span> needed to level up
                </div>
            )}
        </div>
    );
}
