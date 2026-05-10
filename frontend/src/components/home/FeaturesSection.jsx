import { motion } from 'framer-motion';
import { Globe2, Shield, Zap, CreditCard, HeartHandshake, CloudLightning } from 'lucide-react';

const features = [
  {
    icon: <Globe2 size={24} />,
    title: 'Global Connectivity',
    description: 'Access real-time itineraries, maps, and guides anywhere in the world, even offline.'
  },
  {
    icon: <Shield size={24} />,
    title: 'Secure Booking',
    description: 'Bank-level encryption ensures your payment data and personal details are always safe.'
  },
  {
    icon: <Zap size={24} />,
    title: 'Instant Confirmations',
    description: 'No more waiting. Get your tickets, hotel vouchers, and transport details instantly.'
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Multi-Currency Support',
    description: 'Pay in your preferred currency with transparent exchange rates and zero hidden fees.'
  },
  {
    icon: <HeartHandshake size={24} />,
    title: '24/7 Concierge Support',
    description: 'Our dedicated team is available around the clock to assist you with any travel needs.'
  },
  {
    icon: <CloudLightning size={24} />,
    title: 'Smart Forecasting',
    description: 'AI-driven weather and crowd predictions help you plan the perfect day trip.'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gray-950 relative border-t border-gray-900">
      {/* Subtle background element */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm">Everything you need to travel smart</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto drop-shadow-sm">
            Traveloop brings all your travel tools into one powerful, beautifully designed platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-sm hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:-translate-y-1 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
