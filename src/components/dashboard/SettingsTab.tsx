import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SettingsTab() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold">Settings</h2>

      <div className="glass-card p-6 rounded-xl space-y-4">
        <h3 className="font-semibold">Profile</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">Name</Label>
            <Input defaultValue="John Developer" className="mt-1 bg-secondary/50 border-border" />
          </div>
          <div>
            <Label className="text-sm">Email</Label>
            <Input defaultValue="john@developer.com" className="mt-1 bg-secondary/50 border-border" />
          </div>
        </div>
        <Button variant="outline" size="sm">Save Changes</Button>
      </div>

      <div className="glass-card p-6 rounded-xl space-y-4">
        <h3 className="font-semibold">Preferences</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Default template</span>
          <span className="text-sm text-muted-foreground">Minimal</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Email notifications</span>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl border-destructive/30 space-y-4">
        <h3 className="font-semibold text-destructive">Danger Zone</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10">Delete All READMEs</Button>
          <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10">Disconnect GitHub</Button>
          <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10">Delete Account</Button>
        </div>
      </div>
    </div>
  );
}
