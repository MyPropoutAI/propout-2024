import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, Home, GitPullRequest } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProperties } from "../contexts/hooks/useProperty";
import { useUsers } from "../contexts/hooks/useGetAllUsers";

const Counter = ({ endValue, duration, title, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        setCount(
          Math.min(Math.floor((progress / duration) * endValue), endValue)
        );
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return (
    <Card className="bg-purple-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-white">
        <CardTitle className="text-sm font-medium ">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <motion.div
          className="text-5xl text-white font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {count?.toLocaleString()}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default function CounterDisplay() {
  const { properties } = useGetProperties();
  const { data: users } = useUsers();
  const agentsData = users ? users.user : [];
  //console.log(agentsData);
  const listedProperties = Array.isArray(properties?.listing)
    ? properties.listing
    : properties?.listing
    ? [properties.listing]
    : [];

  const totalProperties = listedProperties.length;
  const totalUsers = agentsData?.length;
  return (
    <div className="p-4 space-y-4 bg-purple-900 min-h-[20rem]">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Our Numbers
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Counter
          endValue={totalUsers}
          duration={2000}
          title="Total Users"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <Counter
          endValue={10}
          duration={2000}
          title="Total Transactions"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
        <Counter
          endValue={totalProperties}
          duration={2000}
          title="Total Properties"
          icon={<Home className="h-4 w-4 text-muted-foreground" />}
        />
        <Counter
          endValue={50}
          duration={2000}
          title="Total Property Requests"
          icon={<GitPullRequest className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </div>
  );
}
