"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import FinancialForm, { FormData } from "@/components/FinancialForm";
import DashboardSection from "@/components/DashboardSection";
import XPHeader from "@/components/XPHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export type GamifiedPlanData = {
  xp: number;
  level: number;
  level_name: string;
  next_level_xp: number;
  recommended_sip_amount: number;
  sip_options: {
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
  }[];
  improvement_tip: string;
};

export default function Home() {
  const [sipPlan, setSipPlan] = useState<GamifiedPlanData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGeneratePlan = async (data: FormData) => {
    setLoading(true);
    setError("");
    setSipPlan(null);

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.error) throw new Error(result.error);

      if (result.xp !== undefined && result.recommended_sip_amount !== undefined && result.sip_options && result.sip_options.length === 5) {
        setSipPlan(result as GamifiedPlanData);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("Invalid response format from Backend.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong generating your plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSipPlan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans flex flex-col relative w-full">
      <XPHeader sipPlan={sipPlan} />

      {/* Global Container System: max-w 1200px, mx-auto, px-8 */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-8 pb-20">
        {!sipPlan ? (
          <div className="animate-fade-in-up" style={{ animationDuration: '400ms' }}>

            {/* Consistent Spacing: 80px (gap-20/py-20) between major sections */}
            <div className="flex flex-col gap-20 py-20 w-full">

              {/* Internal spacing: 32px (gap-8) */}
              <div className="flex flex-col gap-8">
                <Hero />
                <TrustBadges />
              </div>

              {/* Typography Upgrade: font-extrabold, gradient accent, high contrast slate-300 subtext */}
              <div className="text-center w-full mx-auto relative z-10 flex flex-col gap-4">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
                  Built for Safe, Structured Wealth Building
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  SafeNest focuses on conservative, diversified strategies tailored for Indian students and first-time earners.
                </p>
              </div>

              <section id="financial-profile" className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col gap-8 w-full"
                >
                  <div className="text-center w-full flex flex-col gap-3">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      Build Your Wealth Profile
                    </h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                      Tell us about your cashflow to get your personalized XP-driven investment plan.
                    </p>
                  </div>

                  <FinancialForm onSubmit={handleGeneratePlan} loading={loading} />

                  {error && (
                    <div className="w-full max-w-xl mx-auto p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
                      {error}
                    </div>
                  )}
                </motion.div>
              </section>

            </div>
          </div>
        ) : (
          <div className="w-full">
            <DashboardSection sipPlan={sipPlan} onReset={handleReset} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}