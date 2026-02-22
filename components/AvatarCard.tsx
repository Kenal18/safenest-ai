"use client";

import Image from "next/image";

export default function AvatarCard({ level, levelName, xp }: { level: number; levelName: string; xp: number }) {
    // Determine glow and styles based on level
    const levelStyles: Record<number, string> = {
        1: "from-gray-500/20 to-gray-700/20 shadow-[0_0_30px_rgba(156,163,175,0.2)]",
        2: "from-blue-500/20 to-blue-700/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        3: "from-purple-500/20 to-purple-700/20 shadow-[0_0_30px_rgba(168,85,247,0.3)]",
        4: "from-teal-500/20 to-teal-700/20 shadow-[0_0_30px_rgba(20,184,166,0.3)]",
        5: "from-yellow-400/20 to-yellow-600/20 shadow-[0_0_40px_rgba(234,179,8,0.4)]",
    };

    const gradient = levelStyles[level] || levelStyles[1];

    return (
        <div className={`glass-card rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b ${gradient} animate-scale-in transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl`}>
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 relative mb-6 drop-shadow-2xl mix-blend-screen bg-slate-800/50 rounded-full p-2 border border-white/10 animate-float">
                    <Image
                        src={`/avatars/avatar-level-${level}.svg`}
                        alt={`Level ${level} Avatar`}
                        layout="fill"
                        className="object-contain p-2"
                    />
                </div>

                <div className="text-center">
                    <span className="text-xs font-bold tracking-wider uppercase text-slate-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                        Level {level}
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-3 mb-1">{levelName}</h2>
                    <p className="text-xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold drop-shadow-sm">
                        {Math.round(xp)} XP
                    </p>
                </div>
            </div>
        </div>
    );
}
