import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

const pages = [
  {
    title: "WHITEPAPER/BUSINESS OVERVIEW",
    content: (
      <div className="space-y-4">
        <motion.img
          src="/images/pro2 1.svg?height=100&width=100"
          alt="Propout Logo"
          className="w-24 h-24 mx-auto"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.h1
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          PROPOUT
        </motion.h1>
        <motion.p
          className="text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          OUTSOURCING PROPERTIES AND OTHER REAL ESTATE ASSETS
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="https://www.mypropout.com"
            className="text-blue-600 hover:underline"
          >
            www.mypropout.com
          </a>
          <a
            href="mailto:support@mypropout.com"
            className="text-blue-600 hover:underline"
          >
            support@mypropout.com
          </a>
          <p>+234-916-040-1631</p>
        </motion.div>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a href="#" className="text-blue-600 hover:underline">
            @MyPropOut
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            mypropout
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Propout
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            Propout
          </a>
        </motion.div>
        <motion.p
          className="text-center font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          WEB 3.0
        </motion.p>
      </div>
    ),
  },
  {
    title: "TECHNOLOGY",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">TECHNOLOGY</h2>
        <p>
          Propout is built using cutting-edge PropTech AI technology, ensuring a
          secure and transparent platform for all users. Our system leverages
          blockchain technology to create Non-Fungible Tokens (NFTs)
          representing real estate assets, enabling fractional ownership and
          seamless trading. This innovative approach enhances liquidity and
          accessibility within the real estate market.
        </p>

        <h2 className="text-2xl font-bold">SECURITY</h2>
        <p>
          Security is paramount at Propout. We employ robust security measures,
          including advanced encryption and multi-signature wallets, to protect
          user assets and data. Our platform adheres to the highest industry
          standards, ensuring a safe and reliable environment for all
          transactions.
        </p>

        <h2 className="text-2xl font-bold">TOKENOMICS</h2>
        <p>
          The Propout token ($PRO) plays a crucial role in the platform&apos;s
          ecosystem. It facilitates transactions, rewards users for
          participation, and grants access to exclusive features. The
          token&apos;s value is intrinsically linked to the platform&apos;s
          growth and adoption, creating a mutually beneficial relationship
          between users and the Propout ecosystem.
        </p>

        <h2 className="text-2xl font-bold">BENEFITS</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>For Property Owners:</strong> Access to a wider pool of
            potential buyers and investors, faster transaction times, and
            reduced costs.
          </li>
          <li>
            <strong>For Real Estate Agents:</strong> Increased efficiency,
            expanded reach, and new revenue streams.
          </li>
          <li>
            <strong>For Investors:</strong> Diversification opportunities,
            fractional ownership of high-value assets, and potentially higher
            returns.
          </li>
          <li>
            <strong>For Developers:</strong> Access to a global network of
            investors and buyers, streamlined development processes, and reduced
            financing costs.
          </li>
        </ul>

        <h2 className="text-2xl font-bold">CONCLUSION</h2>
        <p>
          Propout is revolutionizing the real estate industry by leveraging the
          power of blockchain technology and AI. Our platform offers a secure,
          transparent, and efficient way to buy, sell, and invest in real
          estate, creating a more accessible and liquid market for everyone.
        </p>
      </div>
    ),
  },
  // Add more pages here...
];

export default function WhitepaperContent() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{pages[currentPage].title}</CardTitle>
          </CardHeader>
          <CardContent>{pages[currentPage].content}</CardContent>
        </Card>
      </motion.div>
      <div className="flex justify-between mt-4 max-w-4xl mx-auto">
        <Button onClick={prevPage} disabled={currentPage === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextPage} disabled={currentPage === pages.length - 1}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
