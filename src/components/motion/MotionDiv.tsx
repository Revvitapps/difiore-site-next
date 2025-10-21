import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionDivProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export default function MotionDiv({ className, children, delay = 0 }: MotionDivProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
