import { motion } from "framer-motion";

const partners = [
  { name: "Partner 1", logo: "/images/pertner1.svg" },
  { name: "Partner 2", logo: "/images/pertner2.svg" },
  { name: "Partner 3", logo: "/images/pertner3.svg" },
  { name: "Partner 4", logo: "/images/pertner4.svg" },
  { name: "Partner 5", logo: "/images/pertner5.svg" },
];

export default function Partners() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
        <div className="grid grid-cols-5 justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
