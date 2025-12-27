import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import FeaturesSection from '@/components/FeaturesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
        <HeroSection />
        <div className="section-divider" />
        <TrustSection />
        <FeaturesSection />
        <div className="section-divider" />
        <WhyChooseSection />
        <CTASection />
    </>
  );
}
