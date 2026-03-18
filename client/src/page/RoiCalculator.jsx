import { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  BarChart3,
  Activity,
  Loader2,
  ArrowRight,
} from "lucide-react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateRoi,
  resetAiResponse,
} from "../features/customer/CustomerSlice";

export function ROICalculator() {
  const dispatch = useDispatch();
  const { roi, customerLoading, customerError, customerMessage } = useSelector(
    (state) => state.customer,
  );

  const resultsRef = useRef(null);

  useEffect(() => {
    if (customerLoading || roi) {
      // Small delay to ensure the DOM has updated and element is visible
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [customerLoading, roi]);

  // Initialize all fields from the new backend schema
  const [formData, setFormData] = useState({
    propertyPrice: "",
    location: "",
    maintainCost: "",
    holdingYears: "",
    rentalIncome: "",
    appreciationRate: "",
    propertyTax: "",
    purchaseFees: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "location" ? value : value === "" ? "" : Number(value),
    }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch(calculateRoi(formData));
  };

  useEffect(() => {
    return () => {
      // Optional: clean up when unmounting
      // dispatch(resetAiResponse());
    };
  }, [dispatch]);

  const getRiskStyles = (level) => {
    switch (level?.toLowerCase()) {
      case "low":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 ring-emerald-500/30";
      case "medium":
        return "bg-amber-50 text-amber-800 border-amber-200 ring-amber-500/30";
      case "high":
        return "bg-red-50 text-red-800 border-red-200 ring-red-500/30";
      default:
        return "bg-slate-50 text-slate-800 border-slate-200 ring-slate-500/30";
    }
  };

  const getVerdictStyles = (verdict) => {
    const v = verdict?.toLowerCase() || "";
    if (v.includes("buy"))
      return "bg-emerald-600 text-white shadow-emerald-500/20";
    if (v.includes("hold"))
      return "bg-amber-500 text-white shadow-amber-500/20";
    if (v.includes("avoid") || v.includes("bad"))
      return "bg-red-600 text-white shadow-red-500/20";
    return "bg-slate-600 text-white shadow-slate-500/20";
  };

  const formatNumber = (num) => {
    if (
      num === null ||
      num === undefined ||
      Number.isNaN(Number(num)) ||
      String(num).trim() === "" ||
      num === "NaN"
    )
      return "N/A";
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(
      Number(num),
    );
  };

  const formatPercent = (num) => {
    const formatted = formatNumber(num);
    return formatted === "N/A" ? "N/A" : `${formatted}%`;
  };

  const formatCurrency = (num, showSign = false) => {
    if (
      num === null ||
      num === undefined ||
      Number.isNaN(Number(num)) ||
      String(num).trim() === "" ||
      num === "NaN"
    )
      return "N/A";
    const value = Number(num);
    const formatted = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(Math.abs(value));
    if (showSign) {
      return `${value >= 0 ? "+" : "-"}₹${formatted}`;
    }
    return `₹${formatted}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
      <NavBar />

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4 border border-blue-100">
            <Activity className="w-4 h-4" />
            <span>AI-Powered Insights</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Investment ROI Analyzer
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Leverage advanced AI point-of-view analysis to calculate potential
            returns, assess risks, and deeply understand your next property
            investment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-4">
        {customerError && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm flex items-start">
            <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-semibold">Calculation Error</h3>
              <p className="text-red-700 text-sm mt-1">{customerMessage}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              {/* Decorative gradient blur */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-blue-50 blur-3xl opacity-50 pointer-events-none"></div>

              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Financial Inputs
                </h2>
              </div>

              <form
                onSubmit={handleCalculate}
                className="space-y-5 relative z-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Property Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                      placeholder="e.g. Bandra West, Mumbai"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Purchase Price (₹)
                    </label>
                    <input
                      type="number"
                      name="propertyPrice"
                      placeholder="e.g. 1500000"
                      required
                      value={formData.propertyPrice}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Holding Period (Yrs)
                    </label>
                    <input
                      type="number"
                      name="holdingYears"
                      placeholder="e.g. 5"
                      required
                      value={formData.holdingYears}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Annual Rent (₹)
                    </label>
                    <input
                      type="number"
                      name="rentalIncome"
                      placeholder="e.g. 60000"
                      value={formData.rentalIncome}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Annual Maintenance (₹)
                    </label>
                    <input
                      type="number"
                      name="maintainCost"
                      placeholder="e.g. 20000"
                      value={formData.maintainCost}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Appreciation Rate (%)
                    </label>
                    <input
                      type="number"
                      name="appreciationRate"
                      step="0.1"
                      value={formData.appreciationRate}
                      placeholder="e.g. 5"
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Annual Property Tax (₹)
                    </label>
                    <input
                      type="number"
                      name="propertyTax"
                      value={formData.propertyTax}
                      placeholder="e.g. 5000"
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Purchase Fees/Closing Costs (₹)
                    </label>
                    <input
                      type="number"
                      name="purchaseFees"
                      value={formData.purchaseFees}
                      onChange={handleInputChange}
                      placeholder="e.g. 5000"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={customerLoading}
                    className="w-full group relative flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)_inset] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {customerLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Analysis...
                      </>
                    ) : (
                      <>
                        Generate Report
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Output / Results */}
          <div className="lg:col-span-7" ref={resultsRef}>
            {!roi && !customerLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 border-dashed h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
                  <TrendingUp className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Ready to Analyze
                </h3>
                <p className="max-w-md">
                  Fill in your property parameters and hit generate to unlock a
                  comprehensive, data-driven AI investment report.
                </p>
              </div>
            ) : customerLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full min-h-[500px] p-8 flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Crunching the numbers...
                </h3>
                <p className="text-slate-500 mt-2">
                  Our AI is evaluating the financial feasibility and evaluating
                  the risks.
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                {/* Hero Verdict Card */}
                <div
                  className={`rounded-2xl p-8 relative overflow-hidden shadow-lg ${getVerdictStyles(roi?.recommendation?.verdict)}`}
                >
                  <div className="relative z-10">
                    <div className="text-sm font-medium uppercase tracking-wider mb-2 opacity-90">
                      AI Recommendation
                    </div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {roi?.recommendation?.verdict || "Unknown"}
                      </h2>
                      {roi?.returns?.totalROI !== null && (
                        <div className="text-right">
                          <div className="text-sm font-medium opacity-90">
                            Est. Total ROI
                          </div>
                          <div className="text-3xl font-bold">
                            {formatPercent(roi?.returns?.totalROI)}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="mt-6 text-lg font-medium leading-relaxed opacity-95">
                      "{roi?.recommendation?.summary}"
                    </p>
                  </div>
                  {/* Background decoration */}
                  <TrendingUp className="absolute -bottom-10 -right-10 w-64 h-64 text-white opacity-10 pointer-events-none transform -rotate-12" />
                </div>

                {/* Returns Overview */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                    Return Metrics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-sm text-slate-500 font-medium mb-1">
                        Annualized ROI
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatPercent(roi?.returns?.annualizedROI)}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-sm text-slate-500 font-medium mb-1">
                        Cash on Cash
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatPercent(roi?.returns?.cashOnCashReturn)}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2">
                      <p className="text-sm text-slate-500 font-medium mb-1">
                        Net Profit Projection
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          roi?.summary?.netProfit == null ||
                          Number.isNaN(Number(roi?.summary?.netProfit)) ||
                          roi?.summary?.netProfit === "NaN" ||
                          String(roi?.summary?.netProfit).trim() === ""
                            ? "text-slate-900"
                            : Number(roi?.summary?.netProfit) >= 0
                              ? "text-emerald-600"
                              : "text-red-600"
                        }`}
                      >
                        {formatCurrency(roi?.summary?.netProfit, true)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Risk & Factors */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                          <AlertCircle className="w-4 h-4" />
                        </span>
                        Risk Profile
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ring-2 ring-inset ${getRiskStyles(roi?.riskAssessment?.level)}`}
                      >
                        {roi?.riskAssessment?.level || "Unknown"} Risk
                      </span>
                    </div>
                    <ul className="space-y-3 flex-grow">
                      {roi?.riskAssessment?.factors?.map((factor, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-slate-700 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0"></div>
                          <span className="leading-relaxed">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Financial Breakdown Summary */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4" />
                      </span>
                      Financial Breakdown
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                        <span className="text-slate-500">
                          Est. Current Value
                        </span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(roi?.summary?.estimatedCurrentValue)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                        <span className="text-slate-500">Total Est. Rent</span>
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(roi?.summary?.totalRentalIncome)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                        <span className="text-slate-500">
                          Total Maintenance
                        </span>
                        <span className="font-semibold text-red-500">
                          {formatCurrency(roi?.summary?.totalMaintenanceCost)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">
                          Total Property Tax
                        </span>
                        <span className="font-semibold text-red-500">
                          {formatCurrency(roi?.summary?.totalPropertyTax)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* detailed reasoning */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Analyst Breakdown
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed">
                    <p>{roi?.recommendation?.details}</p>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
                    {roi?.recommendation?.pros &&
                      (() => {
                        const prosList = Array.isArray(roi.recommendation.pros)
                          ? roi.recommendation.pros
                          : typeof roi.recommendation.pros === "string"
                            ? [roi.recommendation.pros]
                            : [];

                        return (
                          prosList.length > 0 && (
                            <div>
                              <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-3 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                                Key Strengths
                              </h4>
                              <ul className="space-y-2">
                                {prosList.map((pro, i) => (
                                  <li
                                    key={i}
                                    className="text-sm text-slate-600 flex items-start gap-2"
                                  >
                                    <span className="text-emerald-500 mt-0.5">
                                      •
                                    </span>{" "}
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        );
                      })()}
                    {roi?.recommendation?.cons &&
                      (() => {
                        const consList = Array.isArray(roi.recommendation.cons)
                          ? roi.recommendation.cons
                          : typeof roi.recommendation.cons === "string"
                            ? [roi.recommendation.cons]
                            : [];

                        return (
                          consList.length > 0 && (
                            <div>
                              <h4 className="font-bold text-red-800 flex items-center gap-2 mb-3 text-sm">
                                <AlertCircle className="w-4 h-4 text-red-500" />{" "}
                                Key Weaknesses
                              </h4>
                              <ul className="space-y-2">
                                {consList.map((con, i) => (
                                  <li
                                    key={i}
                                    className="text-sm text-slate-600 flex items-start gap-2"
                                  >
                                    <span className="text-red-500 mt-0.5">
                                      •
                                    </span>{" "}
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        );
                      })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
