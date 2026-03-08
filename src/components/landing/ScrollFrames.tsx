import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import frameDashboard from "@/assets/frame-dashboard.jpg";
import frameTasks from "@/assets/frame-tasks.jpg";
import frameAnalytics from "@/assets/frame-analytics.jpg";
import frameAIPlanner from "@/assets/frame-aiplanner.jpg";
import frameProductivity from "@/assets/frame-productivity.jpg";

const frames = [
  { src: frameDashboard, label: "Dashboard Overview" },
  { src: frameTasks, label: "Task Management" },
  { src: frameAnalytics, label: "Study Analytics" },
  { src: frameAIPlanner, label: "AI Study Planning" },
  { src: frameProductivity, label: "Productivity Tracking" },
];

const ScrollFrames = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, frames.length - 1]);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${frames.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-5xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-card border border-border/50 bg-card aspect-[16/10]">
            {frames.map((frame, i) => (
              <FrameLayer key={i} index={i} activeIndex={activeIndex} src={frame.src} alt={frame.label} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {frames.map((frame, i) => (
              <FrameDot key={i} index={i} activeIndex={activeIndex} label={frame.label} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FrameLayer = ({
  index,
  activeIndex,
  src,
  alt,
}: {
  index: number;
  activeIndex: ReturnType<typeof useTransform>;
  src: string;
  alt: string;
}) => {
  const opacity = useTransform(activeIndex, (v: number) => {
    const dist = Math.abs(v - index);
    return dist < 0.5 ? 1 : Math.max(0, 1 - (dist - 0.5) * 2);
  });

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="eager" />
    </motion.div>
  );
};

const FrameDot = ({
  index,
  activeIndex,
  label,
}: {
  index: number;
  activeIndex: ReturnType<typeof useTransform>;
  label: string;
}) => {
  const scale = useTransform(activeIndex, (v: number) => (Math.abs(v - index) < 0.5 ? 1 : 0.7));
  const dotOpacity = useTransform(activeIndex, (v: number) => (Math.abs(v - index) < 0.5 ? 1 : 0.3));

  return (
    <motion.div style={{ scale, opacity: dotOpacity }} className="flex flex-col items-center gap-1">
      <div className="w-2 h-2 rounded-full gradient-primary" />
      <span className="text-[10px] text-muted-foreground hidden sm:block">{label}</span>
    </motion.div>
  );
};

export default ScrollFrames;
