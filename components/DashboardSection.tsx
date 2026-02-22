"use client";

import RewardCard from "./RewardCard";
import Simulator from "./Simulator";
import ChatAdvisor from "./ChatAdvisor";
import { Target, ShieldCheck, RefreshCcw } from "lucide-react";
import { GamifiedPlanData } from "@/app/page";

export default function DashboardSection({
    sipPlan,
    onReset
}: {
    sipPlan: GamifiedPlanData;
    onReset: () => void;
}) {
    // Determine glow based on level
    const levelCardGlow: Record<number, string> = {
        1: "border-emerald-500/30 bg-emerald-900/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        2: "border-emerald-500/30 bg-emerald-900/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        3: "border-emerald-500/30 bg-emerald-900/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        4: "border-emerald-500/30 bg-emerald-900/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        5: "border-emerald-500/30 bg-emerald-900/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    };

    const glowClass = levelCardGlow[sipPlan.level] || levelCardGlow[1];

    return (
        <div className="w-full pt-12 pb-8 animate-fade-in-up" style={{ animationDuration: '400ms' }}>
            {/* Action Row with Reset Button - Consistent 32px spacing (mb-8) */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                <div className="text-left w-full sm:w-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
                        Investment Strategy
                    </h2>
                    <p className="text-slate-300 mt-2 text-lg">Consistency is key to wealth building.</p>
                </div>
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white transition-all shadow-sm shrink-0 font-medium"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Start Over
                </button>
            </div>

            {/* Consistent Spacing Tool: 32px (gap-8) between internal blocks */}
            <div className="flex flex-col gap-8 mb-8">
                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Reward Card */}
                    <div className="h-full">
                        <RewardCard tip={sipPlan.improvement_tip} />
                    </div>

                    {/* Right Column - Recommended SIP */}
                    <div className="h-full">
                        <div className={`h-full glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${glowClass}`}>
                            <div className="absolute top-0 right-0 bg-emerald-500 text-xs font-bold px-4 py-1.5 rounded-bl-xl text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                Recommended Action
                            </div>

                            <h3 className="text-xl font-extrabold text-slate-100 mb-6 mt-2 tracking-tight">
                                Your Monthly SIP Target
                            </h3>

                            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-900/50 rounded-xl border border-white/5 mb-6 gap-6">
                                <div className="text-center sm:text-left flex flex-col gap-1 w-full">
                                    <span className="text-slate-300 text-sm block">Invest exactly</span>
                                    <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
                                        ₹{sipPlan.recommended_sip_amount.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Render Top 5 SIP Options vertically inside container */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white mt-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-yellow-400" />
                        Top Selected Funds For You
                    </h3>
                    {sipPlan.sip_options.map((fund, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] ${fund.mark_recommended
                                ? "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}
                        >
                            {fund.mark_recommended && (
                                <div className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold px-4 py-1.5 rounded-full text-white shadow-lg flex items-center gap-1 border border-orange-400/50">
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
                                        <ShieldCheck className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
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

                {/* Integrated Simulator / Spending Chart (Full Width) spacing preserved by gap-8 parent */}
                <div className="glass-card w-full rounded-2xl border border-white/10 overflow-hidden mt-2">
                    <Simulator />
                </div>
            </div>

            {/* AI Advisor Chat at the bottom with 80px spacing from major sections if needed, but 32px inner block is fine */}
            <div className="mt-12">
                <ChatAdvisor />
            </div>
        </div>
    );
}
