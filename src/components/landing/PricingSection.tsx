import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Get started for free",
    features: ["5 READMEs / month", "Basic templates", "Health scores", "Community support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    desc: "For serious developers",
    features: ["Unlimited READMEs", "All templates", "Version history", "One-click push", "Priority support"],
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/mo",
    desc: "For teams & organizations",
    features: ["Everything in Pro", "Team collaboration", "Admin dashboard", "Custom templates", "API access", "SSO"],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground">Start free. Upgrade when you need more.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-8 flex flex-col ${
                plan.popular
                  ? "glass-card glow-border animate-pulse-glow"
                  : "glass-card"
              }`}
            >
              {plan.popular && (
                <span className="text-xs font-semibold text-primary mb-4 uppercase tracking-wider">Most Popular</span>
              )}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? "hero" : "outline"} className="w-full">
                {plan.name === "Free" ? "Get Started" : "Upgrade"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
