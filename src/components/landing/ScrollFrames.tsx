import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DashboardFrame from "./frames/DashboardFrame";
import TaskFrame from "./frames/TaskFrame";
import AnalyticsFrame from "./frames/AnalyticsFrame";
import AIplanFrame from "./frames/AIPlanFrame";
import ProductivityFrame from "./frames/ProductivityFrame";

const frames = [
  { component: DashboardFrame, label: "Dashboard Overview" },
  { component: TaskFrame, label: "Task Management" },
  { component: AnalyticsFrame, label: "Study Analytics" },
  { component: AIplanFrame, label: "AI Study Planning" },
  { component: ProductivityFrame, label: "Productivity Tracking" },
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
              <FrameLayer key={i} index={i} activeIndex={activeIndex} frame={frame} />
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
  frame,
}: {
  index: number;
  activeIndex: ReturnType<typeof useTransform>;
  frame: (typeof frames)[number];
}) => {
  const opacity = useTransform(activeIndex, (v: number) => {
    const dist = Math.abs(v - index);
    return dist < 0.5 ? 1 : Math.max(0, 1 - (dist - 0.5) * 2);
  });

  const Component = frame.component;

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <Component />
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
