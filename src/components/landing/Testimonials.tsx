import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    username: "@sarahcodes",
    avatar: "SC",
    rating: 5,
    quote: "ReadForge saved me hours. My OSS projects finally have proper documentation that people actually read.",
  },
  {
    name: "Marcus Johnson",
    username: "@marcusdev",
    avatar: "MJ",
    rating: 5,
    quote: "The AI-detected tech stack feature is insanely accurate. One click and my README was perfect.",
  },
  {
    name: "Aiko Tanaka",
    username: "@aikotanaka",
    avatar: "AT",
    rating: 5,
    quote: "We rolled ReadForge across our org. Every repo now has consistent, high-quality documentation.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Developers</h2>
          <p className="text-muted-foreground">Join thousands of developers shipping better docs</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.username}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.username}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
