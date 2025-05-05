import { motion } from "framer-motion";

const NavigationDots = () => {
  return (
    <div className="flex items-center gap-1.5">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: i * 0.1,
          }}
          className="w-1.5 h-1.5 rounded-full bg-accent/40"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="w-full h-full rounded-full bg-accent"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default NavigationDots;
