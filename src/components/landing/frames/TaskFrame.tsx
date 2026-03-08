import { CheckCircle2, Circle } from "lucide-react";

const tasks = [
  { text: "Complete Linear Algebra Assignment", done: true, subject: "Math" },
  { text: "Read Chapter 7 – Thermodynamics", done: true, subject: "Physics" },
  { text: "Write Essay on AI Ethics", done: false, subject: "CS" },
  { text: "Prepare Biology Lab Notes", done: false, subject: "Biology" },
  { text: "Solve Practice Problems Set 3", done: false, subject: "Math" },
];

const TaskFrame = () => (
  <div className="w-full h-full bg-card p-4 sm:p-6 flex flex-col gap-4 font-body text-foreground">
    <div>
      <h3 className="font-display font-bold text-base sm:text-lg">Task Management</h3>
      <p className="text-xs text-muted-foreground">2 of 5 completed</p>
    </div>
    <div className="flex gap-2 text-xs">
      {["All", "Math", "Physics", "CS"].map((f, i) => (
        <span
          key={f}
          className={`px-3 py-1 rounded-full ${i === 0 ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
        >
          {f}
        </span>
      ))}
    </div>
    <div className="flex-1 space-y-2">
      {tasks.map((task, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
          {task.done ? (
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
          )}
          <span className={`text-xs flex-1 ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.text}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{task.subject}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TaskFrame;
