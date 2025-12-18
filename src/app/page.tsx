import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import FeaturesSection from '@/components/FeaturesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <TrustSection />
        <FeaturesSection />
        <div className="section-divider" />
        <WhyChooseSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
