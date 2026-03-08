import { motion } from "framer-motion";

const AuroraBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {/* Base gradient */}
    <div className="absolute inset-0 bg-background" />

    {/* Aurora wave 1 */}
    <motion.div
      className="absolute -top-[40%] -left-[20%] w-[140%] h-[80%] opacity-[0.07] rounded-[50%] blur-3xl"
      style={{
        background: "linear-gradient(135deg, hsl(235, 55%, 52%), hsl(174, 55%, 42%), hsl(270, 50%, 58%))",
      }}
      animate={{
        x: [0, 80, -40, 0],
        y: [0, 30, -20, 0],
        rotate: [0, 5, -3, 0],
        scale: [1, 1.05, 0.98, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Aurora wave 2 */}
    <motion.div
      className="absolute -bottom-[30%] -right-[20%] w-[120%] h-[70%] opacity-[0.06] rounded-[50%] blur-3xl"
      style={{
        background: "linear-gradient(225deg, hsl(200, 60%, 55%), hsl(235, 55%, 52%), hsl(270, 50%, 58%))",
      }}
      animate={{
        x: [0, -60, 40, 0],
        y: [0, -40, 20, 0],
        rotate: [0, -4, 6, 0],
        scale: [1, 1.08, 0.95, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Aurora wave 3 - center */}
    <motion.div
      className="absolute top-[20%] left-[10%] w-[80%] h-[60%] opacity-[0.04] rounded-[50%] blur-3xl"
      style={{
        background: "linear-gradient(180deg, hsl(174, 55%, 42%), hsl(200, 60%, 55%), hsl(235, 55%, 52%))",
      }}
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -25, 35, 0],
        scale: [1, 1.1, 0.96, 1],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Floating glowing circles */}
    <motion.div
      className="absolute top-[15%] left-[20%] w-40 h-40 rounded-full bg-primary/[0.06] blur-2xl"
      animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-[60%] right-[15%] w-52 h-52 rounded-full bg-accent/[0.07] blur-2xl"
      animate={{ x: [0, -35, 25, 0], y: [0, 30, -25, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-[40%] left-[50%] w-36 h-36 rounded-full blur-2xl"
      style={{ backgroundColor: "hsl(270, 50%, 58%, 0.05)" }}
      animate={{ x: [0, 25, -35, 0], y: [0, -20, 30, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[20%] left-[30%] w-44 h-44 rounded-full blur-2xl"
      style={{ backgroundColor: "hsl(200, 60%, 55%, 0.04)" }}
      animate={{ x: [0, -20, 40, 0], y: [0, 35, -15, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-[10%] right-[30%] w-32 h-32 rounded-full bg-primary/[0.04] blur-2xl"
      animate={{ x: [0, 40, -15, 0], y: [0, 20, -30, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Grid pattern overlay */}
    <div className="absolute inset-0 bg-grid-pattern opacity-60" />
  </div>
);

export default AuroraBackground;
