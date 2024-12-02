import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Globe } from "lucide-react";

const features = [
  {
    title: "Secure Transactions",
    description:
      "Blockchain-powered security ensures your property deals are tamper-proof and transparent.",
    icon: Shield,
  },
  {
    title: "Lightning Fast",
    description:
      "Complete property transactions in a fraction of the time compared to traditional methods.",
    icon: Zap,
  },
  {
    title: "Global Access",
    description:
      "Invest in properties worldwide without geographical limitations.",
    icon: Globe,
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose PropOut?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
