import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "Traveloop completely changed how I organize my work trips. The instant sync and clean UI make it a joy to use.",
    author: "Sarah Jenkins",
    role: "Product Manager at TechFlow",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    content: "The best travel companion app I've used. period. The real-time flight updates saved me from missing a connection in Dubai.",
    author: "Michael Chang",
    role: "Digital Nomad",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    content: "I love the clean aesthetic and how seamlessly it handles multi-currency transactions. Absolutely premium experience.",
    author: "Elena Rodriguez",
    role: "Creative Director",
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gray-950 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm">Loved by travelers worldwide</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto drop-shadow-sm">
            Don't just take our word for it. Here's what our community has to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 p-8 rounded-3xl shadow-lg border border-gray-800 flex flex-col justify-between hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] hover:border-gray-700 transition-all backdrop-blur-sm"
            >
              <div>
                <div className="flex space-x-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-8 font-medium">"{testimonial.content}"</p>
              </div>
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full border-2 border-gray-800 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
