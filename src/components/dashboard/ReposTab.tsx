import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const repos = [
  { name: "react-dashboard", desc: "A modern admin dashboard built with React", lang: "TypeScript", langColor: "bg-forge-blue", stars: 124, status: "good" as const, health: 92 },
  { name: "api-gateway", desc: "Microservices API gateway with rate limiting", lang: "Go", langColor: "bg-[hsl(187,60%,55%)]", stars: 89, status: "needs-work" as const, health: 54 },
  { name: "mobile-app", desc: "Cross-platform mobile app", lang: "Dart", langColor: "bg-[hsl(200,80%,55%)]", stars: 45, status: "missing" as const, health: 12 },
  { name: "design-system", desc: "Company design system components", lang: "TypeScript", langColor: "bg-forge-blue", stars: 210, status: "good" as const, health: 88 },
  { name: "ml-pipeline", desc: "Machine learning data pipeline", lang: "Python", langColor: "bg-[hsl(50,80%,55%)]", stars: 67, status: "needs-work" as const, health: 41 },
];

const statusMap = {
  "good": { label: "Good", className: "bg-primary/10 text-primary border-primary/30" },
  "needs-work": { label: "Needs Work", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" },
  "missing": { label: "Missing", className: "bg-destructive/10 text-destructive border-destructive/30" },
};

export function ReposTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Repositories</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search repos..." className="pl-9 bg-secondary/50 border-border h-9 text-sm" />
        </div>
      </div>

      <div className="space-y-3">
        {repos.map((repo) => {
          const st = statusMap[repo.status];
          return (
            <div key={repo.name} className="glass-card-hover p-5 rounded-xl flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-sm truncate">{repo.name}</h3>
                  <Badge variant="outline" className={`text-[10px] ${st.className}`}>{st.label}</Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{repo.desc}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                    {repo.lang}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3" /> {repo.stars}
                  </span>
                </div>
              </div>

              <div className="w-24 shrink-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Health</span>
                  <span className="text-xs font-medium">{repo.health}%</span>
                </div>
                <Progress value={repo.health} className="h-1.5" />
              </div>

              <Button variant={repo.status === "good" ? "outline" : "hero"} size="sm" className="shrink-0">
                {repo.status === "good" ? "Regenerate" : "Generate"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
