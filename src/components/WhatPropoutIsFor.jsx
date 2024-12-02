"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Lightbulb, PiggyBank } from "lucide-react";

const features = [
  {
    title: "Communities",
    description: "Connect with like-minded investors and property enthusiasts.",
    icon: Users,
  },
  {
    title: "Government",
    description:
      "Streamlined processes for property registration and compliance.",
    icon: Building2,
  },
  {
    title: "Innovators",
    description:
      "A platform to showcase cutting-edge real estate technologies.",
    icon: Lightbulb,
  },
  {
    title: "Investors",
    description:
      "Access to diverse investment opportunities in the property market.",
    icon: PiggyBank,
  },
];

export default function WhatPropOutIsFor() {
  return (
    <section className="py-20 bg-purple-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What PropOut is Built For
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-purple-800 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <feature.icon className="w-6 h-6" />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
