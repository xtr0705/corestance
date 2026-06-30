import { motion } from "framer-motion";

function Tap({ children, className = "" }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Tap;