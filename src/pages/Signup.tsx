import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RepoDecodeIcon } from "@/components/RepoDecodeIcon";
import { motion } from "framer-motion";
import { requestSignupOtp, signInWithGitHub, verifySignupOtpAndCreateProfile } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const otpLength = 8;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!agreeTerms) {
      newErrors.terms = "You must agree to the Terms of Service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpSent && !validateForm()) {
      return;
    }

    if (otpSent) {
      if (!otp.trim()) {
        setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
        return;
      }
      if (!new RegExp(`^\\d{${otpLength}}$`).test(otp.trim())) {
        setErrors((prev) => ({ ...prev, otp: `OTP must be ${otpLength} digits` }));
        return;
      }
    }

    setLoading(true);
    try {
      if (!otpSent) {
        const { error } = await requestSignupOtp(email);

        if (error) {
          toast({
            title: "Failed to send OTP",
            description: error.message || "Could not send verification code",
            variant: "destructive",
          });
          return;
        }

        setOtpSent(true);
        setErrors({});
        toast({
          title: "OTP sent",
          description: `Check your email for the ${otpLength}-digit verification code`,
        });
      } else {
        const { error } = await verifySignupOtpAndCreateProfile(email, otp.trim(), password, name);

        if (error) {
          toast({
            title: "Signup failed",
            description: error.message || "Invalid OTP or account setup failed",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Account created successfully!",
          description: "Redirecting to dashboard...",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGitHub();
      if (error) {
        toast({
          title: "GitHub signup failed",
          description: error.message || "An error occurred",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-4 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold mb-6">
            <RepoDecodeIcon className="h-5 w-5" />
            RepoDecodeAI
          </Link>
          <h1 className="text-2xl font-bold mb-2">Start generating READMEs</h1>
          <p className="text-sm text-muted-foreground">Create your RepoDecodeAI account</p>
        </div>

        <div className="glass-card p-8 rounded-xl">
          <Button
            variant="hero"
            className="w-full mb-6"
            size="lg"
            onClick={handleGitHubSignup}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <RepoDecodeIcon className="h-5 w-5" />}
            Continue with GitHub
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs text-muted-foreground">or</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={otpSent}
                className={`mt-1 bg-secondary/50 border-border ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={otpSent}
                className={`mt-1 bg-secondary/50 border-border ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={otpSent}
                className={`mt-1 bg-secondary/50 border-border ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                Min 8 chars, 1 uppercase, 1 number
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={otpSent}
                className={`mt-1 bg-secondary/50 border-border ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {otpSent && (
              <div>
                <Label htmlFor="otp" className="text-sm">
                  Email OTP
                </Label>
                <Input
                  id="otp"
                  inputMode="numeric"
                  maxLength={otpLength}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    if (errors.otp) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.otp;
                        return next;
                      });
                    }
                  }}
                  placeholder={`Enter ${otpLength}-digit OTP`}
                  className={`mt-1 bg-secondary/50 border-border tracking-[0.3em] ${errors.otp ? "border-red-500" : ""}`}
                />
                {errors.otp && <p className="text-xs text-red-500 mt-1">{errors.otp}</p>}
                <p className="text-xs text-muted-foreground mt-1">We sent the OTP to {email}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                disabled={otpSent}
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>
              </label>
            </div>
            {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}

            <Button variant="outline" className="w-full" disabled={loading} type="submit">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {otpSent ? "Verifying OTP..." : "Sending OTP..."}
                </>
              ) : (
                otpSent ? "Verify OTP & Create Account" : "Create Account"
              )}
            </Button>

            {otpSent && (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  try {
                    const { error } = await requestSignupOtp(email);
                    if (error) {
                      toast({
                        title: "Failed to resend OTP",
                        description: error.message,
                        variant: "destructive",
                      });
                    } else {
                      toast({
                        title: "OTP resent",
                        description: "Please check your email inbox",
                      });
                    }
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Resend OTP
              </Button>
            )}
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
