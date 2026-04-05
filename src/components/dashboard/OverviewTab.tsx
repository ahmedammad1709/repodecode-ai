import { GitBranch, FileText, Activity, TrendingUp, Sparkles, ArrowUpRight, FileEdit, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  { label: "Repos Connected", value: "12", change: "+2", icon: GitBranch },
  { label: "READMEs Generated", value: "34", change: "+5", icon: FileText },
  { label: "Avg Health Score", value: "78%", change: "+3%", icon: Activity },
  { label: "This Month Usage", value: "3/5", change: "60%", icon: TrendingUp },
];

const recentActivity = [
  { repo: "react-dashboard", action: "README generated", time: "2 hours ago", version: "v2" },
  { repo: "api-gateway", action: "Health score updated", time: "5 hours ago", version: "v1" },
  { repo: "mobile-app", action: "README pushed to GitHub", time: "1 day ago", version: "v3" },
  { repo: "design-system", action: "Template changed", time: "2 days ago", version: "v1" },
];

export function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/20 to-[#4493f8]/20 rounded-xl blur" />
        <div className="relative bg-[#161b22] border border-[#00ff88]/30 rounded-xl p-8">
          <h1 className="text-4xl font-bold text-white mb-2">Good morning, Ammad 👋</h1>
          <p className="text-[#8b949e]">You have 3 repositories needing attention</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
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
        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="bg-[#161b22] border-[#30363d] p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-[#00ff88]/30 transition-all cursor-pointer group"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#00ff88]/20 to-[#4493f8]/20 flex items-center justify-center group-hover:from-[#00ff88]/30 group-hover:to-[#4493f8]/30 transition-all flex-shrink-0">
                    <FileEdit className="h-5 w-5 text-[#00ff88]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{activity.repo}</p>
                    <p className="text-[#8b949e] text-sm">{activity.action}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[#4493f8] text-sm font-bold">{activity.version}</p>
                    <p className="text-[#8b949e] text-xs">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
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
              <span className="h-2 w-2 rounded-full bg-[#f85149] animate-pulse" />
              Attention Needed
            </h3>
            <div className="space-y-2">
              {['project-alpha (45%)', 'async-lib (52%)'].map((repo) => (
                <motion.div
                  key={repo}
                  whileHover={{ x: 4 }}
                  className="p-3 bg-[#0d1117] rounded-lg flex justify-between items-center hover:bg-[#161b22] transition-colors cursor-pointer group border border-[#30363d] hover:border-[#f85149]/50"
                >
                  <span className="text-[#8b949e] text-sm group-hover:text-white transition-colors">{repo.split('(')[0]}</span>
                  <span className="text-[#f85149] text-xs font-bold">{repo.split('(')[1].replace(')', '')}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
