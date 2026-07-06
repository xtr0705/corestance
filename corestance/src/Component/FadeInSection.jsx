import { motion } from "framer-motion";

function FadeInSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeInSection;