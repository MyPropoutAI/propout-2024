import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "../../components/ui/dialog";
//import { DialogContent } from "@radix-ui/react-dialog";
// import { Dialog, DialogOverlay, DialogContent } from "";

const LOCATIONS = [
  { name: "UniAbuja", total: 800_000_000, open: true },
  { name: "AE-FUNAI", total: 900_000_000, open: false },
  { name: "Uniport", total: 750_000_000, open: false },
];

const AVAILABLE_SHARES = 35;

function ROICalculator() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [investment, setInvestment] = useState(100000);
  const [roiPercent] = useState(16);
  const [period, setPeriod] = useState(5);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const investmentInputRef = useRef(null);

  // Format number with commas
  function formatNumberWithCommas(value) {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  // Handle input with formatting
  function handleInvestmentChange(e) {
    const raw = e.target.value.replace(/,/g, "");
    const num = Number(raw);
    setInvestment(num);
    if (investmentInputRef.current) {
      investmentInputRef.current.value = formatNumberWithCommas(raw);
    }
  }

  // User's percentage of the project
  const userPercent =
    selectedLocation.total > 0
      ? (investment / selectedLocation.total) * 100
      : 0;
  const annualROI = investment * (roiPercent / 100);
  const totalROI = annualROI * period;
  const capitalCost = investment;

  // Projection data for graph
  const data = Array.from({ length: period }, (_, i) => ({
    year: `Year ${i + 1}`,
    roi: annualROI * (i + 1),
    total: capitalCost + annualROI * (i + 1),
  }));

  function handleLocationClick(loc) {
    if (loc.open) {
      setSelectedLocation(loc);
    } else {
      setModalMessage(`${loc.name} is not yet open for investment.`);
      setModalOpen(true);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-background py-16 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full glass-card p-8 rounded-2xl shadow-xl mt-8"
      >
        <h1 className="gradient-text text-3xl md:text-4xl font-bold mb-2 text-center">
          ROI Calculator
        </h1>
        <p className="text-center text-sm text-foreground/70 mb-6">
          Disclaimer: This is an estimated calculation for demonstration
          purposes only. Actual returns may vary please contact use for the
          actual value.
        </p>
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.name}
              onClick={() => handleLocationClick(loc)}
              className={`px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-transform border-2 ${
                selectedLocation.name === loc.name && loc.open
                  ? "bg-primary text-white border-primary"
                  : "bg-white/80 text-primary border-primary/30"
              } ${!loc.open ? "opacity-60 cursor-not-allowed" : ""}`}
              type="button"
              tabIndex={0}
            >
              {loc.name}
            </button>
          ))}
        </div>
        <div className="mb-6 text-center">
          <div className="text-lg font-medium text-primary">
            {`Total Investment Estimate for ${selectedLocation.name} PBSA`}
          </div>
          <div className="text-2xl font-bold text-primary">
            ₦{formatNumberWithCommas(selectedLocation.total)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <label className="block font-medium text-primary">
              Your Investment Amount (₦)
            </label>
            <input
              type="text"
              min={1000}
              step={1000}
              value={formatNumberWithCommas(investment)}
              onChange={handleInvestmentChange}
              ref={investmentInputRef}
              className="w-full px-4 py-2 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary outline-none bg-white/80"
              inputMode="numeric"
              pattern="[0-9,]*"
            />
            <div className="mt-2 p-3 rounded-lg bg-primary/10 text-primary font-semibold text-center">
              Your Ownership:{" "}
              <span className="text-xl">
                {userPercent.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}
                %
              </span>
            </div>
            {/* Remove Annual ROI input, show as fixed value */}
            <div className="mt-4 hidden">
              <label className="block font-medium text-primary">
                Annual ROI (%)
              </label>
              <div className="w-full px-4 py-2 rounded-lg border border-primary/30 bg-white/80 text-lg font-semibold text-primary/90 text-center cursor-not-allowed select-none">
                16%
              </div>
            </div>
            <label className="block font-medium text-primary mt-4">
              Investment Period (years)
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary outline-none bg-white/80"
            />
            <div className="mt-6 p-4 rounded-lg bg-primary/10 text-primary font-semibold text-center">
              Available Shares:{" "}
              <span className="text-2xl">{AVAILABLE_SHARES}</span>
            </div>
          </div>
          <div className="space-y-6 flex flex-col justify-center">
            <div className="p-4 rounded-lg bg-accent/10">
              <div className="font-medium text-primary">Annual ROI</div>
              <div className="text-2xl font-bold">
                ₦
                {annualROI.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/10">
              <div className="font-medium text-primary">
                Total ROI after {period} years
              </div>
              <div className="text-2xl font-bold">
                ₦
                {totalROI.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/10">
              <div className="font-medium text-primary">
                Capital Cost after {period} years
              </div>
              <div className="text-2xl font-bold">
                ₦
                {capitalCost.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-primary mb-4">
            ROI Projection Over Time
          </h2>
          <div className="bg-white/60 rounded-xl p-4 shadow">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={data}
                margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#3b4252", fontWeight: 500 }}
                />
                <YAxis tick={{ fill: "#3b4252", fontWeight: 500 }} />
                <Tooltip formatter={(v) => `₦${Number(v).toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Cumulative ROI"
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  dot={false}
                  name="Capital + ROI"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 rounded-full bg-primary text-white font-semibold shadow hover:scale-105 transition-transform"
            onClick={() => setContactModalOpen(true)}
          >
            Contact Us
          </button>
        </div>
      </motion.div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogOverlay />
        <DialogContent>
          <div className="text-lg font-semibold mb-2 text-primary">
            Location Not Open
          </div>
          <div className="mb-4 text-foreground/80">{modalMessage}</div>
          <button
            className="px-6 py-2 rounded-full bg-primary text-white font-semibold mt-2"
            onClick={() => setModalOpen(false)}
          >
            OK
          </button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        className="bg-white"
      >
        <DialogOverlay />
        <DialogContent>
          <div className="text-lg font-semibold mb-2 text-primary">
            Contact Information
          </div>
          <div className="mb-2 text-foreground/80">
            <div className="mb-1">
              <span className="font-medium">Email:</span>{" "}
              pbsa.investments@mypropout.com
            </div>
            <div className="mb-1">
              <span className="font-medium">Phone 1:</span> 0907 474 3062
            </div>
            <div>
              <span className="font-medium">Phone 2:</span> 0906 994 6579
            </div>
          </div>
          <button
            className="px-6 py-2 rounded-full bg-primary text-white font-semibold mt-4"
            onClick={() => setContactModalOpen(false)}
          >
            Close
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ROICalculator;
