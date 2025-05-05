import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const ComingSoonModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 opacity-100"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Coming Soon!
          </h2>
          <p className="text-gray-700 mb-6">
            We're working hard to bring you this feature. Stay tuned for
            updates!
          </p>
          {/* Optional: Add a nice illustration or icon here */}
          {/* <img src="/path/to/illustration.png" alt="Coming Soon" className="mx-auto mb-6 w-32 h-32"/> */}
          <Button
            onClick={onClose}
            className="w-full bg-purple-900 hover:bg-[#5D55D0]"
          >
            Close
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
