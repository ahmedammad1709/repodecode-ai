import { Plug, BrainCircuit, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Plug, title: "Connect GitHub", desc: "Link your GitHub account in one click. We'll fetch your repositories securely." },
  { icon: BrainCircuit, title: "AI Scans Your Repo", desc: "Our AI reads your code, dependencies, and structure to understand your project." },
  { icon: FileCheck, title: "README Generated", desc: "Get a beautifully structured, comprehensive README ready to push — instantly." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Three simple steps to a perfect README</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Dashed connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px border-t-2 border-dashed border-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card-hover p-8 text-center relative"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5 text-primary">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="absolute top-4 right-4 text-xs font-mono text-muted-foreground">0{i + 1}</span>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
