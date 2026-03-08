import { BookOpen } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
          <BookOpen className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-sm text-foreground">StudyFlow AI</span>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 StudyFlow AI. Built for students, powered by intelligence.
      </p>
    </div>
  </footer>
);

export default Footer;
