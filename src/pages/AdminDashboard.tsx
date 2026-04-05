import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  CreditCard,
  Zap,
  MessageSquare,
  LayoutTemplate,
  Terminal,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RepoDecodeIcon } from "@/components/RepoDecodeIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export type AdminTab = 
  | "analytics" 
  | "users" 
  | "subscriptions" 
  | "usage" 
  | "feedback" 
  | "templates" 
  | "logs";

interface AdminDashboardProps {
  activeTab?: AdminTab;
  setActiveTab?: (tab: AdminTab) => void;
}

export function AdminDashboard({ activeTab = "analytics", setActiveTab }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "analytics" as AdminTab, label: "Analytics", icon: BarChart3 },
    { id: "users" as AdminTab, label: "User Management", icon: Users },
    { id: "subscriptions" as AdminTab, label: "Subscriptions", icon: CreditCard },
    { id: "usage" as AdminTab, label: "AI Usage Monitor", icon: Zap },
    { id: "feedback" as AdminTab, label: "Feedback & Reports", icon: MessageSquare },
    { id: "templates" as AdminTab, label: "Template Manager", icon: LayoutTemplate },
    { id: "logs" as AdminTab, label: "System Logs", icon: Terminal },
  ];

  return (
    <div className="flex h-screen bg-[#0d1117]">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col shrink-0 hidden lg:flex"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#30363d]">
          <RepoDecodeIcon className="h-6 w-6 text-[#f85149] mr-2" />
          <div>
            <span className="font-bold text-white">Repo Decode</span>
            <p className="text-[#8b949e] text-xs">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveTab?.(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === item.id
                  ? "bg-[#f85149]/20 text-[#f85149] font-medium border border-[#f85149]/30"
                  : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 border-t border-[#30363d] pt-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#f85149] hover:bg-[#f85149]/10 transition-all">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <motion.div
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          className="h-16 bg-[#0d1117] border-b border-[#30363d] flex items-center justify-between px-8"
        >
          <div className="flex items-center flex-1">
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
              <Input
                placeholder="Search users, logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#161b22] border-[#30363d] text-white placeholder-[#8b949e]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} className="relative p-2 text-[#8b949e] hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-[#f85149] rounded-full" />
            </motion.button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] transition-all"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f85149] to-[#f0883e]" />
                  <ChevronDown className="h-4 w-4 text-[#8b949e]" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#161b22] border-[#30363d]">
                <DropdownMenuItem className="text-white hover:bg-[#30363d]">
                  Admin Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-[#30363d]">
                  System Health
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#f85149] hover:bg-[#30363d]">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex-1 overflow-y-auto bg-[#0d1117] p-8"
        >
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "subscriptions" && <SubscriptionsTab />}
          {activeTab === "usage" && <UsageTab />}
          {activeTab === "feedback" && <FeedbackTab />}
          {activeTab === "templates" && <TemplatesTab />}
          {activeTab === "logs" && <LogsTab />}
        </motion.div>
      </div>
    </div>
  );
}

// Analytics Tab
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,284", change: "+12%", positive: true, icon: Users },
          { label: "Active Today", value: "342", change: "+5%", positive: true, icon: TrendingUp },
          { label: "Revenue MTD", value: "$8,420", change: "+23%", positive: true, icon: CreditCard },
          { label: "Churn Rate", value: "2.1%", change: "-0.3%", positive: true, icon: TrendingDown },
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-[#161b22] border-[#30363d] p-6 hover:border-[#f85149]/50 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#8b949e] text-sm">{metric.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
                    <p className="text-[#f85149] text-xs mt-2">{metric.change}</p>
                  </div>
                  <Icon className="h-8 w-8 text-[#f85149]" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-[#161b22] border-[#30363d] p-6">
          <h2 className="text-white font-bold mb-4">Users Over Time</h2>
          <div className="h-64 bg-[#0d1117] rounded flex items-center justify-center text-[#8b949e]">
            📈 Line Chart: User Growth
          </div>
        </Card>

        <Card className="bg-[#161b22] border-[#30363d] p-6">
          <h2 className="text-white font-bold mb-4">Plan Distribution</h2>
          <div className="h-64 bg-[#0d1117] rounded flex items-center justify-center text-[#8b949e]">
            📊 Pie Chart: Plans
          </div>
        </Card>
      </div>
    </div>
  );
}

// Users Tab
function UsersTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <Button className="bg-[#f85149] hover:bg-[#f85149]/90 text-white">Export CSV</Button>
      </div>

      <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#30363d] bg-[#0d1117]">
              <tr>
                {["Avatar", "Name", "Email", "Plan", "Repos", "READMEs", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-white font-bold text-sm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.tr
                  key={i}
                  whileHover={{ backgroundColor: "#0d1117" }}
                  className="border-b border-[#30363d]"
                >
                  <td className="px-6 py-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00ff88] to-[#4493f8]" />
                  </td>
                  <td className="px-6 py-3 text-white font-medium">User {i}</td>
                  <td className="px-6 py-3 text-[#8b949e]">user{i}@example.com</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      i % 2 === 0 
                        ? "bg-[#f85149]/20 text-[#f85149]" 
                        : "bg-[#00ff88]/20 text-[#00ff88]"
                    }`}>
                      {i % 2 === 0 ? "Pro" : "Team"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[#8b949e]">{8 + i}</td>
                  <td className="px-6 py-3 text-[#8b949e]">{12 + i * 2}</td>
                  <td className="px-6 py-3 text-[#8b949e]">Jan {15 + i}, 2025</td>
                  <td className="px-6 py-3">
                    <button className="text-[#4493f8] hover:text-[#4493f8]/80 text-sm">View</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Subscriptions Tab
function SubscriptionsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Subscriptions</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "MRR", value: "$12,480" },
          { label: "ARR", value: "$149,760" },
          { label: "Active Subs", value: "412" },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#161b22] border-[#30363d] p-6">
            <p className="text-[#8b949e] text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="bg-[#161b22] border-[#30363d] p-6">
        <h2 className="text-white font-bold mb-4">Revenue Breakdown</h2>
        <div className="space-y-4">
          {[
            { plan: "Pro ($9/mo)", users: 224, revenue: "$2,016" },
            { plan: "Team ($29/mo)", users: 88, revenue: "$2,552" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-[#0d1117] rounded-lg border border-[#30363d]">
              <div>
                <p className="text-white font-medium">{item.plan}</p>
                <p className="text-[#8b949e] text-sm">{item.users} active subscribers</p>
              </div>
              <p className="text-[#00ff88] font-bold">{item.revenue}/mo</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Usage Tab
function UsageTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">AI Usage Monitor</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "API Calls Today", value: "12,480", unit: "calls" },
          { label: "Cost This Month", value: "$2,145", unit: "USD" },
          { label: "Avg Response Time", value: "245ms", unit: "milliseconds" },
          { label: "Error Rate", value: "0.12%", unit: "errors" },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#161b22] border-[#30363d] p-6">
            <p className="text-[#8b949e] text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            <p className="text-[#8b949e] text-xs mt-1">{stat.unit}</p>
          </Card>
        ))}
      </div>

      <Card className="bg-[#161b22] border-[#30363d] p-6">
        <h2 className="text-white font-bold mb-4">Most Expensive Users</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#0d1117] rounded border border-[#30363d]">
              <span className="text-white">User {i}</span>
              <span className="text-[#f85149]">${240 + i * 40}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Feedback Tab
function FeedbackTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Feedback & Reports</h1>

      <Card className="bg-[#161b22] border-[#30363d] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[#30363d] bg-[#0d1117]">
            <tr>
              {["User", "Rating", "Comment", "Date", "Status"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-white font-bold text-sm">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((i) => (
              <tr key={i} className="border-b border-[#30363d] hover:bg-[#0d1117]">
                <td className="px-6 py-3 text-white">User {i}</td>
                <td className="px-6 py-3 text-[#00ff88]">⭐ {i + 3}</td>
                <td className="px-6 py-3 text-[#8b949e]">Great tool! Really helps with docs</td>
                <td className="px-6 py-3 text-[#8b949e]">Mar {15 + i}, 2025</td>
                <td className="px-6 py-3">
                  <span className="px-2 py-1 bg-[#00ff88]/20 text-[#00ff88] text-xs rounded">Reviewed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// Templates Tab
function TemplatesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Template Manager</h1>
        <Button className="bg-[#f85149] hover:bg-[#f85149]/90">Create Template</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Minimal", "Detailed", "Startup", "Open Source", "Enterprise", "Portfolio"].map((name) => (
          <Card key={name} className="bg-[#161b22] border-[#30363d] p-6">
            <h3 className="text-white font-bold mb-2">{name} Template</h3>
            <p className="text-[#8b949e] text-sm mb-4">Perfect for {name.toLowerCase()} projects</p>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-[#4493f8]">Edit</Button>
              <Button size="sm" variant="outline" className="border-[#30363d]">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Logs Tab
function LogsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">System Logs</h1>

      <Card className="bg-[#161b22] border-[#30363d] p-4">
        <div className="space-y-2 font-mono text-sm max-h-96 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="text-[#8b949e] hover:bg-[#0d1117] p-2 rounded transition-colors">
              <span className="text-[#4493f8]">[2025-03-15 14:{30 + i}:12]</span>
              <span className="text-[#00ff88] mx-2">INFO</span>
              <span>User {i} generated README for project-{i}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboard;
