import { motion } from "framer-motion";

const InvestmentTable = () => {
  const projectSpecs = [
    { key: "Total Budget for 1 Hostel", value: "$500K (₦750,000,000)" },
    { key: "Number of Rooms", value: "100 + Amenities" },
    { key: "Room Type", value: "14 ft x 16 ft - Ensuite" },
    { key: "Star Rating Standards", value: "3-Star with edu-social amenities" },
    { key: "Location", value: "10 Hot Campus Zones Mapped Out! 3 to begin" },
    { key: "Project Duration", value: "9 - 12 Months" },
    { key: "Expected Occupancy", value: "90%" },
    {
      key: "Rental Value (per bed space)",
      value: "₦350,000 / annum + % increment /year",
    },
    { key: "Min Investment", value: "₦35K (₦50,000,000)" },
    { key: "Max Investment", value: "₦200k (₦300,000,000M)" },
    { key: "Number of Bed space", value: "288" },
  ];

  const roiData = [
    {
      year: "Year 1-5",
      projection: "10-15% Rental Income p.a + holding asset shares",
    },
    {
      year: "Year 5",
      projection: "15-20% Rental Income p.a + holding asset Share",
    },
    { year: "Year 10", projection: "120% - 270% ROI + holding asset shares" },
    {
      year: "Year 15",
      projection: "300%+ return on capital + holding asset shares",
    },
  ];

  const shareStructure = [
    {
      investment: "$100K (20%)",
      units: "20 Units (12.4% p.a)",
      ownership: "20% on Asset Shares",
    },
    {
      investment: "$150K (30%)",
      units: "30 Units (19.6% p.a)",
      ownership: "30% on Asset Shares",
    },
    {
      investment: "$200K (40%)",
      units: "40 Units (26.8% p.a)",
      ownership: "40% on Asset Shares",
    },
    { investment: "...", units: "...", ownership: "..." },
  ];

  const benefits = [
    "Increased Rental Yield",
    "Tax Benefits",
    "Capital Appreciation",
    "Diversification",
    "Regular Income Stream",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="gradient-border p-6 space-y-6 bg-white/5 hover-glow">
        <h3 className="font-heading text-lg text-primary mb-4">
          INVESTMENT STRUCTURE
        </h3>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-primary/10">
              <thead>
                <tr className="bg-primary/5">
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-primary tracking-wider"
                  >
                    Investment Level
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-primary tracking-wider"
                  >
                    Shareholding
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-primary tracking-wider"
                  >
                    Return
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                <tr>
                  <td className="px-4 py-3 text-sm">Angel</td>
                  <td className="px-4 py-3 text-sm">15%</td>
                  <td className="px-4 py-3 text-sm">25% + Bonus</td>
                </tr>
                <tr className="bg-primary/[0.02]">
                  <td className="px-4 py-3 text-sm">Seed</td>
                  <td className="px-4 py-3 text-sm">30%</td>
                  <td className="px-4 py-3 text-sm">20% + Bonus</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">Series A</td>
                  <td className="px-4 py-3 text-sm">40%</td>
                  <td className="px-4 py-3 text-sm">15% + Bonus</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-6 space-y-4"
      >
        <h3 className="gradient-text font-heading text-lg mb-2">
          BENEFITS TO INVESTORS
        </h3>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
              <span className="text-sm">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default InvestmentTable;
