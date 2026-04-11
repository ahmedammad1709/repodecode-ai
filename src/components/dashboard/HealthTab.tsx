import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, X, AlertTriangle } from "lucide-react";

const sections = [
  { name: "Title", score: 100, status: "pass" },
  { name: "Description", score: 80, status: "pass" },
  { name: "Installation", score: 90, status: "pass" },
  { name: "Usage", score: 60, status: "warn" },
  { name: "Contributing", score: 0, status: "fail" },
  { name: "License", score: 100, status: "pass" },
  { name: "Screenshots", score: 0, status: "fail" },
  { name: "Badges", score: 70, status: "warn" },
];

const recommendations = [
  { text: "Add a Usage section with code examples", pts: "+15 pts" },
  { text: "Include a Contributing guide", pts: "+10 pts" },
  { text: "Add screenshots or demo GIF", pts: "+10 pts" },
  { text: "Include a license badge", pts: "+5 pts" },
];

interface HealthTabProps {
  userId: string;
  userName: string;
  userEmail: string;
}

export function HealthTab({ userId }: HealthTabProps) {
  const overallScore = 72;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">README Health Score</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score circle */}
        <div className="glass-card p-8 rounded-xl flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${overallScore * 2.64} 264`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{overallScore}</span>
            </div>
          </div>
          <span className="text-sm text-primary font-medium">Average</span>
          <p className="text-xs text-muted-foreground mt-1">react-dashboard</p>
        </div>

        {/* Section breakdown */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-sm">Section Breakdown</h3>
          <div className="space-y-3">
            {sections.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                {s.status === "pass" ? <Check className="h-4 w-4 text-primary" /> : s.status === "warn" ? <AlertTriangle className="h-4 w-4 text-yellow-500" /> : <X className="h-4 w-4 text-destructive" />}
                <span className="text-sm flex-1">{s.name}</span>
                <Progress value={s.score} className="w-20 h-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-sm">AI Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="text-sm">{r.text}</p>
                  <span className="text-xs text-primary">{r.pts}</span>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 text-xs">Add</Button>
              </div>
            ))}
          </div>
          <Button variant="hero" className="w-full mt-4" size="sm">Auto-Fix All</Button>
        </div>
      </div>
    </div>
  );
}
