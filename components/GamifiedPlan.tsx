"use client";

import AvatarCard from "./AvatarCard";
import XPProgressBar from "./XPProgressBar";
import RewardCard from "./RewardCard";
import { Target, ShieldCheck, Flame, Medal, CheckCircle2 } from "lucide-react";

export type SipOption = {
    fund_name: string;
    category: string;
    risk_level: string;
    expense_ratio: number;
    expected_return_range: string;
    overall_rating: number;
    why_this_fund: string;
    what_makes_it_different: string;
    mark_recommended: boolean;
    recommended_reason?: string;
};

export type GamifiedPlanData = {
    xp: number;
    level: number;
    level_name: string;
    next_level_xp: number;
    recommended_sip_amount: number;
    sip_options: SipOption[];
    improvement_tip: string;
};

export default function GamifiedPlan({ data }: { data: GamifiedPlanData | null }) {
    if (!data) return null;

    // Determine glow based on level
    const levelCardGlow: Record<number, string> = {
        1: "border-gray-500/30 bg-gray-900/10 shadow-[0_0_20px_rgba(156,163,175,0.15)]",
        2: "border-blue-500/30 bg-blue-900/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        3: "border-purple-500/30 bg-purple-900/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]",
        4: "border-teal-500/30 bg-teal-900/10 shadow-[0_0_20px_rgba(20,184,166,0.15)]",
        5: "border-yellow-400/30 bg-yellow-900/10 shadow-[0_0_20px_rgba(234,179,8,0.15)]",
    };

    const glowClass = levelCardGlow[data.level] || levelCardGlow[1];

    const recommendedOptions = data.sip_options;

    // Prioritize the recommended fund at the top of the array visually
    const sortedOptions = [...recommendedOptions].sort(
        (a, b) => (b.mark_recommended ? 1 : 0) - (a.mark_recommended ? 1 : 0)
    );

    return (
        <div className="w-full max-w-lg mx-auto mt-16 flex flex-col gap-6 animate-fade-in-up">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold mb-2">Your Wealth Profile</h2>
                <p className="text-slate-400">Level up your finances with smart, consistent habits.</p>
            </div>

            <AvatarCard level={data.level} levelName={data.level_name} xp={data.xp} />

            <XPProgressBar xp={data.xp} nextLevelXp={data.next_level_xp} currentLevel={data.level} />

            <div className={`glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-200 ${glowClass}`}>
                <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2 mt-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Monthly SIP Target
                </h3>

                <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 mb-4">
                    <span className="text-slate-400 text-sm mb-1">Invest exactly</span>
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center">
                        ₹{data.recommended_sip_amount?.toLocaleString('en-IN') || 0}
                    </span>
                </div>
            </div>

            {/* Render Top 5 SIP Options vertically inside container */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white mt-4 flex items-center gap-2">
                    <Medal className="w-5 h-5 text-yellow-400" />
                    Top Selected Funds For You
                </h3>
                {sortedOptions.map((fund, index) => (
                    <div
                        key={index}
                        className={`relative rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] ${fund.mark_recommended
                            ? "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                            }`}
                    >
                        {fund.mark_recommended && (
                            <div className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold px-4 py-1.5 rounded-full text-white shadow-lg flex items-center gap-1 border border-orange-400/50">
                                <Flame className="w-3.5 h-3.5" />
                                ⭐ Most Recommended
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                            <div>
                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                    {fund.fund_name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                    <span className="text-xs bg-slate-800/80 text-blue-300 px-2.5 py-1 rounded-md border border-slate-700">
                                        {fund.category}
                                    </span>
                                    <span className="text-xs bg-slate-800/80 text-emerald-300 px-2.5 py-1 rounded-md border border-slate-700 font-medium">
                                        ER: {fund.expense_ratio}%
                                    </span>
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${fund.risk_level === 'Low' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50' : 'bg-orange-900/30 text-orange-400 border-orange-800/50'}`}>
                                        {fund.risk_level} Risk
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end shrink-0 sm:mt-0 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                        {(fund.overall_rating || 0).toFixed(1)}
                                    </span>
                                    <span className="text-sm font-medium text-slate-500 mt-1">/ 10</span>
                                </div>
                                <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                                        style={{ width: `${((fund.overall_rating || 0) / 10) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mt-4 text-sm bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="flex items-start gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-slate-400 block text-xs underline decoration-emerald-500/30 underline-offset-2 mb-0.5">Why This Fund?</span>
                                    <p className="text-slate-200">{fund.why_this_fund || "Based on your risk profile."}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Target className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-slate-400 block text-xs underline decoration-blue-500/30 underline-offset-2 mb-0.5">What Makes It Different?</span>
                                    <p className="text-slate-200">{fund.what_makes_it_different || "Consistent historical performance."}</p>
                                </div>
                            </div>

                            {fund.mark_recommended && fund.recommended_reason && (
                                <div className="flex items-start gap-2 mt-4 pt-3 border-t border-white/10">
                                    <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                                    <div>
                                        <span className="text-purple-300 font-medium block text-xs mb-0.5">AI Match Reason</span>
                                        <p className="text-purple-100/90">{fund.recommended_reason}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <RewardCard tip={data.improvement_tip} />
        </div>
    );
}
