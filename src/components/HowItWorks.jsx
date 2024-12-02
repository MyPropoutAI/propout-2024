"use client";

import { motion } from "framer-motion";
import { Wallet, Search, FileSignature, Key } from "lucide-react";

const steps = [
  {
    title: "Connect Wallet",
    description: "Link your crypto wallet to get started.",
    icon: Wallet,
  },
  {
    title: "Browse Properties",
    description: "Explore our curated list of properties.",
    icon: Search,
  },
  {
    title: "Make an Offer",
    description: "Place a bid or make an offer on your chosen property.",
    icon: FileSignature,
  },
  {
    title: "Complete Transaction",
    description: "Finalize the deal with smart contracts.",
    icon: Key,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How PropOut Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <step.icon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
