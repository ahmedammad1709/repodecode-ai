import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search repos..." className="pl-9 bg-secondary/50 border-border h-9 text-sm" />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
          JD
        </div>
      </div>
    </header>
  );
}
