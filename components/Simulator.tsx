"use client";

import { useState, useMemo, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator } from "lucide-react";

export default function Simulator() {
    const [sip, setSip] = useState<number>(5000);
    const [rate, setRate] = useState<number>(12);
    const [years, setYears] = useState<number>(5);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const chartData = useMemo(() => {
        const data = [];
        const monthlyRate = rate / 100 / 12;

        for (let yr = 1; yr <= years; yr++) {
            const n = yr * 12;
            // Formula: FV = P × [((1 + r)^n − 1) / r]
            // (Using exact PRD formula)
            const fv = sip * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
            const totalInvested = sip * n;

            data.push({
                year: `Year ${yr}`,
                value: Math.round(fv),
                invested: totalInvested,
            });
        }
        return data;
    }, [sip, rate, years]);

    const finalAmount = chartData[chartData.length - 1]?.value || 0;
    const totalInvested = chartData[chartData.length - 1]?.invested || 0;
    const wealthGained = finalAmount - totalInvested;

    return (
        <div className="w-full max-w-5xl mx-auto mt-20" id="simulator">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                    <Calculator className="w-8 h-8 text-blue-400" />
                    Wealth Growth Simulator
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    See the power of compounding. Enter your monthly SIP to visualize
                    how your safe investments can grow over time.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Controls */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-1 space-y-6">
                    <div>
                        <label className="flex justify-between text-sm text-slate-300 mb-2">
                            <span>Monthly SIP (₹)</span>
                            <span className="font-bold text-white">₹{sip.toLocaleString("en-IN")}</span>
                        </label>
                        <input
                            type="range"
                            min="500"
                            max="100000"
                            step="500"
                            value={sip}
                            onChange={(e) => setSip(Number(e.target.value))}
                            className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm text-slate-300 mb-2">
                            <span>Expected Annual Return (%)</span>
                            <span className="font-bold text-white">{rate}%</span>
                        </label>
                        <input
                            type="range"
                            min="5"
                            max="15"
                            step="0.5"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full accent-purple-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm text-slate-300 mb-2">
                            <span>Duration (Years)</span>
                            <span className="font-bold text-white">{years} Years</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="pt-6 border-t border-white/10">
                        <div className="mb-2">
                            <span className="text-sm text-slate-400 block">Total Invested</span>
                            <span className="text-xl font-semibold">₹{totalInvested.toLocaleString("en-IN")}</span>
                        </div>
                        <div>
                            <span className="text-sm text-slate-400 block">Estimated Returns</span>
                            <span className="text-2xl font-bold text-emerald-400">+₹{wealthGained.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-purple-500/20">
                            <span className="text-sm text-purple-300 block mb-1">Total Future Value</span>
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                ₹{finalAmount.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-2 h-[450px]">
                    {mounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0f172a",
                                        border: "1px solid #1e293b",
                                        borderRadius: "12px",
                                        color: "#fff"
                                    }}
                                    itemStyle={{ color: "#fff" }}
                                    formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Value"] as any}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#8b5cf6"
                                    strokeWidth={4}
                                    dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
                                    activeDot={{ r: 8 }}
                                    name="Future Value"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="invested"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                    name="Total Invested"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                            Loading Chart...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
