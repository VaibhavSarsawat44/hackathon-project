import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StatisticsSection from '../components/home/StatisticsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <StatisticsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;
