// import React from "react";
import { motion } from "framer-motion";
import NavigationDots from "./NavigationDots";

const Section = ({
  children,
  id,
  className = "",
  title,
  showDots = true,
  titlePosition = "left",
}) => {
  return (
    <section
      id={id}
      className={`min-h-screen py-16 md:py-24 px-4 md:px-8 relative ${className}`}
    >
      {title && (
        <div
          className={`mb-16 md:mb-24 ${
            titlePosition === "center" ? "text-center" : ""
          }`}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-text text-3xl md:text-5xl font-medium relative inline-block"
          >
            {title}
            <div className="absolute -bottom-4 left-0 w-1/2 h-px bg-gradient-to-r from-accent to-transparent"></div>
          </motion.h2>
          {showDots && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <NavigationDots />
            </motion.div>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
