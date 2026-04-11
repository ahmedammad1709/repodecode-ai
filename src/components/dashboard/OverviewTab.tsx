import { useEffect, useState } from "react";
import { GitBranch, FileText, Activity, TrendingUp, Sparkles, ArrowUpRight, FileEdit, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getUserRepositories, getUserStats } from "@/lib/supabase";

interface OverviewTabProps {
  userId: string;
  userName: string;
  userEmail: string;
}

export function OverviewTab({ userId, userName }: OverviewTabProps) {
  const [stats, setStats] = useState<any[]>([]);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user stats
        const { data: statsData } = await getUserStats(userId);
        if (statsData) {
          setStats([
            { label: "Repos Connected", value: statsData.totalRepos, change: "+0", icon: GitBranch },
            { label: "READMEs Generated", value: statsData.totalReadmes, change: "+0", icon: FileText },
            { label: "Avg Health Score", value: `${statsData.avgHealthScore}%`, change: "+0%", icon: Activity },
            { label: "This Month Usage", value: "0/5", change: "0%", icon: TrendingUp },
          ]);
        }

        // Fetch repositories
        const { data: reposData } = await getUserRepositories(userId);
        if (reposData && reposData.length > 0) {
          setRepos(reposData.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching overview data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex gap-2 items-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading overview...</span>
        </div>
      </div>
    );
  }

  const defaultStats = [
    { label: "Repos Connected", value: "0", change: "+0", icon: GitBranch },
    { label: "READMEs Generated", value: "0", change: "+0", icon: FileText },
    { label: "Avg Health Score", value: "0%", change: "+0%", icon: Activity },
    { label: "This Month Usage", value: "0/5", change: "0%", icon: TrendingUp },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/20 to-[#4493f8]/20 rounded-xl blur" />
        <div className="relative bg-[#161b22] border border-[#00ff88]/30 rounded-xl p-8">
          <h1 className="text-4xl font-bold text-white mb-2">Good morning, {userName} 👋</h1>
          <p className="text-[#8b949e]">You have {repos.length} repositories connected</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-[#161b22] border-[#30363d] p-6 hover:border-[#00ff88]/50 transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-[#00ff88]/10 group-hover:bg-[#00ff88]/20 transition-all">
                    <Icon className="h-5 w-5 text-[#00ff88]" />
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUpRight className="h-4 w-4 text-[#00ff88]" />
                    <span className="text-xs font-bold text-[#00ff88]">{stat.change}</span>
                  </div>
                </div>
                <p className="text-[#8b949e] text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Repos */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="bg-[#161b22] border-[#30363d] p-6">
            <h2 className="text-xl font-bold text-white mb-6">Your Repositories</h2>
            <div className="space-y-3">
              {repos.length > 0 ? (
                repos.map((repo, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-[#00ff88]/30 transition-all cursor-pointer group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#00ff88]/20 to-[#4493f8]/20 flex items-center justify-center group-hover:from-[#00ff88]/30 group-hover:to-[#4493f8]/30 transition-all flex-shrink-0">
                      <GitBranch className="h-5 w-5 text-[#00ff88]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{repo.name}</p>
                      <p className="text-[#8b949e] text-sm">{repo.description || "No description"}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[#4493f8] text-sm font-bold">⭐ {repo.stars || 0}</p>
                      <p className="text-[#8b949e] text-xs">{repo.language || "—"}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#8b949e] text-center py-6">No repositories connected yet</p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Side CTA */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
          <Button className="w-full h-12 bg-[#00ff88] hover:bg-[#00ff88]/90 text-[#0d1117] font-bold text-base group">
            <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            Generate README
          </Button>

          <Card className="bg-[#161b22] border-[#30363d] p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4493f8] animate-pulse" />
              Getting Started
            </h3>
            <div className="space-y-3">
              <p className="text-[#8b949e] text-sm">Connect your GitHub repositories and generate professional READMEs powered by AI.</p>
              <Button variant="outline" className="w-full text-sm">Connect GitHub</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
