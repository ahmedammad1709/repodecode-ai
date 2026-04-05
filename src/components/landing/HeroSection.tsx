import { Button } from "@/components/ui/button";
import { Github, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TypewriterTerminal } from "./TypewriterTerminal";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-forge-blue/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Now with AI-powered tech stack detection
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Your Repos Deserve{" "}
              <span className="text-gradient">Better READMEs</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              Connect GitHub. Let AI scan your code. Get a perfect README in seconds.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="hero" size="lg" asChild>
                <Link to="/login">
                  <Github className="h-5 w-5" />
                  Connect with GitHub
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg">
                <Play className="h-4 w-4" />
                See Live Demo
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Free to start • No credit card • 2,400+ repos documented
            </p>
          </motion.div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TypewriterTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
