import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Flag } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface CalTask {
  title: string;
  subject: string;
  priority: "low" | "medium" | "high";
}

const tasksByDate: Record<string, CalTask[]> = {
  "2026-03-09": [{ title: "Complete Calculus Assignment", subject: "Math", priority: "high" }],
  "2026-03-10": [{ title: "Write Essay on AI Ethics", subject: "CS", priority: "high" }, { title: "Physics Lab Report", subject: "Physics", priority: "medium" }],
  "2026-03-11": [{ title: "Prepare Biology Lab Notes", subject: "Biology", priority: "medium" }],
  "2026-03-12": [{ title: "Solve Practice Problems Set 3", subject: "Math", priority: "low" }],
  "2026-03-15": [{ title: "CS Quiz Preparation", subject: "CS", priority: "high" }],
  "2026-03-18": [{ title: "English Essay Draft", subject: "English", priority: "medium" }],
  "2026-03-22": [{ title: "Math Midterm", subject: "Math", priority: "high" }],
};

const priorityDot: Record<string, string> = { low: "bg-emerald-500", medium: "bg-amber-500", high: "bg-rose-500" };

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 8));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  const dateKey = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const today = new Date();
  const isToday = (d: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

  const selectedTasks = selectedDate ? tasksByDate[selectedDate] || [] : [];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Calendar</h1>
        <p className="text-sm text-muted-foreground mt-1">View your tasks and deadlines</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-foreground">{MONTHS[month]} {year}</h2>
            <div className="flex gap-1">
              <button onClick={prev} className="p-2 rounded-xl hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={next} className="p-2 rounded-xl hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-medium text-muted-foreground py-2">{d}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const key = dateKey(day);
              const hasTasks = !!tasksByDate[key];
              const isSelected = selectedDate === key;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(isSelected ? null : key)}
                  className={`relative aspect-square rounded-xl text-sm flex flex-col items-center justify-center transition-all duration-200 ${
                    isSelected ? "bg-primary text-primary-foreground shadow-glow" :
                    isToday(day) ? "bg-primary/10 text-primary font-bold" :
                    "text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {day}
                  {hasTasks && (
                    <div className="flex gap-0.5 mt-0.5">
                      {tasksByDate[key].slice(0, 3).map((t, ti) => (
                        <span key={ti} className={`w-1 h-1 rounded-full ${isSelected ? "bg-primary-foreground/70" : priorityDot[t.priority]}`} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">{selectedDate || "Select a date"}</h2>
          </div>
          <AnimatePresence mode="wait">
            {selectedDate ? (
              <motion.div key={selectedDate} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-2">
                {selectedTasks.length > 0 ? selectedTasks.map((t, i) => (
                  <div key={i} className="p-3 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${priorityDot[t.priority]}`} />
                      <span className="text-sm font-medium text-foreground">{t.title}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground ml-4">{t.subject}</span>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No tasks on this date</p>
                )}
              </motion.div>
            ) : (
              <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground text-center py-8">
                Click a date to view tasks
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarPage;
