import { motion } from "framer-motion";
import { ClipboardList, Sparkles, BarChart3, Timer, FileText } from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Smart Task Management",
    description: "Organize subjects, assignments and study goals in one place.",
  },
  {
    icon: Sparkles,
    title: "AI Study Plan Generator",
    description: "Automatically generate personalized study schedules based on exams and available time.",
  },
  {
    icon: BarChart3,
    title: "Productivity Analytics",
    description: "Visual dashboards that track completed tasks, study sessions and learning progress.",
  },
  {
    icon: Timer,
    title: "Pomodoro Focus Timer",
    description: "Built-in study timer to help maintain focus and avoid distractions.",
  },
  {
    icon: FileText,
    title: "AI Notes Summarizer",
    description: "Convert long study notes into quick revision points.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Features = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          Features
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Everything you need to study smarter
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm">
          Powerful tools designed to boost your academic performance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group gradient-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border/50"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:animate-float">
              <feature.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
