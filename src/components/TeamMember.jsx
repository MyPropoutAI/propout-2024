import { motion } from "framer-motion";

// type TeamMemberProps = {
//   image: string;
//   name: string;
//   title: string;
//   index: number;
// };

const TeamMember = ({ image, name, title, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="image-card hover-lift aspect-[3/4]">
        <img src={image} alt={name} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg font-medium text-white">{name}</h3>
            <p className="text-sm text-white/90">{title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
