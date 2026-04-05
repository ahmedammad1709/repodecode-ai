import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function LivePreview() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">See the Difference</h2>
          <p className="text-muted-foreground mb-8">From empty to excellent in seconds</p>

          <div className="inline-flex rounded-lg border border-border overflow-hidden">
            <button onClick={() => setShowAfter(false)} className={`px-6 py-2 text-sm font-medium transition-colors ${!showAfter ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              Before
            </button>
            <button onClick={() => setShowAfter(true)} className={`px-6 py-2 text-sm font-medium transition-colors ${showAfter ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              After
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">README.md</span>
              <Badge variant={showAfter ? "default" : "destructive"} className="ml-auto text-[10px]">
                {showAfter ? "Excellent" : "Poor"}
              </Badge>
            </div>

            <div className="p-6 font-mono text-sm min-h-[320px] transition-all">
              {!showAfter ? (
                <div className="text-muted-foreground/50 space-y-2">
                  <p># my-project</p>
                  <p className="opacity-50">TODO: Add description</p>
                  <br />
                  <p className="opacity-30">Nothing else here...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-primary font-bold text-lg"># 🚀 My Awesome Project</p>
                  <p className="text-forge-blue text-xs">![Build](passing) ![License](MIT) ![TypeScript](100%)</p>
                  <br />
                  <p className="text-foreground">A modern full-stack web application built with React and Supabase.</p>
                  <br />
                  <p className="text-primary font-bold">## ⚡ Tech Stack</p>
                  <p className="text-muted-foreground">• React 18 • TypeScript • Tailwind CSS • Supabase</p>
                  <br />
                  <p className="text-primary font-bold">## 📦 Installation</p>
                  <p className="text-forge-blue">```bash</p>
                  <p className="text-muted-foreground">npm install && npm run dev</p>
                  <p className="text-forge-blue">```</p>
                  <br />
                  <p className="text-primary font-bold">## 🤝 Contributing</p>
                  <p className="text-muted-foreground">PRs welcome! See CONTRIBUTING.md</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
