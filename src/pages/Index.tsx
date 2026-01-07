import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import DrivingSection from "@/components/DrivingSection";
import OtherServicesSection from "@/components/OtherServicesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedSection />
        <DrivingSection />
        <OtherServicesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
