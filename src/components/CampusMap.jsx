import { motion } from "framer-motion";

const CampusMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <div className="image-card hover-glow overflow-hidden">
        <img
          src="/lovable-uploads/pp16.jpg"
          alt="Campus Hot Zones Map"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20"></div>
      </div>
    </motion.div>
  );
};

export default CampusMap;
