import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const templates = [
  { name: "Minimal", tags: ["Minimal"], desc: "Clean and concise. Just the essentials." },
  { name: "Detailed", tags: ["Detailed"], desc: "Comprehensive with all sections included." },
  { name: "Startup", tags: ["Startup"], desc: "Investor-ready with badges and screenshots." },
  { name: "Open Source", tags: ["Open Source"], desc: "Community-focused with contributing guide." },
  { name: "Library", tags: ["Minimal", "Detailed"], desc: "API docs, install, and usage examples." },
  { name: "Monorepo", tags: ["Detailed"], desc: "Multi-package repo with workspace structure." },
];

export function TemplatesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Templates</h2>
        <Button variant="outline" size="sm">Create Custom Template</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t, i) => (
          <div key={t.name} className={`glass-card-hover p-6 rounded-xl ${i === 0 ? "glow-border" : ""}`}>
            <div className="h-24 bg-secondary/30 rounded-md mb-4 flex items-center justify-center font-mono text-xs text-muted-foreground">
              README Preview
            </div>
            <h3 className="font-semibold mb-1">{t.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.desc}</p>
            <div className="flex items-center gap-2 mb-4">
              {t.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant={i === 0 ? "hero" : "outline"} size="sm" className="flex-1">
                {i === 0 ? "Active" : "Use Template"}
              </Button>
              <Button variant="ghost" size="sm">Preview</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
