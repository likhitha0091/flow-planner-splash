import { useRef } from "react";
import { motion } from "framer-motion";
import { Brain, BookOpen, Sparkles, Send, Loader2, Calendar, FileUp, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNotes } from "@/hooks/useNotes";
import { useAITools } from "@/contexts/AIToolsContext";

type Tab = "study-plan" | "summarize";

const tabs: { key: Tab; label: string; icon: React.ElementType; desc: string }[] = [
  { key: "study-plan", label: "Study Plan", icon: Calendar, desc: "Generate a smart daily study schedule" },
  { key: "summarize", label: "Summarizer", icon: BookOpen, desc: "Condense notes into key points" },
];

const AIToolsPage = () => {
  const { toast } = useToast();
  const { addNote } = useNotes();
  const {
    active, setActive, loading, result,
    subject, setSubject, examDate, setExamDate, hoursPerDay, setHoursPerDay,
    notes, setNotes, pdfFile, setPdfFile, handleGenerate, pdfFileName,
  } = useAITools();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderInputs = () => {
    if (active === "study-plan") {
      return (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Subject Name</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Organic Chemistry" className="bg-secondary/30 border-border/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Exam Date</Label>
              <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="bg-secondary/30 border-border/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Hours / Day</Label>
              <Input type="number" min="1" max="16" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} className="bg-secondary/30 border-border/50" />
            </div>
          </div>
        </div>
      );
    }
    if (active === "summarize") {
      return (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Upload PDF</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 20 * 1024 * 1024) {
                    toast({ title: "File too large", description: "Max 20MB allowed.", variant: "destructive" });
                    return;
                  }
                  setPdfFile(file);
                  setNotes("");
                }
              }}
            />
            {pdfFile ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                <FileUp className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground truncate flex-1">{pdfFile.name}</span>
                <button onClick={() => { setPdfFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-border/50 bg-secondary/20 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
              >
                <FileUp className="w-5 h-5" />
                <span className="text-sm">Click to upload PDF (max 20MB)</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-xs text-muted-foreground">or paste text</span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Paste Your Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => { setNotes(e.target.value); if (e.target.value) { setPdfFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; } }}
              placeholder="Paste your study material here..."
              className="bg-secondary/30 border-border/50 min-h-[120px] resize-none"
            />
          </div>
        </div>
      );
    }
    if (active === "productivity") {
      return (
        <p className="text-sm text-muted-foreground py-4">
          Click generate to analyze your tasks and study sessions and get personalized improvement tips.
        </p>
      );
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">AI Study Tools</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Powered by AI to supercharge your study sessions</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              active === tab.key
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-card/70 border border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-accent" />
          <h2 className="font-display font-bold text-foreground">
            {tabs.find((t) => t.key === active)?.desc}
          </h2>
        </div>

        {renderInputs()}

        <div className="mt-5">
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-xl gap-2 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </motion.div>

      {(result || loading) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">AI Response</h2>
            {loading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground ml-auto" />}
            {result && !loading && (
              <Button
                size="sm"
                variant="outline"
                className="ml-auto rounded-lg gap-1.5 text-xs"
                onClick={async () => {
                  const title = active === "study-plan"
                    ? `Study Plan: ${subject}`
                    : active === "summarize"
                    ? `Summary: ${pdfFileName || "Notes"}`
                    : "Productivity Advice";
                  try {
                    await addNote.mutateAsync({ title, content: result });
                    toast({ title: "Saved!", description: "AI response saved to your Notes." });
                  } catch {
                    toast({ title: "Error", description: "Failed to save note.", variant: "destructive" });
                  }
                }}
              >
                <Save className="w-3.5 h-3.5" />
                Save as Note
              </Button>
            )}
          </div>
          <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
            {result ? (
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{result}</div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIToolsPage;
