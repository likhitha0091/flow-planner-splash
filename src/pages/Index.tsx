import Navbar from "@/components/landing/Navbar";
import AuroraBackground from "@/components/landing/AuroraBackground";
import HeroSection from "@/components/landing/HeroSection";
import Features from "@/components/landing/Features";
import ProductPreview from "@/components/landing/ProductPreview";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <AuroraBackground />
    <Navbar />
    <HeroSection />
    <Features />
    <ProductPreview />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
