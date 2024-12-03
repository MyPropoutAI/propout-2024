import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Home, ListChecks, Key, DollarSign } from "lucide-react";

const StatItem = ({ title, value, icon, color }) => (
  <div className="flex items-center space-x-2">
    <div className={`p-2 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <h4 className="text-2xl font-bold">{value}</h4>
    </div>
  </div>
);

export function PropertyStatsCard() {
  const stats = [
    {
      title: "Total Properties",
      value: 150,
      icon: <Home className="w-4 h-4" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Listed Properties",
      value: 75,
      icon: <ListChecks className="w-4 h-4" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Rented Properties",
      value: 50,
      icon: <Key className="w-4 h-4" />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Revenue",
      value: "₦500,000",
      icon: <DollarSign className="w-4 h-4" />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Property Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
