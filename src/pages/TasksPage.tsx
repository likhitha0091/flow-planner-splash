import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Plus, CheckCircle2, Circle, Pencil, Trash2, X, Flag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: "low" | "medium" | "high";
  deadline: string;
  completed: boolean;
}

const priorityColors = {
  low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  high: "bg-rose-500/10 text-rose-600 border-rose-500/20",
};

const initialTasks: Task[] = [
  { id: "1", title: "Complete Calculus Assignment", description: "Solve problems from Chapter 5", subject: "Mathematics", priority: "high", deadline: "2026-03-09", completed: true },
  { id: "2", title: "Read Chapter 7 – Thermodynamics", description: "Cover all key concepts", subject: "Physics", priority: "medium", deadline: "2026-03-08", completed: true },
  { id: "3", title: "Write Essay on AI Ethics", description: "1500 word essay on ethical AI", subject: "Computer Science", priority: "high", deadline: "2026-03-10", completed: false },
  { id: "4", title: "Prepare Biology Lab Notes", description: "Organize notes for lab session", subject: "Biology", priority: "medium", deadline: "2026-03-11", completed: false },
  { id: "5", title: "Solve Practice Problems Set 3", description: "Integration practice", subject: "Mathematics", priority: "low", deadline: "2026-03-12", completed: false },
  { id: "6", title: "Data Structures Quiz Prep", description: "Review trees and graphs", subject: "Computer Science", priority: "high", deadline: "2026-03-09", completed: false },
];

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form, setForm] = useState({ title: "", description: "", subject: "", priority: "medium" as Task["priority"], deadline: "" });
  const { toast } = useToast();

  const filtered = tasks.filter((t) => filter === "all" ? true : filter === "completed" ? t.completed : !t.completed);

  const openAdd = () => { setEditingTask(null); setForm({ title: "", description: "", subject: "", priority: "medium", deadline: "" }); setModalOpen(true); };
  const openEdit = (t: Task) => { setEditingTask(t); setForm({ title: t.title, description: t.description, subject: t.subject, priority: t.priority, deadline: t.deadline }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingTask) {
      setTasks((prev) => prev.map((t) => t.id === editingTask.id ? { ...t, ...form } : t));
      toast({ title: "Task updated" });
    } else {
      setTasks((prev) => [...prev, { id: Date.now().toString(), ...form, completed: false }]);
      toast({ title: "Task added" });
    }
    setModalOpen(false);
  };

  const toggleComplete = (id: string) => setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  const handleDelete = (id: string) => { setTasks((prev) => prev.filter((t) => t.id !== id)); toast({ title: "Task deleted" }); };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">{tasks.filter((t) => !t.completed).length} pending · {tasks.filter((t) => t.completed).length} completed</p>
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "completed"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <Button variant="hero" size="sm" className="rounded-xl gap-1.5" onClick={openAdd}><Plus className="w-3.5 h-3.5" /> Add Task</Button>
        </div>
      </motion.div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((task, i) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-all p-4 group"
            >
              <div className="flex items-start gap-3">
                <button onClick={() => toggleComplete(task.id)} className="mt-0.5 shrink-0">
                  {task.completed ? <CheckCircle2 className="w-5 h-5 text-accent" /> : <Circle className="w-5 h-5 text-muted-foreground/40 hover:text-primary/60 transition-colors" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-medium text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</h3>
                    <Badge variant="outline" className={`text-[10px] ${priorityColors[task.priority]}`}>
                      <Flag className="w-2.5 h-2.5 mr-1" />{task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{task.subject}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="w-2.5 h-2.5" />{task.deadline}</span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => openEdit(task)} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(task.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No tasks found</div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card rounded-2xl border border-border/50 shadow-card p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-foreground">{editingTask ? "Edit Task" : "Add Task"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task title" className="bg-secondary/30 border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Task description" className="bg-secondary/30 border-border/50 min-h-[80px]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Subject</Label>
                    <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="bg-secondary/30 border-border/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Priority</Label>
                    <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as Task["priority"] })}>
                      <SelectTrigger className="bg-secondary/30 border-border/50"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Deadline</Label>
                  <Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="bg-secondary/30 border-border/50" />
                </div>
                <Button variant="hero" className="w-full rounded-xl" onClick={handleSave}>{editingTask ? "Update" : "Add"} Task</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;
