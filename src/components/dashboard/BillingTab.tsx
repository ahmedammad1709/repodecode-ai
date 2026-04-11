import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BillingTabProps {
  userId: string;
  userName: string;
  userEmail: string;
}

export function BillingTab({ userId }: BillingTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Billing</h2>

      <div className="glass-card glow-border p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Free Plan</h3>
            <p className="text-sm text-muted-foreground">5 READMEs per month</p>
          </div>
          <Badge variant="default">Current</Badge>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>3 of 5 READMEs used</span>
            <span>60%</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        <Button variant="hero" className="w-full">Upgrade to Pro — $9/mo</Button>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h3 className="font-semibold mb-4">Plan Comparison</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {["Free", "Pro", "Team"].map((plan) => (
            <div key={plan} className="text-center">
              <p className="font-semibold mb-2">{plan}</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><Check className="inline h-3 w-3 text-primary mr-1" />{plan === "Free" ? "5" : "∞"} READMEs</p>
                <p><Check className="inline h-3 w-3 text-primary mr-1" />{plan === "Free" ? "Basic" : "All"} templates</p>
                {plan !== "Free" && <p><Check className="inline h-3 w-3 text-primary mr-1" />Version history</p>}
                {plan === "Team" && <p><Check className="inline h-3 w-3 text-primary mr-1" />Team collab</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
