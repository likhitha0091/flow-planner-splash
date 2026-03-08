import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Pencil, Trash2, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Subject {
  id: string;
  name: string;
  color: string;
  tasks: number;
  completed: number;
}

const COLORS = [
  "bg-primary", "bg-accent", "bg-purple-500", "bg-rose-500",
  "bg-amber-500", "bg-emerald-500", "bg-sky-500", "bg-orange-500",
];

const initialSubjects: Subject[] = [
  { id: "1", name: "Mathematics", color: "bg-primary", tasks: 12, completed: 8 },
  { id: "2", name: "Physics", color: "bg-accent", tasks: 8, completed: 5 },
  { id: "3", name: "Computer Science", color: "bg-purple-500", tasks: 15, completed: 13 },
  { id: "4", name: "Biology", color: "bg-emerald-500", tasks: 10, completed: 4 },
  { id: "5", name: "English Literature", color: "bg-rose-500", tasks: 6, completed: 3 },
];

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const { toast } = useToast();

  const openAdd = () => {
    setEditingSubject(null);
    setName("");
    setSelectedColor(COLORS[0]);
    setModalOpen(true);
  };

  const openEdit = (s: Subject) => {
    setEditingSubject(s);
    setName(s.name);
    setSelectedColor(s.color);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editingSubject) {
      setSubjects((prev) => prev.map((s) => s.id === editingSubject.id ? { ...s, name, color: selectedColor } : s));
      toast({ title: "Subject updated" });
    } else {
      setSubjects((prev) => [...prev, { id: Date.now().toString(), name, color: selectedColor, tasks: 0, completed: 0 }]);
      toast({ title: "Subject added" });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    toast({ title: "Subject deleted" });
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Subjects</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your study subjects</p>
        </div>
        <Button variant="hero" className="rounded-xl gap-2" onClick={openAdd}>
          <Plus className="w-4 h-4" /> Add Subject
        </Button>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject, i) => {
          const pct = subject.tasks > 0 ? Math.round((subject.completed / subject.tasks) * 100) : 0;
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-shadow p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${subject.color} flex items-center justify-center`}>
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(subject)} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(subject.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">{subject.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{subject.tasks} tasks · {subject.completed} completed</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div className={`h-full rounded-full ${subject.color}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: "easeOut" }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card rounded-2xl border border-border/50 shadow-card p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-foreground">{editingSubject ? "Edit Subject" : "Add Subject"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Subject Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mathematics" className="bg-secondary/30 border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Color</Label>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.map((c) => (
                      <button key={c} onClick={() => setSelectedColor(c)} className={`w-8 h-8 rounded-lg ${c} transition-all ${selectedColor === c ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-110" : "hover:scale-105"}`} />
                    ))}
                  </div>
                </div>
                <Button variant="hero" className="w-full rounded-xl" onClick={handleSave}>
                  {editingSubject ? "Update" : "Add"} Subject
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubjectsPage;
