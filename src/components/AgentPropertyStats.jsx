import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
// import { PropertyStatsCard } from "./property-stats-card";
import { PropertyStatsCard } from "./PropertyStatsCard";

// Sample data - replace with actual data from your backend
const propertyData = [
  { month: "Jan", listings: 4, sales: 2, revenue: 10000 },
  { month: "Feb", listings: 6, sales: 3, revenue: 15000 },
  { month: "Mar", listings: 8, sales: 5, revenue: 25000 },
  { month: "Apr", listings: 10, sales: 7, revenue: 35000 },
  { month: "May", listings: 12, sales: 8, revenue: 40000 },
  { month: "Jun", listings: 15, sales: 10, revenue: 50000 },
];

export default function AgentPropertyStats() {
  const [selectedStat, setSelectedStat] = useState("listings");

  const statOptions = [
    { value: "listings", label: "Listings", color: "hsl(var(--chart-1))" },
    { value: "sales", label: "Sales", color: "hsl(var(--chart-2))" },
    { value: "revenue", label: "Revenue", color: "hsl(var(--chart-3))" },
  ];

  return (
    <div className="space-y-8">
      <PropertyStatsCard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-auto">
          <CardHeader>
            <CardTitle>Agent Property Statistics</CardTitle>
            <CardDescription>
              Monthly overview of property listings, sales, and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select
                value={selectedStat}
                onValueChange={(value) => setSelectedStat(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select statistic" />
                </SelectTrigger>
                <SelectContent>
                  {statOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ChartContainer
              config={{
                [selectedStat]: {
                  label: statOptions.find((opt) => opt.value === selectedStat)
                    ?.label,
                  color: statOptions.find((opt) => opt.value === selectedStat)
                    ?.color,
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={propertyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey={selectedStat}
                    stroke={
                      statOptions.find((opt) => opt.value === selectedStat)
                        ?.color
                    }
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
