import { motion } from "framer-motion";
import { ClipboardList, Sparkles, BarChart3, Timer, FileText, type LucideIcon } from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Smart Task Management",
    description: "Organize subjects, assignments and study goals with intelligent categorization and due-date tracking.",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Sparkles,
    title: "AI Study Plan Generator",
    description: "Generate personalized study schedules based on your exams, priorities and available time — automatically.",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: BarChart3,
    title: "Productivity Dashboard",
    description: "Visual analytics that track completed tasks, study sessions, weekly trends and learning progress.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Timer,
    title: "Pomodoro Focus Timer",
    description: "Built-in study timer with customizable intervals to help you stay focused and avoid distractions.",
    gradient: "from-accent to-primary",
  },
  {
    icon: FileText,
    title: "AI Notes Summarizer",
    description: "Convert long study notes into quick, digestible revision points powered by artificial intelligence.",
    gradient: "from-primary/80 to-accent/80",
  },
];

const FeatureBlock = ({
  feature,
  index,
}: {
  feature: { icon: LucideIcon; title: string; description: string; gradient: string };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    className="group rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border/50 bg-card/70 backdrop-blur-sm"
  >
    <motion.div
      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
      whileHover={{ rotate: 8, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <feature.icon className="w-5 h-5 text-primary-foreground" />
    </motion.div>
    <h3 className="font-display font-bold text-foreground mb-2">{feature.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
  </motion.div>
);

const Features = () => (
  <section className="relative py-24 px-6">
    <div className="relative max-w-6xl mx-auto">
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
          Powerful, AI-driven tools designed to boost your academic performance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <FeatureBlock key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Features;
