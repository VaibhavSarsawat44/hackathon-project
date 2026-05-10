import { motion } from 'framer-motion';

const stats = [
  { id: 1, name: 'Tour Packages', value: '1,050+' },
  { id: 2, name: 'Destinations', value: '1,200+' },
  { id: 3, name: 'Partner Hotels', value: '15,000+' },
];

const StatisticsSection = () => {
  return (
    <section className="bg-gray-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary-600/30 rounded-full blur-[100px] -z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-dark p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center bg-gray-900/60 border border-gray-800 shadow-lg backdrop-blur-md hover:border-primary-500/50 transition-colors"
            >
              <dd className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">{stat.value}</dd>
              <dt className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-wider">{stat.name}</dt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
