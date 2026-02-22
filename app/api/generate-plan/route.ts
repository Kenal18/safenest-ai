import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { funds, calculateFundRating, RatedFund } from "../../data/fundData";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { income, savings, spending } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    // --- Deterministic Logic Starts Here --- //
    const savings_ratio = income > 0 ? savings / income : 0;

    // Calculate ratings for all funds
    const ratedFunds: RatedFund[] = funds.map((f) => ({
      ...f,
      overall_rating: calculateFundRating(f),
    }));

    // Filter based on User Profile
    let prioritizedFunds = [...ratedFunds];
    if (savings_ratio < 0.15) {
      prioritizedFunds.sort((a, b) => (b.category === "Hybrid" ? 1 : 0) - (a.category === "Hybrid" ? 1 : 0));
    } else if (savings_ratio >= 0.15 && savings_ratio < 0.3) {
      prioritizedFunds.sort((a, b) => (b.category === "Large Cap" ? 1 : 0) - (a.category === "Large Cap" ? 1 : 0));
    } else {
      prioritizedFunds.sort((a, b) => ((b.category === "Index" || b.category === "Flexi Cap") ? 1 : 0) - ((a.category === "Index" || a.category === "Flexi Cap") ? 1 : 0));
    }

    // Top 5 funds sorted by overall rating and priority
    const top5Funds = prioritizedFunds
      .sort((a, b) => b.overall_rating - a.overall_rating)
      .slice(0, 5);



    // Calculate XP deterministically based on savings ratio
    let xp = 0;
    if (savings_ratio < 0.1) xp = 10;
    else if (savings_ratio < 0.2) xp = 25;
    else if (savings_ratio < 0.3) xp = 45;
    else if (savings_ratio < 0.4) xp = 65;
    else xp = 85;

    // Derive level deterministically
    let level = 1;
    let level_name = "New Investor";
    if (xp >= 80) { level = 5; level_name = "Wealth Architect"; }
    else if (xp >= 60) { level = 4; level_name = "Financial Strategist"; }
    else if (xp >= 40) { level = 3; level_name = "Wealth Builder"; }
    else if (xp >= 20) { level = 2; level_name = "Saver Protégé"; }

    // Deterministic Improvement Tip
    const improvement_tip = spending.shopping > income * 0.1
      ? "Consider reducing shopping expenses slightly to boost your SIP savings."
      : spending.food > income * 0.2
        ? "Eating out takes a good portion of your budget. Small savings here can yield big returns if invested."
        : "You're managing your expenses well! Stick to the recommended SIP to continuously build wealth.";

    const recommended_sip_amount = Math.floor(
      savings_ratio >= 0.5 ? savings * 0.9 :
        savings_ratio >= 0.3 ? savings * 0.8 :
          savings * 0.7
    );

    // Generate strict sip_options dynamically from local data ensuring 5 funds are returned
    const sip_options = top5Funds.map((fund, index) => ({
      fund_name: fund.name,
      category: fund.category,
      risk_level: fund.volatility_level,
      expense_ratio: fund.expense_ratio,
      expected_return_range: fund["3yr_return_range"],
      overall_rating: fund.overall_rating,
      why_this_fund: `Based on your ${Math.round(savings_ratio * 100)}% savings rate, this fund aligns well with your risk capacity.`,
      what_makes_it_different:
        fund.category === "Index"
          ? "Passive low-cost strategy tracking the broader market."
          : fund.category === "Large Cap"
            ? "Focuses on established companies with stable performance."
            : "Flexible strategy allowing dynamic allocation.",
      mark_recommended: index === 0,
      recommended_reason: index === 0 ? "Top-ranked fund offering conservative stability precisely matching your profile." : undefined
    }));

    const finalResponse = {
      xp,
      level,
      level_name,
      next_level_xp: 100,
      recommended_sip_amount,
      sip_options,
      improvement_tip
    };

    return NextResponse.json(finalResponse);

  } catch (error: any) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Failed to generate investment plan." },
      { status: 500 }
    );
  }
}
