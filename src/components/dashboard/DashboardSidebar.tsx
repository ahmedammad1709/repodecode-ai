import { Home, GitBranch, FileEdit, Activity, LayoutTemplate, Clock, Github, CreditCard, Settings, LogOut } from "lucide-react";
import { RepoDecodeIcon } from "@/components/RepoDecodeIcon";
import type { DashTab } from "@/pages/Dashboard";

const items: { id: DashTab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "repos", label: "My Repositories", icon: GitBranch },
  { id: "editor", label: "README Editor", icon: FileEdit },
  { id: "health", label: "Health Scores", icon: Activity },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "history", label: "History", icon: Clock },
  { id: "connection", label: "GitHub Connection", icon: Github },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({ activeTab, setActiveTab }: { activeTab: DashTab; setActiveTab: (t: DashTab) => void }) {
  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col shrink-0 hidden lg:flex">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <RepoDecodeIcon className="h-6 w-6 text-primary mr-2" />
        <span className="font-bold">Repo Decode</span>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
              activeTab === item.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
