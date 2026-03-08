import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ClipboardList, Sparkles, BarChart3, Timer, FileText } from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Smart Task Management",
    description: "Organize subjects, assignments and study goals in one place with intelligent categorization and priority sorting.",
    color: "from-primary to-accent",
  },
  {
    icon: Sparkles,
    title: "AI Study Plan Generator",
    description: "Automatically generate personalized study schedules based on your exams, deadlines and available study time.",
    color: "from-primary to-accent",
  },
  {
    icon: BarChart3,
    title: "Productivity Analytics Dashboard",
    description: "Visual dashboards that track completed tasks, study sessions, learning progress and weekly trends.",
    color: "from-accent to-primary",
  },
  {
    icon: Timer,
    title: "Pomodoro Focus Timer",
    description: "Built-in study timer with customizable intervals to help maintain focus and avoid distractions.",
    color: "from-accent to-primary",
  },
  {
    icon: FileText,
    title: "AI Notes Summarizer",
    description: "Convert long study notes into quick, digestible revision points powered by artificial intelligence.",
    color: "from-primary to-accent",
  },
];

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const cardVariants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.4, ease: EASE },
  }),
};

const FeatureCards3D = () => {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  const paginate = (dir: number) => {
    setActiveIndex(([prev]) => [
      (prev + dir + features.length) % features.length,
      dir,
    ]);
  };

  const feature = features[activeIndex];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Everything you need to study smarter
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Powerful tools designed to boost your academic performance.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
          {/* Left arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 sm:-left-4 z-20 w-10 h-10 rounded-full bg-card shadow-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-card-hover hover:scale-110 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Card container */}
          <div className="w-full max-w-lg mx-12 sm:mx-16 h-[320px] relative" style={{ transformStyle: "preserve-3d" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 gradient-card rounded-2xl p-8 shadow-card border border-border/50 flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{feature.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 sm:-right-4 z-20 w-10 h-10 rounded-full bg-card shadow-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-card-hover hover:scale-110 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex([i, i > activeIndex ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "gradient-primary w-6" : "bg-border hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards3D;
