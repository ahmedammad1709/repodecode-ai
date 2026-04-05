import { Button } from "@/components/ui/button";
import { Sparkles, Download, GitBranch } from "lucide-react";

const sampleMd = `# 🚀 react-dashboard

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Overview
A modern, responsive admin dashboard built with React 18 and TypeScript.

## Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **State:** Zustand
- **Charts:** Recharts
- **Backend:** Supabase

## Installation

\`\`\`bash
git clone https://github.com/user/react-dashboard
cd react-dashboard
npm install
npm run dev
\`\`\`

## Usage
Navigate to \`http://localhost:5173\` after starting the dev server.

## Contributing
PRs are welcome! Please read CONTRIBUTING.md first.

## License
MIT © 2025`;

export function EditorTab() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">README Editor</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Sparkles className="h-4 w-4 mr-1" /> AI Improve</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Download</Button>
          <Button variant="hero" size="sm"><GitBranch className="h-4 w-4 mr-1" /> Push to GitHub</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Editor */}
        <div className="glass-card rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground font-mono">EDIT — README.md</div>
          <textarea
            className="flex-1 bg-transparent p-4 font-mono text-sm text-foreground resize-none outline-none leading-relaxed min-h-[500px]"
            defaultValue={sampleMd}
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="glass-card rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground font-mono">PREVIEW</div>
          <div className="flex-1 p-4 overflow-auto prose prose-invert prose-sm max-w-none min-h-[500px]">
            <h1>🚀 react-dashboard</h1>
            <p><img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build" /> <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" /></p>
            <h2>Overview</h2>
            <p>A modern, responsive admin dashboard built with React 18 and TypeScript.</p>
            <h2>Tech Stack</h2>
            <ul>
              <li><strong>Frontend:</strong> React 18, TypeScript, Tailwind CSS</li>
              <li><strong>State:</strong> Zustand</li>
              <li><strong>Charts:</strong> Recharts</li>
              <li><strong>Backend:</strong> Supabase</li>
            </ul>
            <h2>Installation</h2>
            <pre><code>git clone https://github.com/user/react-dashboard{"\n"}cd react-dashboard{"\n"}npm install{"\n"}npm run dev</code></pre>
            <h2>Contributing</h2>
            <p>PRs are welcome! Please read CONTRIBUTING.md first.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>342 words</span>
        <span>8 sections</span>
        <span>Health: <span className="text-primary font-medium">92/100</span></span>
      </div>
    </div>
  );
}
