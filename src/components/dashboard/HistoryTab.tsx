import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const versions = [
  { date: "Jan 15, 2025", time: "2:34 PM", version: "v3", template: "Detailed", health: 92 },
  { date: "Jan 12, 2025", time: "11:20 AM", version: "v2", template: "Minimal", health: 78 },
  { date: "Jan 8, 2025", time: "4:50 PM", version: "v1", template: "Minimal", health: 45 },
];

export function HistoryTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Version History</h2>

      <div className="space-y-3">
        {versions.map((v) => (
          <div key={v.version} className="glass-card-hover p-5 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-mono font-bold text-primary">
              {v.version}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{v.date} at {v.time}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-[10px]">{v.template}</Badge>
                <span className="text-xs text-muted-foreground">Health: {v.health}%</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">View</Button>
              <Button variant="outline" size="sm">Restore</Button>
              <Button variant="ghost" size="sm">Compare</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
