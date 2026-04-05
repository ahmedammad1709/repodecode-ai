import { useEffect, useState } from "react";

const lines = [
  "# 🚀 My Awesome Project",
  "",
  "![Build](https://img.shields.io/badge/build-passing-brightgreen)",
  "",
  "## Tech Stack",
  "- React 18 + TypeScript",
  "- Tailwind CSS + shadcn/ui",
  "- Supabase (Auth + DB)",
  "",
  "## Installation",
  "```bash",
  "git clone https://github.com/user/project",
  "cd project && npm install",
  "npm run dev",
  "```",
  "",
  "## Usage",
  "Import the main component and render it:",
];

export function TypewriterTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= lines.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 120);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="glass-card rounded-xl overflow-hidden shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-3 h-3 rounded-full bg-destructive/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-primary/70" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">README.md — Generated</span>
      </div>
      {/* Content */}
      <div className="p-5 font-mono text-sm leading-relaxed h-80 overflow-hidden">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${line.startsWith("#") ? "text-primary font-bold" : line.startsWith("-") || line.startsWith("```") ? "text-forge-blue" : "text-muted-foreground"}`}>
            {line || "\u00A0"}
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-blink" />
        )}
      </div>
    </div>
  );
}
