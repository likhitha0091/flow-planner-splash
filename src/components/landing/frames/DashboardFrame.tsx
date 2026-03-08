import { BookOpen, Calendar, Clock, TrendingUp } from "lucide-react";

const DashboardFrame = () => (
  <div className="w-full h-full bg-card p-4 sm:p-6 flex flex-col gap-4 font-body text-foreground">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Welcome back, Alex</p>
        <h3 className="font-display font-bold text-base sm:text-lg">Dashboard</h3>
      </div>
      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
        <span className="text-xs text-primary-foreground font-bold">A</span>
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { icon: BookOpen, label: "Subjects", value: "6", color: "text-primary" },
        { icon: Calendar, label: "Tasks Due", value: "12", color: "text-accent" },
        { icon: Clock, label: "Study Hours", value: "24h", color: "text-primary" },
        { icon: TrendingUp, label: "Progress", value: "78%", color: "text-accent" },
      ].map((stat) => (
        <div key={stat.label} className="rounded-xl bg-secondary/50 p-3">
          <stat.icon className={`w-4 h-4 ${stat.color} mb-1`} />
          <p className="text-lg font-bold">{stat.value}</p>
          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
    <div className="flex-1 rounded-xl bg-secondary/30 p-3">
      <p className="text-xs font-medium mb-2">Today's Schedule</p>
      {["Mathematics – Chapter 5", "Physics – Lab Report", "CS – Algorithm Practice"].map((item, i) => (
        <div key={i} className="flex items-center gap-2 py-1.5 border-b border-border/30 last:border-0">
          <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "gradient-primary" : "bg-muted-foreground/30"}`} />
          <span className="text-xs">{item}</span>
          <span className="text-[10px] text-muted-foreground ml-auto">{`${9 + i * 2}:00`}</span>
        </div>
      ))}
    </div>
  </div>
);

export default DashboardFrame;
