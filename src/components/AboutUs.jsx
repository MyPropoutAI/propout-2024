import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section id="about-us" className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600 mb-4">
            PropOut is a revolutionary real estate investment Technology (REIT)
            powered by a groundbreaking opportunity for Nigeria, Africa, and the
            world.
          </p>
          <p className="text-gray-600 mb-4">
            As the real estate sector evolves into a single marketplace, PropOut
            is poised to become a leader in providing innovative solutions for
            investors, communities, and governments alike.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2"
        >
          <img
            src="/images/abt.svg"
            alt="PropOut Mobile App"
            className="w-[40rem] h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
