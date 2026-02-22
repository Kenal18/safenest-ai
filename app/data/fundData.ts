export type FundCategory = "Index" | "Large Cap" | "Flexi Cap" | "Hybrid";
export type RiskLevel = "Low" | "Moderate";
export type VolatilityLevel = "Low" | "Medium";
export type AumCategory = "High" | "Medium";

export interface FundData {
    name: string;
    category: FundCategory;
    risk_level: RiskLevel;
    expense_ratio: number;
    "3yr_return_range": string;
    volatility_level: VolatilityLevel;
    aum_category: AumCategory;
}

export const funds: FundData[] = [
    // Index Funds
    {
        name: "UTI Nifty 50 Index Fund",
        category: "Index",
        risk_level: "Low",
        expense_ratio: 0.21,
        "3yr_return_range": "12-14%",
        volatility_level: "Low",
        aum_category: "High"
    },
    {
        name: "SBI Nifty Index Fund",
        category: "Index",
        risk_level: "Low",
        expense_ratio: 0.18,
        "3yr_return_range": "12-14.5%",
        volatility_level: "Low",
        aum_category: "High"
    },
    {
        name: "HDFC Index Sensex Fund",
        category: "Index",
        risk_level: "Low",
        expense_ratio: 0.20,
        "3yr_return_range": "11.5-13.8%",
        volatility_level: "Low",
        aum_category: "High"
    },
    {
        name: "ICICI Prudential Nifty 50 Index Fund",
        category: "Index",
        risk_level: "Low",
        expense_ratio: 0.17,
        "3yr_return_range": "12-14.2%",
        volatility_level: "Low",
        aum_category: "High"
    },
    {
        name: "Navi Nifty 50 Index Fund",
        category: "Index",
        risk_level: "Low",
        expense_ratio: 0.06,
        "3yr_return_range": "12-14.5%",
        volatility_level: "Low",
        aum_category: "Medium"
    },
    // Large Cap Funds
    {
        name: "ICICI Prudential Bluechip Fund",
        category: "Large Cap",
        risk_level: "Moderate",
        expense_ratio: 0.89,
        "3yr_return_range": "14-16%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    {
        name: "SBI Bluechip Fund",
        category: "Large Cap",
        risk_level: "Moderate",
        expense_ratio: 0.85,
        "3yr_return_range": "13.5-15.5%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    {
        name: "Mirae Asset Large Cap Fund",
        category: "Large Cap",
        risk_level: "Moderate",
        expense_ratio: 0.53,
        "3yr_return_range": "14-16.5%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    {
        name: "Nippon India Large Cap Fund",
        category: "Large Cap",
        risk_level: "Moderate",
        expense_ratio: 0.77,
        "3yr_return_range": "15-17.5%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    {
        name: "Kotak Bluechip Fund",
        category: "Large Cap",
        risk_level: "Moderate",
        expense_ratio: 0.58,
        "3yr_return_range": "14-16%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    // Flexi Cap Funds
    {
        name: "Parag Parikh Flexi Cap Fund",
        category: "Flexi Cap",
        risk_level: "Moderate",
        expense_ratio: 0.58,
        "3yr_return_range": "17-20%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    {
        name: "HDFC Flexi Cap Fund",
        category: "Flexi Cap",
        risk_level: "Moderate",
        expense_ratio: 0.81,
        "3yr_return_range": "16-19%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    {
        name: "Kotak Flexi Cap Fund",
        category: "Flexi Cap",
        risk_level: "Moderate",
        expense_ratio: 0.55,
        "3yr_return_range": "14-16.5%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    {
        name: "SBI Flexi Cap Fund",
        category: "Flexi Cap",
        risk_level: "Moderate",
        expense_ratio: 0.76,
        "3yr_return_range": "13-15%",
        volatility_level: "Medium",
        aum_category: "High"
    },
    // Hybrid Funds
    {
        name: "ICICI Prudential Balanced Advantage Fund",
        category: "Hybrid",
        risk_level: "Low",
        expense_ratio: 0.88,
        "3yr_return_range": "12-14%",
        volatility_level: "Low",
        aum_category: "High"
    },
    {
        name: "SBI Equity Hybrid Fund",
        category: "Hybrid",
        risk_level: "Moderate",
        expense_ratio: 0.71,
        "3yr_return_range": "11-13.5%",
        volatility_level: "Low",
        aum_category: "High"
    },
    {
        name: "HDFC Balanced Advantage Fund",
        category: "Hybrid",
        risk_level: "Moderate",
        expense_ratio: 0.75,
        "3yr_return_range": "14-17%",
        volatility_level: "Low",
        aum_category: "High"
    },
    {
        name: "Kotak Equity Hybrid Fund",
        category: "Hybrid",
        risk_level: "Moderate",
        expense_ratio: 0.44,
        "3yr_return_range": "13-15.5%",
        volatility_level: "Low",
        aum_category: "High"
    },
    {
        name: "DSP Equity & Bond Fund",
        category: "Hybrid",
        risk_level: "Moderate",
        expense_ratio: 0.65,
        "3yr_return_range": "12-14%",
        volatility_level: "Low",
        aum_category: "Medium"
    }
];

export interface RatedFund extends FundData {
    overall_rating: number;
}

export function calculateFundRating(fund: FundData): number {
    let score = 0;

    if (fund.expense_ratio <= 0.5) score += 3;
    if (fund.volatility_level === "Low") score += 2;
    if (fund.category === "Index") score += 2;

    // Extract min bound of 3yr return (e.g. "12-14%" -> 12)
    const returnStr = fund["3yr_return_range"];
    const minReturnMatch = returnStr.match(/(\d+(\.\d+)?)/);
    if (minReturnMatch) {
        const minReturn = parseFloat(minReturnMatch[1]);
        if (minReturn >= 10) score += 2;
    }

    if (fund.aum_category === "High") score += 1;

    // Cap rating at 10 and ensure minimum 1
    score = Math.min(score, 10);
    score = Math.max(score, 1);

    // Round to 1 decimal note: math round trick since toFixed returns string
    return Math.round(score * 10) / 10;
}
