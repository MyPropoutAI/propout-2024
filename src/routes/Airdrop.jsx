"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const tasks = [
  {
    name: "Property listings",
    description:
      "List your properties on our platform to gain visibility and attract potential buyers or renters.",
  },
  {
    name: "Property inspection agreement",
    description:
      "Complete property inspection agreements to ensure transparency and trust in transactions.",
  },
  {
    name: "Social media tasks",
    description:
      "Engage with our community on social media platforms to increase your network and opportunities.",
  },
  {
    name: "Referrals",
    description:
      "Refer new users to our platform and help grow the PropOut ecosystem.",
  },
];

export default function TestnetActivities() {
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleTask = (taskName) => {
    setCompletedTasks((prev) =>
      prev.includes(taskName)
        ? prev.filter((t) => t !== taskName)
        : [...prev, taskName]
    );
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.h1
        className="text-5xl font-bold text-center mb-8 text-purple-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        TESTNET ACTIVITIES
      </motion.h1>

      <Card className="mb-8 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardTitle className="text-2xl">Daily Connect</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            PropOut Airdrop involves engaging with our ecosystem activities.
            Connect your wallet daily to participate in various tasks and
            contribute to the PropOut community!
          </motion.p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
        {tasks.map((task, index) => (
          <motion.div
            key={task.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-purple-700">
                  {task.name}
                </CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button
                  variant={
                    completedTasks.includes(task.name) ? "secondary" : "default"
                  }
                  onClick={() => toggleTask(task.name)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {completedTasks.includes(task.name) ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" /> Completed
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-5 w-5" /> Start Task
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-lg mb-4 text-gray-700">
          Connect your wallet daily to check your property trades and engage
          with activities.
        </p>
        <Link to="/dashboard">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
