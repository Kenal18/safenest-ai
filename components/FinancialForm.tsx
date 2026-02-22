"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export type FormData = {
    income: number;
    savings: number;
    spending: {
        food: number;
        shopping: number;
        entertainment: number;
        transport: number;
    };
};

export default function FinancialForm({ onSubmit, loading }: { onSubmit: (data: FormData) => void, loading: boolean }) {
    const [formData, setFormData] = useState<FormData>({
        income: 50000,
        savings: 10000,
        spending: {
            food: 8000,
            shopping: 5000,
            entertainment: 3000,
            transport: 4000,
        }
    });
    const [error, setError] = useState("");

    // Auto-calculate savings when income or spending changes
    useEffect(() => {
        const totalSpending = formData.spending.food + formData.spending.shopping + formData.spending.entertainment + formData.spending.transport;
        const calculatedSavings = formData.income - totalSpending;

        setFormData(prev => ({
            ...prev,
            savings: calculatedSavings >= 0 ? calculatedSavings : 0
        }));
    }, [formData.income, formData.spending.food, formData.spending.shopping, formData.spending.entertainment, formData.spending.transport]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (["food", "shopping", "entertainment", "transport"].includes(name)) {
            setFormData(prev => ({
                ...prev,
                spending: { ...prev.spending, [name]: Number(value) }
            }));
        } else if (name !== "savings") { // Prevent manual edits to savings just in case
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
        }
        setError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.income <= 0) {
            setError("Income must be greater than zero.");
            return;
        }

        const totalSpending = formData.spending.food + formData.spending.shopping + formData.spending.entertainment + formData.spending.transport;
        if (totalSpending > formData.income) {
            setError("Total spending cannot exceed total income. Please adjust your expenses.");
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 w-full max-w-xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">Your Financial Profile</h3>

            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Monthly Income (₹)</label>
                        <input
                            type="number"
                            name="income"
                            value={formData.income}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                            required
                            min={0}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Monthly Savings (₹)</label>
                        <input
                            type="number"
                            name="savings"
                            value={formData.savings}
                            readOnly
                            tabIndex={-1}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-400 placeholder:text-slate-600 cursor-not-allowed focus:outline-none transition-all font-mono"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium text-slate-300 mb-4">Monthly Spending Breakdown</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Food & Dining (₹)</label>
                            <input
                                type="number"
                                name="food"
                                value={formData.spending.food}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                required
                                min={0}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Shopping (₹)</label>
                            <input
                                type="number"
                                name="shopping"
                                value={formData.spending.shopping}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                required
                                min={0}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Entertainment (₹)</label>
                            <input
                                type="number"
                                name="entertainment"
                                value={formData.spending.entertainment}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                required
                                min={0}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Transport (₹)</label>
                            <input
                                type="number"
                                name="transport"
                                value={formData.spending.transport}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                                required
                                min={0}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-white shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Profile...
                    </>
                ) : (
                    "Generate SIP Plan"
                )}
            </button>
        </form>
    );
}
