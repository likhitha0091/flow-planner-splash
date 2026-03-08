import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { useStudySessions } from "@/hooks/useStudySessions";

const STUDY_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

interface TimerContextType {
  mode: "study" | "break";
  setMode: (m: "study" | "break") => void;
  timeLeft: number;
  running: boolean;
  setRunning: (r: boolean) => void;
  reset: () => void;
  progress: number;
  total: number;
}

const TimerContext = createContext<TimerContextType | null>(null);

export const useTimer = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error("useTimer must be used within TimerProvider");
  return ctx;
};

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const { addSession } = useStudySessions();
  const [mode, setModeState] = useState<"study" | "break">("study");
  const [timeLeft, setTimeLeft] = useState(STUDY_DURATION);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const total = mode === "study" ? STUDY_DURATION : BREAK_DURATION;
  const progress = ((total - timeLeft) / total) * 100;

  const completeSession = useCallback(() => {
    addSession.mutate({ type: mode, duration_minutes: mode === "study" ? 25 : 5 });
    const nextMode = mode === "study" ? "break" : "study";
    setModeState(nextMode);
    setTimeLeft(nextMode === "study" ? STUDY_DURATION : BREAK_DURATION);
    setRunning(false);
  }, [mode, addSession]);

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { completeSession(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, completeSession]);

  const setMode = (m: "study" | "break") => {
    if (!running) {
      setModeState(m);
      setTimeLeft(m === "study" ? STUDY_DURATION : BREAK_DURATION);
    }
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(mode === "study" ? STUDY_DURATION : BREAK_DURATION);
  };

  return (
    <TimerContext.Provider value={{ mode, setMode, timeLeft, running, setRunning, reset, progress, total }}>
      {children}
    </TimerContext.Provider>
  );
};
