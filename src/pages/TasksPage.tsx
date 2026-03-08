import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, Circle, Pencil, Trash2, X, ListTodo, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTasks } from "@/hooks/useTasks";
import { useSubjects } from "@/hooks/useSubjects";

const priorityColors: Record<string, string> = {
  low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  high: "bg-rose-500/10 text-rose-600 border-rose-500/20",
};

const TasksPage = () => {
  const { tasks, isLoading, addTask, updateTask, deleteTask } = useTasks();
  const { subjects } = useSubjects();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", subject_id: "", priority: "medium", deadline: "" });
  const { toast } = useToast();

  const filtered = tasks.filter((t) => filter === "all" ? true : filter === "completed" ? t.completed : !t.completed);

  const openAdd = () => { setEditingId(null); setForm({ title: "", description: "", subject_id: "", priority: "medium", deadline: "" }); setModalOpen(true); };
  const openEdit = (t: any) => { setEditingId(t.id); setForm({ title: t.title, description: t.description || "", subject_id: t.subject_id || "", priority: t.priority, deadline: t.deadline || "" }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    const payload = { title: form.title, description: form.description, subject_id: form.subject_id || null, priority: form.priority, deadline: form.deadline || null };
    if (editingId) {
      await updateTask.mutateAsync({ id: editingId, ...payload });
      toast({ title: "Task updated" });
    } else {
      await addTask.mutateAsync(payload);
      toast({ title: "Task added" });
    }
    setModalOpen(false);
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    await updateTask.mutateAsync({ id, completed: !completed });
  };

  const handleDelete = async (id: string) => {
    await deleteTask.mutateAsync(id);
    toast({ title: "Task deleted" });
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">{tasks.length} total · {tasks.filter(t => t.completed).length} completed</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary/50 rounded-xl p-1">
            {(["all", "pending", "completed"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${filter === f ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
          </div>
          <Button variant="hero" className="rounded-xl gap-2" onClick={openAdd}><Plus className="w-4 h-4" /> Add Task</Button>
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted-foreground">
          <ListTodo className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">No tasks {filter !== "all" ? `(${filter})` : "yet"}</p>
          <p className="text-sm mt-1">{filter === "all" ? "Add your first task to get started" : "Try a different filter"}</p>
        </motion.div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map((task, i) => (
              <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3 p-4 rounded-2xl bg-card/70 backdrop-blur-sm border border-border/50 shadow-card hover:shadow-card-hover transition-all group">
                <button onClick={() => toggleComplete(task.id, task.completed)} className="shrink-0">
                  {task.completed ? <CheckCircle2 className="w-5 h-5 text-accent" /> : <Circle className="w-5 h-5 text-muted-foreground/40 hover:text-primary/60 transition-colors" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</p>
                  {task.description && <p className="text-xs text-muted-foreground truncate mt-0.5">{task.description}</p>}
                </div>
                {task.subject_name && <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground hidden sm:inline">{task.subject_name}</span>}
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${priorityColors[task.priority] || priorityColors.medium}`}>{task.priority}</span>
                {task.deadline && <span className="text-[10px] text-muted-foreground hidden sm:inline">{task.deadline}</span>}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(task)} className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(task.id)} className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card rounded-2xl border border-border/50 shadow-card p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-foreground">{editingId ? "Edit Task" : "Add Task"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Title</Label>
                  <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Task title" className="bg-secondary/30 border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Optional description" className="bg-secondary/30 border-border/50 min-h-[80px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Subject</Label>
                    <select value={form.subject_id} onChange={(e) => setForm((p) => ({ ...p, subject_id: e.target.value }))} className="w-full rounded-lg border border-border/50 bg-secondary/30 px-3 py-2 text-sm text-foreground">
                      <option value="">None</option>
                      {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Priority</Label>
                    <select value={form.priority} onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))} className="w-full rounded-lg border border-border/50 bg-secondary/30 px-3 py-2 text-sm text-foreground">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Deadline</Label>
                  <Input type="date" value={form.deadline} onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))} className="bg-secondary/30 border-border/50" />
                </div>
                <Button variant="hero" className="w-full rounded-xl" onClick={handleSave} disabled={addTask.isPending || updateTask.isPending}>
                  {(addTask.isPending || updateTask.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : editingId ? "Update" : "Add"} Task
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;
