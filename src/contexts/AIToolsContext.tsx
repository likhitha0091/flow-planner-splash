import { createContext, useContext, useState, useRef, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

const AI_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-study-tools`;

type Tab = "study-plan" | "summarize";

interface AIToolsContextType {
  active: Tab;
  setActive: (t: Tab) => void;
  loading: boolean;
  result: string;
  subject: string;
  setSubject: (s: string) => void;
  examDate: string;
  setExamDate: (d: string) => void;
  hoursPerDay: string;
  setHoursPerDay: (h: string) => void;
  notes: string;
  setNotes: (n: string) => void;
  pdfFile: File | null;
  setPdfFile: (f: File | null) => void;
  handleGenerate: () => Promise<void>;
  pdfFileName: string;
}

const AIToolsContext = createContext<AIToolsContextType | null>(null);

export const useAITools = () => {
  const ctx = useContext(AIToolsContext);
  if (!ctx) throw new Error("useAITools must be used within AIToolsProvider");
  return ctx;
};

async function streamAI(
  body: Record<string, unknown> | FormData,
  onDelta: (t: string) => void,
  onDone: () => void,
  signal?: AbortSignal,
) {
  const isFormData = body instanceof FormData;
  const resp = await fetch(AI_URL, {
    method: "POST",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: isFormData ? body : JSON.stringify(body),
    signal,
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }

  if (!resp.body) throw new Error("No response body");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}

export const AIToolsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [active, setActiveState] = useState<Tab>("study-plan");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const resultRef = useRef("");

  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("3");
  const [notes, setNotes] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");

  const setActive = (t: Tab) => {
    setActiveState(t);
    // Don't clear result - keep it visible
  };

  const setPdfFileWrapped = (f: File | null) => {
    setPdfFile(f);
    setPdfFileName(f?.name || "");
  };

  const handleGenerate = async () => {
    setResult("");
    resultRef.current = "";
    setLoading(true);
    abortRef.current = new AbortController();

    let body: Record<string, unknown> = { type: active };

    if (active === "study-plan") {
      if (!subject || !examDate) {
        toast({ title: "Missing fields", description: "Please fill in subject and exam date.", variant: "destructive" });
        setLoading(false);
        return;
      }
      body = { ...body, subject, examDate, hoursPerDay: Number(hoursPerDay) };
    } else if (active === "summarize") {
      if (!notes.trim() && !pdfFile) {
        toast({ title: "Missing input", description: "Please paste notes or upload a PDF.", variant: "destructive" });
        setLoading(false);
        return;
      }
      if (pdfFile) {
        const formData = new FormData();
        formData.append("type", "summarize");
        formData.append("file", pdfFile);
        formData.append("params", JSON.stringify({}));
        body = formData as any;
      } else {
        body = { ...body, notes };
      }
    }

    try {
      await streamAI(
        body,
        (delta) => {
          resultRef.current += delta;
          setResult(resultRef.current);
        },
        () => setLoading(false),
        abortRef.current.signal,
      );
    } catch (e: any) {
      if (e.name !== "AbortError") {
        toast({ title: "Error", description: e.message, variant: "destructive" });
      }
      setLoading(false);
    }
  };

  return (
    <AIToolsContext.Provider value={{
      active, setActive, loading, result,
      subject, setSubject, examDate, setExamDate, hoursPerDay, setHoursPerDay,
      notes, setNotes, pdfFile, setPdfFile: setPdfFileWrapped, handleGenerate, pdfFileName,
    }}>
      {children}
    </AIToolsContext.Provider>
  );
};
