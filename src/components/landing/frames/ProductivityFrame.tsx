import { Timer, Target, Flame } from "lucide-react";

const ProductivityFrame = () => (
  <div className="w-full h-full bg-card p-4 sm:p-6 flex flex-col gap-4 font-body text-foreground">
    <div>
      <h3 className="font-display font-bold text-base sm:text-lg">Productivity Tracker</h3>
      <p className="text-xs text-muted-foreground">You're doing great today!</p>
    </div>
    <div className="flex items-center justify-center py-4">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="stroke-secondary" />
          <circle
            cx="50" cy="50" r="42" fill="none" strokeWidth="8"
            strokeDasharray={`${0.78 * 264} ${264}`}
            strokeLinecap="round"
            className="stroke-primary"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">78%</span>
          <span className="text-[10px] text-muted-foreground">Daily Goal</span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[
        { icon: Timer, label: "Focus Time", value: "4h 20m" },
        { icon: Target, label: "Tasks Done", value: "8/12" },
        { icon: Flame, label: "Streak", value: "7 days" },
      ].map((item) => (
        <div key={item.label} className="rounded-xl bg-secondary/30 p-3 text-center">
          <item.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
          <p className="text-sm font-bold">{item.value}</p>
          <p className="text-[9px] text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ProductivityFrame;
