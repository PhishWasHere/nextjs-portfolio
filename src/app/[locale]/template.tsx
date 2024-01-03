'use client'
// look at ./wrapper.tsx
import { motion } from "framer-motion";

export default function Template({ children }: React.PropsWithChildren) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 0 }}
    transition={{ delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
}