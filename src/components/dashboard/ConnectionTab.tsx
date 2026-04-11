import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Github } from "lucide-react";

interface ConnectionTabProps {
  userId: string;
  userName: string;
  userEmail: string;
}

export function ConnectionTab({ userId }: ConnectionTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">GitHub Connection</h2>

      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Github className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">johndeveloper</h3>
              <Badge variant="default" className="text-[10px]">Connected ✅</Badge>
            </div>
            <p className="text-sm text-muted-foreground">john@developer.com</p>
            <p className="text-xs text-muted-foreground mt-1">Last synced: 2 hours ago</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Sync Repos</Button>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">Disconnect</Button>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h3 className="font-semibold mb-4">Repository Access</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Include private repositories</span>
          <Switch />
        </div>
        <p className="text-xs text-muted-foreground">12 repositories authorized</p>
      </div>
    </div>
  );
}
