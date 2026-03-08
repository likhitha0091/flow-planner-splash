import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, BookOpen, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudySessions } from "@/hooks/useStudySessions";
import { useTimer } from "@/contexts/TimerContext";

const TimerPage = () => {
  const { sessions, isLoading } = useStudySessions();
  const { mode, setMode, timeLeft, running, setRunning, reset, progress, total } = useTimer();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const studySessions = sessions.filter((s) => s.type === "study");
  const totalMinutes = studySessions.reduce((a, s) => a + s.duration_minutes, 0);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Study Timer</h1>
        <p className="text-sm text-muted-foreground mt-1">Pomodoro technique · 25 min study, 5 min break</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-8 flex flex-col items-center">
          <div className="flex gap-2 mb-8">
            {(["study", "break"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${mode === m ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50"}`}>
                {m === "study" ? <BookOpen className="w-3.5 h-3.5" /> : <Coffee className="w-3.5 h-3.5" />}
                {m === "study" ? "Study" : "Break"}
              </button>
            ))}
          </div>
          <div className="relative w-64 h-64 mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
              <circle cx="130" cy="130" r="120" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
              <motion.circle cx="130" cy="130" r="120" fill="none" stroke={mode === "study" ? "hsl(var(--primary))" : "hsl(var(--accent))"} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} animate={{ strokeDashoffset }} transition={{ duration: 0.5 }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-5xl font-bold text-foreground tabular-nums">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
              <span className="text-xs text-muted-foreground mt-1">{mode === "study" ? "Focus Time" : "Break Time"}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="hero" size="lg" className="rounded-xl gap-2" onClick={() => setRunning(!running)}>
              {running ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> {timeLeft < total ? "Resume" : "Start"}</>}
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl gap-2" onClick={reset}><RotateCcw className="w-4 h-4" /> Reset</Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">Session History</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">{studySessions.length} sessions · {totalMinutes} min total</p>
          {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No sessions yet. Start your first timer!</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {sessions.slice(0, 20).map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/20">
                  {s.type === "study" ? <BookOpen className="w-4 h-4 text-primary shrink-0" /> : <Coffee className="w-4 h-4 text-accent shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{s.type === "study" ? "Study Session" : "Break"}</p>
                    <p className="text-[10px] text-muted-foreground">{s.duration_minutes} min</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{new Date(s.completed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TimerPage;
