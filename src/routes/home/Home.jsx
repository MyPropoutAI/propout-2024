import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AdsCarousel } from "../../components/Carosel";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//import { TestimonialCard } from "../../components/TestimonialCard";
import { ResponsiveTestimonialCarousel } from "../../components/ResponsiveTestimonialCarousel";

export default function Home() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Mobile Hero Section */}
        <section className="md:hidden py-8 px-4 bg-white">
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-2xl font-bold">
              Find Your Dream Property in Africa
            </h1>
            <p className="text-sm text-gray-500">
              Your trusted partner for African real estate investments
            </p>

            <div className="flex flex-col gap-3">
              <Tabs defaultValue="rent" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="rent" className="text-sm">
                    Rent
                  </TabsTrigger>
                  <TabsTrigger value="buy" className="text-sm">
                    Buy
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="text-sm">
                    Sell
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative">
                <Input placeholder="Barcelona, Spain" className="pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <Link to={"/marketplace"}>
                <Button className="w-full bg-[#7065F0] hover:bg-[#5D55D0]">
                  Browse Properties
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <div className="text-[#7065F0] text-xl font-bold">500k+</div>
                <div className="text-xs text-gray-500">renters</div>
                <div className="text-xs text-gray-500">
                  satisfied in our service
                </div>
              </div>
              <div>
                <div className="text-[#7065F0] text-xl font-bold">10k+</div>
                <div className="text-xs text-gray-500">properties</div>
                <div className="text-xs text-gray-500">
                  and houses ready for occupancy
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Desktop Hero Section */}
        <section className="hidden md:block relative h-screen overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video
              autoPlay
              muted
              playsInline
              loop
              className="object-cover w-full h-full"
            >
              <source src="/video/hero1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-[#000000]/60 to-transparent z-10"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  className="space-y-8 text-white"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h1
                    className="text-5xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Find Your Dream Property in Africa
                  </motion.h1>

                  <motion.p
                    className="text-xl text-white/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Your trusted partner for African real estate investments
                  </motion.p>

                  <motion.div
                    className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                  >
                    <Tabs defaultValue="rent" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-6 bg-white/10">
                        <TabsTrigger
                          value="rent"
                          className="text-white data-[state=active]:bg-purple-900 data-[state=active]:text-white"
                        >
                          Rent
                        </TabsTrigger>
                        <TabsTrigger
                          value="buy"
                          className="text-white data-[state=active]:bg-purple-900 data-[state=active]:text-white"
                        >
                          Buy
                        </TabsTrigger>
                        <TabsTrigger
                          value="sell"
                          className="text-white data-[state=active]:bg-purple-900 data-[state=active]:text-white"
                        >
                          Sell
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="grid grid-cols-3 gap-4">
                      <Link to={"/marketplace"}>
                        <Button
                          variant="outline"
                          className="w-full border-white/30 text-white hover:bg-white/20 hover:text-white"
                        >

                          Rent Properties

                        </Button>
                      </Link>
                      <Link to={"/marketplace"}>
                        <Button
                          variant="outline"
                          className="w-full border-white/30 text-white hover:bg-white/20 hover:text-white"
                        >
                          Buy Properties
                        </Button>
                      </Link>

                      <Link to={"/dashboard/list"}>

                        <Button className="w-full bg-purple-900 hover:bg-[#5D55D0]">
                          List Properties
                        </Button>
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-2 gap-8 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                    >
                      <div className="text-purple-800 text-3xl font-bold">
                        10k+
                      </div>
                      <div className="text-sm text-white/80">renters</div>
                      <div className="text-sm text-white/80">
                        satisfied in our service
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                    >
                      <div className="text-purple-800 text-3xl font-bold">

                        100k+

                      </div>
                      <div className="text-sm text-white/80">properties</div>
                      <div className="text-sm text-white/80">
                        ready for occupancy
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="hidden lg:flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -top-10 -right-10 bg-white rounded-lg p-4 shadow-xl"
                      initial={{ opacity: 0, x: 20, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.3 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center text-white text-xl">

                          MG
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            Magdalene Govender

                          </div>
                          <div className="text-xs text-gray-500">
                            Real Estate Agent
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <div>Listed the property</div>
                        <div className="font-medium">24 hrs ago</div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-white rounded-xl overflow-hidden shadow-2xl w-80"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                    >
                      <img
                        src="/images/hero-card-image.jpg"
                        alt="Featured property"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-lg font-bold">₦20,000,000</div>
                            <div className="text-sm text-gray-500">
                              Palm Harbor
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-xs">
                            <Badge
                              variant="outline"
                              className="bg-[#F8F7FF] text-purple-900 border-purple-900"
                            >
                              Excellent
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500">
                            From 3,189 reviews
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Animated scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="flex flex-col items-center text-white">
              <div className="text-sm font-light mb-2">Scroll to explore</div>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div
                  className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                  animate={{
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Property Listings */}
        <section className="py-12 bg-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AdsCarousel />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 md:hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-2xl font-bold">
                The new way to find your new home
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Find your dream place to live in with more than 10k+ properties
                listed.
              </p>

              <Link to={"/marketplace"}>
                <Button className="mt-4 bg-purple-900 hover:bg-[#7065F0]">
                  Browse Properties
                </Button>
              </Link>

            </motion.div>

            <motion.div
              className="hidden md:block text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-2xl font-bold">
                The new way to find your new home
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Find your dream place to live in with more than 10k+ properties
                listed.
              </p>
              <Button className="mt-4  bg-purple-900 hover:bg-[#7065F0]">
                Browse Properties
              </Button>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div className="p-4" variants={itemVariant}>
                <div className="w-12 h-12 bg-[#F8F7FF] rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-[#7065F0]">🏠</div>
                </div>
                <h3 className="text-lg font-semibold">Property Insurance</h3>
                <p className="text-sm text-gray-500 mt-2">
                  We offer best price guarantee for all properties and premium
                  insurance for better life.
                </p>
              </motion.div>

              <motion.div className="p-4" variants={itemVariant}>
                <div className="w-12 h-12 bg-[#F8F7FF] rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-[#7065F0]">💰</div>
                </div>
                <h3 className="text-lg font-semibold">Best Price</h3>
                <p className="text-sm text-gray-500 mt-2">
                  We offer a fair price for all properties without charging any
                  hidden fees or commissions.
                </p>
              </motion.div>

              <motion.div className="p-4" variants={itemVariant}>
                <div className="w-12 h-12 bg-[#F8F7FF] rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-[#7065F0]">📉</div>
                </div>
                <h3 className="text-lg font-semibold">Lowest Commission</h3>
                <p className="text-sm text-gray-500 mt-2">
                  You no longer have to negotiate commissions with agents or
                  haggle with other agents.
                </p>
              </motion.div>

              <motion.div className="p-4" variants={itemVariant}>
                <div className="w-12 h-12 bg-[#F8F7FF] rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-[#7065F0]">🔒</div>
                </div>
                <h3 className="text-lg font-semibold">Overall Control</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Get virtual tour and schedule visits before you rent or buy
                  any properties. No need to visit.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-2xl font-bold">
                We make it easy for{" "}
                <span className="text-white/80">tenants</span> and{" "}
                <span className="text-white/80">landlords</span>.
              </h2>

              <motion.div
                className="grid md:grid-cols-3 gap-6 mt-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div
                  className="bg-purple-800 shadow-md rounded-xl p-6 text-left"
                  variants={itemVariant}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <div className="text-white">🏠</div>
                  </div>
                  <h3 className="font-semibold mb-2">Virtual home tour</h3>
                  <p className="text-sm text-white/80">
                    Schedule virtual home touring with agents and explore
                    properties from your comfort zone.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-purple-800 rounded-xl p-6 text-left"
                  variants={itemVariant}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <div className="text-white">🔍</div>
                  </div>
                  <h3 className="font-semibold mb-2">Find the best deal</h3>
                  <p className="text-sm text-white/80">
                    Browse thousands of properties, save your favorites and get
                    notified when new homes match your criteria.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-purple-800 rounded-xl p-6 text-left"
                  variants={itemVariant}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <div className="text-white">📝</div>
                  </div>
                  <h3 className="font-semibold mb-2">Get ready to apply</h3>
                  <p className="text-sm text-white/80">
                    Create your renter profile once and use it to quickly apply
                    for any available property on our platform.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mt-12 text-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div>
                  <div className="font-bold">7.4%</div>
                  <div className="text-sm text-white/80">
                    Property Return Rate
                  </div>
                </div>
                <div>
                  <div className="font-bold">3,856</div>
                  <div className="text-sm text-white/80">
                    Properties Listed & Sold
                  </div>
                </div>
                <div>
                  <div className="font-bold">2,540</div>
                  <div className="text-sm text-white/80">
                    Daily Completed Transactions
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-sm text-purple-800 font-medium">
                No Spam Promise
              </div>
              <h2 className="text-2xl font-bold">Are you a landlord?</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Discover how to increase your rental income and find better
                tenants. No spam.
              </p>
              <div className="max-w-md mx-auto flex gap-2 mt-6">
                <Input
                  placeholder="Enter your email address"
                  className="flex-1"
                />
                <Button className="bg-purple-900 hover:bg-[#5D55D0]">
                  Submit
                </Button>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                By submitting this form, you agree to our privacy policy and
                terms of service.
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-[#F8F7FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-sm text-purple-800 font-medium">
                Testimonials
              </div>
              <h2 className="text-2xl font-bold mt-2">
                What Our Clients Say About Us
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mt-2">
                Discover why property owners and buyers trust our platform for
                their real estate needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <ResponsiveTestimonialCarousel />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
