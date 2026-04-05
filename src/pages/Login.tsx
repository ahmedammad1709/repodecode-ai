import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Github } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-4 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold mb-6">
            <Zap className="h-5 w-5 text-primary" />
            ReadForge
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome back to ReadForge</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="glass-card p-8 rounded-xl">
          <Button variant="hero" className="w-full mb-6" size="lg">
            <Github className="h-5 w-5" />
            Continue with GitHub
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or</span></div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 bg-secondary/50 border-border" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 bg-secondary/50 border-border" />
            </div>
            <div className="text-right">
              <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <Button variant="outline" className="w-full">Sign In</Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
