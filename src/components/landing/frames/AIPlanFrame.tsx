import { Sparkles } from "lucide-react";

const AIPlanFrame = () => (
  <div className="w-full h-full bg-card p-4 sm:p-6 flex flex-col gap-4 font-body text-foreground">
    <div className="flex items-center gap-2">
      <Sparkles className="w-5 h-5 text-accent" />
      <div>
        <h3 className="font-display font-bold text-base sm:text-lg">AI Study Planner</h3>
        <p className="text-xs text-muted-foreground">Generated plan for your finals</p>
      </div>
    </div>
    <div className="rounded-xl bg-secondary/30 p-3 border border-primary/20">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full gradient-primary animate-pulse" />
        <span className="text-xs font-medium text-primary">AI Recommendation</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Based on your exam dates and current progress, I recommend focusing on Mathematics and Physics this week.
        Allocate 2 hours daily for each subject.
      </p>
    </div>
    <div className="flex-1 space-y-2">
      {[
        { time: "8:00 – 10:00", subject: "Mathematics", topic: "Calculus Review" },
        { time: "10:30 – 12:30", subject: "Physics", topic: "Wave Mechanics" },
        { time: "14:00 – 15:30", subject: "CS", topic: "Data Structures" },
        { time: "16:00 – 17:00", subject: "Biology", topic: "Quick Revision" },
      ].map((slot, i) => (
        <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/20">
          <span className="text-[10px] text-muted-foreground w-24 shrink-0">{slot.time}</span>
          <div className="flex-1">
            <p className="text-xs font-medium">{slot.subject}</p>
            <p className="text-[10px] text-muted-foreground">{slot.topic}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AIPlanFrame;
