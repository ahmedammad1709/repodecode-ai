import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getUserRepositories } from "@/lib/supabase";

interface ReposTabProps {
  userId: string;
  userName: string;
  userEmail: string;
}

const statusMap = {
  "good": { label: "Good", className: "bg-primary/10 text-primary border-primary/30" },
  "needs-work": { label: "Needs Work", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" },
  "missing": { label: "Missing", className: "bg-destructive/10 text-destructive border-destructive/30" },
};

const getRepoStatus = (health: number): "good" | "needs-work" | "missing" => {
  if (health >= 70) return "good";
  if (health >= 40) return "needs-work";
  return "missing";
};

const getLanguageColor = (lang: string | null): string => {
  const colors: Record<string, string> = {
    "TypeScript": "bg-[hsl(200,80%,55%)]",
    "JavaScript": "bg-[hsl(50,80%,55%)]",
    "Python": "bg-[hsl(40,80%,50%)]",
    "Go": "bg-[hsl(187,60%,55%)]",
    "Rust": "bg-[hsl(15,100%,60%)]",
    "Java": "bg-[hsl(25,70%,55%)]",
    "C++": "bg-[hsl(230,80%,60%)]",
    "PHP": "bg-[hsl(270,70%,60%)]",
    "Ruby": "bg-[hsl(0,100%,50%)]",
  };
  return colors[lang || "TypeScript"] || "bg-[hsl(200,80%,55%)]";
};

export function ReposTab({ userId }: ReposTabProps) {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data, error } = await getUserRepositories(userId);
        if (!error && data) {
          setRepos(data);
        }
      } catch (err) {
        console.error("Error fetching repos:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRepos();
    }
  }, [userId]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex gap-2 items-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading repositories...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Repositories</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search repos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-secondary/50 border-border h-9 text-sm"
          />
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {repos.length === 0 ? "No repositories connected yet" : "No matching repositories found"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRepos.map((repo) => {
            const health = repo.health_score || 0;
            const status = getRepoStatus(health);
            const st = statusMap[status];

            return (
              <div key={repo.id} className="glass-card-hover p-5 rounded-xl flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-sm truncate">{repo.name}</h3>
                    <Badge variant="outline" className={`text-[10px] ${st.className}`}>
                      {st.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {repo.description || "No description provided"}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                      {repo.language || "Unknown"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3" /> {repo.stars || 0}
                    </span>
                  </div>
                </div>

                <div className="w-24 shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Health</span>
                    <span className="text-xs font-medium">{health}%</span>
                  </div>
                  <Progress value={health} className="h-1.5" />
                </div>

                <Button
                  variant={status === "good" ? "outline" : "hero"}
                  size="sm"
                  className="shrink-0"
                >
                  {status === "good" ? "Regenerate" : "Generate"}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
