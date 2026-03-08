import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ScrollFrames from "@/components/landing/ScrollFrames";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ScrollFrames />
    <Features />
    <Footer />
  </div>
);

export default Index;
