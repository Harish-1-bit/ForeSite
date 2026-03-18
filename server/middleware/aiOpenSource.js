function parseModelJson(content, res) {
  // Strip <think>...</think> blocks if present
  let cleanContent = content;
  if (typeof content === "string") {
    cleanContent = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  }

  // 1) direct JSON
  try {
    return JSON.parse(cleanContent);
  } catch (error) {}

  // 2) Strip markdown code block
  try {
    const jsonMatch = cleanContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
  } catch (error) {}

  // 3) Try to find anything resembling a JSON object/array
  try {
    const matchStart = cleanContent.indexOf("{");
    const matchEnd = cleanContent.lastIndexOf("}");
    if (matchStart !== -1 && matchEnd !== -1 && matchEnd > matchStart) {
      return JSON.parse(cleanContent.substring(matchStart, matchEnd + 1));
    }
  } catch (error) {}
}

export const aiResponse = async (text) => {
  try {
    const prompt = `You are a buyer-focused real estate assistant for a property app.
Your output will be rendered directly in a frontend.

Hard rules:
- Return ONLY valid JSON (no markdown, no extra text).
- Use stable keys exactly as specified.
- Never invent facts (neighborhood stats, schools, distances, crime, amenities nearby, ROI). If not provided, use null or "Not provided".
- Be concise, scannable, and helpful for a customer deciding whether to book a viewing.

Return JSON in this exact shape:
{
  "description": string,
  "highlights": string[],
  "bestFor": string[],
  "priceHistorySummary": string,
}

Writing guidelines:
- "description": 120-200 words, professional, no hype. Mention layout, location cues (only if provided), condition/age cues (only if provided), and who it fits.
- "highlights": 3-7 bullets, each under 14 words.
- "priceHistorySummary": 1-2 sentences summarizing the provided price-change data; if none, say "Not provided".

Inputs (may be objects/arrays; extract what you can without guessing):
- Text/context: ${text?.text ?? text}
- Property object: ${text?.property ?? "Not provided"}
- Price change array: ${text?.priceChange ?? "Not Available"}`;

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "liquid/lfm-2.5-1.2b-thinking:free",
        messages: [{ role: "user", content: text ? prompt : "" }],
      }),
    });

    const data = await aiRes.json();

    if (!aiRes.ok) {
      const errMsg =
        data?.error?.message ||
        data?.message ||
        `OpenRouter error (${aiRes.status})`;
      throw new Error(errMsg);
    }

    const content = data?.choices?.[0]?.message?.content;
    const parsed = parseModelJson(content);

    // Return parsed JSON object when possible, otherwise return raw string for debugging.
    return parsed ?? { raw: content };
  } catch (error) {
    console.log(error);
    return { error: true, message: error?.message ?? "Unknown error" };
  }
};

export const roiCalculation = async (context, res) => {
  try {
    // 1. Math calculation natively in JS for speed and accuracy
    const propertyPrice = Number(context?.propertyPrice) || 0;
    const maintainCost = Number(context?.maintainCost) || 0;
    const holdingYears = Number(context?.holdingYears) || 0;
    const rentalIncome = Number(context?.rentalIncome) || 0;
    const appreciationRate = Number(context?.appreciationRate) || 0;
    const propertyTax = Number(context?.propertyTax) || 0;
    const purchaseFees = Number(context?.purchaseFees) || 0;

    let estimatedCurrentValue = Number(context?.currentValue) || null;
    if (!estimatedCurrentValue && appreciationRate > 0 && propertyPrice > 0 && holdingYears > 0) {
      estimatedCurrentValue = propertyPrice * Math.pow(1 + (appreciationRate / 100), holdingYears);
    }

    const totalMaintenanceCost = maintainCost * holdingYears;
    const totalRentalIncome = rentalIncome * holdingYears;
    const totalPropertyTax = propertyTax * holdingYears;
    
    let netProfit = null;
    let totalROI = null;
    let annualizedROI = null;
    let cashOnCashReturn = null;
    let totalReturnMultiple = null;

    if (estimatedCurrentValue && propertyPrice > 0) {
      netProfit = (estimatedCurrentValue - propertyPrice) - totalMaintenanceCost + totalRentalIncome - totalPropertyTax - purchaseFees;
      totalROI = (netProfit / propertyPrice) * 100;
      annualizedROI = (Math.pow(1 + (totalROI / 100), 1 / holdingYears) - 1) * 100;
      totalReturnMultiple = estimatedCurrentValue / propertyPrice;
    }

    if (propertyPrice > 0 && rentalIncome > 0) {
       cashOnCashReturn = (rentalIncome / propertyPrice) * 100;
    }

    const summaryData = {
      propertyPrice: propertyPrice || null,
      estimatedCurrentValue: estimatedCurrentValue ? Number(estimatedCurrentValue.toFixed(2)) : null,
      totalMaintenanceCost: totalMaintenanceCost || null,
      totalRentalIncome: totalRentalIncome || null,
      totalPropertyTax: totalPropertyTax || null,
      purchaseFees: purchaseFees || null,
      netProfit: netProfit !== null ? Number(netProfit.toFixed(2)) : null,
      holdingYears: holdingYears || null,
    };

    const returnsData = {
      totalROI: totalROI !== null ? Number(totalROI.toFixed(2)) : null,
      annualizedROI: annualizedROI !== null ? Number(annualizedROI.toFixed(2)) : null,
      cashOnCashReturn: cashOnCashReturn !== null ? Number(cashOnCashReturn.toFixed(2)) : null,
      totalReturnMultiple: totalReturnMultiple !== null ? Number(totalReturnMultiple.toFixed(2)) : null,
    };

    // 2. Simplified prompt to generate textual assessment ONLY based on exact numbers
    const prompt = `You are a real estate investment analyst. Your job is to evaluate a property investment and return a structured JSON analysis.
    
HARD RULES:
- Return ONLY valid JSON. No markdown, no code blocks, no text before or after.
- Use stable keys EXACTLY as specified below.
- Do NOT recalculate numbers. You are only generating the textual risk and recommendation blocks based on the provided numbers.

INPUTS:
- Location: ${context?.location ?? "Not provided"}
- Property Price: ${propertyPrice}
- Holding Years: ${holdingYears}
- Net Profit: ${netProfit !== null ? netProfit.toFixed(2) : 'Insufficient Data'}
- Total ROI: ${totalROI !== null ? totalROI.toFixed(2) + '%' : 'Insufficient Data'}
- Annualized ROI: ${annualizedROI !== null ? annualizedROI.toFixed(2) + '%' : 'Insufficient Data'}

Return JSON in EXACTLY this shape:
{
  "riskAssessment": {
    "level": "Low" | "Medium" | "High" | "Unknown",
    "factors": ["Factor 1", "Factor 2"]
  },
  "recommendation": {
    "verdict": "Strong Buy" | "Buy" | "Hold" | "Avoid" | "Insufficient Data",
    "summary": "1 sentence explanation",
    "pros": ["Pro 1", "Pro 2"],
    "cons": ["Con 1", "Con 2"],
    "details": "2-3 sentences with reasoning"
  },
  "missingDataWarnings": ["Identify any crucial missing inputs"]
}`;

    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "liquid/lfm-2.5-1.2b-thinking:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await aiRes.json();
    if (!aiRes.ok) {
      const errMsg = data?.error?.message || data?.message || `OpenRouter error (${aiRes.status})`;
      throw new Error(errMsg);
    }
    const content = data?.choices?.[0]?.message?.content;
    const parsed = parseModelJson(content);

    // If parsing fails completely, provide an empty fallback text object to pair with math
    const fallbackText = {
      riskAssessment: { level: "Unknown", factors: [] },
      recommendation: { verdict: "Unknown", summary: "Failed to generate recommendation.", pros: [], cons: [], details: "" },
      missingDataWarnings: []
    };

    const finalAiData = parsed || fallbackText;

    // Combine locally calculated math with AI text
    return {
      summary: summaryData,
      returns: returnsData,
      ...finalAiData
    };
  } catch (error) {
    console.log(error);
    return { error: true, message: error?.message ?? "Unknown error" };
  }
};
