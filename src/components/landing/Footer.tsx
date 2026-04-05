import { Github, Twitter } from "lucide-react";
import { RepoDecodeIcon } from "@/components/RepoDecodeIcon";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <RepoDecodeIcon className="h-6 w-6 text-primary" />
              Repo Decode
            </div>
            <p className="text-sm text-muted-foreground">AI-powered README generation for modern developers.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Templates", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <div className="text-xs text-muted-foreground">
            <p>© 2025 Repo Decode. Made by Ammad Ahmed.</p>
            <p>Built for developers, by developers.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
