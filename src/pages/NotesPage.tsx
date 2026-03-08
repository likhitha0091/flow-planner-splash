import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, FileText, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNotes } from "@/hooks/useNotes";
import { useSubjects } from "@/hooks/useSubjects";

const NotesPage = () => {
  const { notes, isLoading, addNote, updateNote, deleteNote } = useNotes();
  const { subjects } = useSubjects();
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", subject_id: "" });
  const { toast } = useToast();

  const filtered = notes.filter((n) => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    const matchSubject = !filterSubject || n.subject_id === filterSubject;
    return matchSearch && matchSubject;
  });

  const openAdd = () => { setEditingId(null); setForm({ title: "", content: "", subject_id: "" }); setModalOpen(true); };
  const openEdit = (n: any) => { setEditingId(n.id); setForm({ title: n.title, content: n.content || "", subject_id: n.subject_id || "" }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    if (editingId) {
      await updateNote.mutateAsync({ id: editingId, title: form.title, content: form.content, subject_id: form.subject_id || null });
      toast({ title: "Note updated" });
    } else {
      await addNote.mutateAsync({ title: form.title, content: form.content, subject_id: form.subject_id || null });
      toast({ title: "Note created" });
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteNote.mutateAsync(id);
    toast({ title: "Note deleted" });
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-sm text-muted-foreground mt-1">{notes.length} notes</p>
        </div>
        <Button variant="hero" className="rounded-xl gap-2" onClick={openAdd}><Plus className="w-4 h-4" /> New Note</Button>
      </motion.div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." className="pl-10 bg-secondary/30 border-border/50" />
        </div>
        <div className="flex gap-1 flex-wrap">
          <button onClick={() => setFilterSubject(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!filterSubject ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50"}`}>All</button>
          {subjects.map((s) => (
            <button key={s.id} onClick={() => setFilterSubject(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterSubject === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50"}`}>{s.name}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">No notes found</p>
          <p className="text-sm mt-1">{notes.length === 0 ? "Create your first note" : "Try a different search"}</p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((note, i) => (
              <motion.div key={note.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-shadow p-5 group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-foreground text-sm">{note.title}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(note)} className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground"><Pencil className="w-3 h-3" /></button>
                    <button onClick={() => handleDelete(note.id)} className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{note.content || "No content"}</p>
                <div className="flex items-center justify-between">
                  {note.subject_name && <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{note.subject_name}</span>}
                  <span className="text-[10px] text-muted-foreground">{new Date(note.updated_at).toLocaleDateString()}</span>
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
                <h2 className="font-display font-bold text-foreground">{editingId ? "Edit Note" : "New Note"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Title</Label>
                  <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Note title" className="bg-secondary/30 border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Content</Label>
                  <Textarea value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} placeholder="Write your note..." className="bg-secondary/30 border-border/50 min-h-[120px]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Subject</Label>
                  <select value={form.subject_id} onChange={(e) => setForm((p) => ({ ...p, subject_id: e.target.value }))} className="w-full rounded-lg border border-border/50 bg-secondary/30 px-3 py-2 text-sm text-foreground">
                    <option value="">None</option>
                    {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <Button variant="hero" className="w-full rounded-xl" onClick={handleSave} disabled={addNote.isPending || updateNote.isPending}>
                  {(addNote.isPending || updateNote.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : editingId ? "Update" : "Create"} Note
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesPage;
