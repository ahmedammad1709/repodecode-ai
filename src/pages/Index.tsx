import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { LivePreview } from "@/components/landing/LivePreview";
import { PricingSection } from "@/components/landing/PricingSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <LivePreview />
      <PricingSection />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
