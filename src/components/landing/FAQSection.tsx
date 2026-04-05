import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "Is it free to use?", a: "Yes! You get 5 free README generations per month. Upgrade to Pro for unlimited access." },
  { q: "How does AI read my code?", a: "We securely fetch your repository's file structure, dependencies, and metadata through the GitHub API. Your source code is never stored." },
  { q: "Can I edit the generated README?", a: "Absolutely. Our built-in markdown editor lets you tweak every section before pushing to GitHub." },
  { q: "Is my code safe?", a: "We only read repository metadata and file structure. Your code is processed in memory and never stored on our servers." },
  { q: "Does it work with private repos?", a: "Yes. When you connect GitHub, you can authorize access to both public and private repositories." },
  { q: "What languages are supported?", a: "ReadForge supports all major programming languages including JavaScript, Python, Java, Go, Rust, Ruby, and more." },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know</p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass-card rounded-lg px-6 border-border">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
