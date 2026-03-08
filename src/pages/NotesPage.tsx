import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Pencil, Trash2, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  updatedAt: string;
}

const initialNotes: Note[] = [
  { id: "1", title: "Calculus Formulas", content: "Key integration formulas and derivatives. Remember the chain rule and product rule...", subject: "Mathematics", updatedAt: "2026-03-08" },
  { id: "2", title: "Wave Mechanics Notes", content: "Properties of waves, interference patterns, Doppler effect summary...", subject: "Physics", updatedAt: "2026-03-07" },
  { id: "3", title: "Data Structures Overview", content: "Trees, graphs, hash tables. Time complexity comparisons for common operations...", subject: "Computer Science", updatedAt: "2026-03-06" },
  { id: "4", title: "Cell Biology Summary", content: "Mitosis vs meiosis, cell organelles and their functions, membrane transport...", subject: "Biology", updatedAt: "2026-03-05" },
  { id: "5", title: "Algorithm Patterns", content: "Two pointers, sliding window, BFS/DFS, dynamic programming patterns...", subject: "Computer Science", updatedAt: "2026-03-04" },
];

const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary",
  Physics: "bg-accent",
  "Computer Science": "bg-purple-500",
  Biology: "bg-emerald-500",
};

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [form, setForm] = useState({ title: "", content: "", subject: "" });
  const { toast } = useToast();

  const subjects = ["all", ...new Set(notes.map((n) => n.subject))];
  const filtered = notes.filter((n) =>
    (filterSubject === "all" || n.subject === filterSubject) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd = () => { setEditingNote(null); setForm({ title: "", content: "", subject: "" }); setModalOpen(true); };
  const openEdit = (n: Note) => { setEditingNote(n); setForm({ title: n.title, content: n.content, subject: n.subject }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const today = new Date().toISOString().split("T")[0];
    if (editingNote) {
      setNotes((prev) => prev.map((n) => n.id === editingNote.id ? { ...n, ...form, updatedAt: today } : n));
      toast({ title: "Note updated" });
    } else {
      setNotes((prev) => [{ id: Date.now().toString(), ...form, updatedAt: today }, ...prev]);
      toast({ title: "Note created" });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setNotes((prev) => prev.filter((n) => n.id !== id)); toast({ title: "Note deleted" }); };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-sm text-muted-foreground mt-1">{notes.length} notes</p>
        </div>
        <Button variant="hero" className="rounded-xl gap-2" onClick={openAdd}><Plus className="w-4 h-4" /> New Note</Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." className="pl-10 bg-secondary/30 border-border/50" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {subjects.map((s) => (
            <button key={s} onClick={() => setFilterSubject(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterSubject === s ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50"}`}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((note, i) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-shadow p-5 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-2 h-8 rounded-full ${subjectColors[note.subject] || "bg-muted"}`} />
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(note)} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(note.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h3 className="font-display font-bold text-foreground text-sm mb-1">{note.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{note.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{note.subject}</span>
                <span className="text-[10px] text-muted-foreground">{note.updatedAt}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card rounded-2xl border border-border/50 shadow-card p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-foreground">{editingNote ? "Edit Note" : "New Note"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Note title" className="bg-secondary/30 border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Subject</Label>
                  <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="bg-secondary/30 border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Content</Label>
                  <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write your note..." className="bg-secondary/30 border-border/50 min-h-[150px]" />
                </div>
                <Button variant="hero" className="w-full rounded-xl" onClick={handleSave}>{editingNote ? "Update" : "Create"} Note</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesPage;
