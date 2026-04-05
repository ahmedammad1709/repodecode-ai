import { Layers, Wrench, Activity, GitBranch, History, LayoutTemplate } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Layers, title: "Auto Tech Stack Detection", desc: "Reads package.json, imports, and configs to identify your stack." },
  { icon: Wrench, title: "Smart Section Builder", desc: "Generates installation, usage, contributing, and license sections." },
  { icon: Activity, title: "README Health Score", desc: "Rates your existing READMEs and suggests improvements." },
  { icon: GitBranch, title: "One-Click Push to GitHub", desc: "Push your generated README directly — no copy-paste." },
  { icon: History, title: "Version History", desc: "Every generated README is saved with full version tracking." },
  { icon: LayoutTemplate, title: "Multi-Template Styles", desc: "Choose from minimal, detailed, startup, or open-source templates." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything your README needs</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Powerful features to make your documentation shine</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-6 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
