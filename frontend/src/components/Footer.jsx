import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-gradient mb-4 block">
              Traveloop
            </Link>
            <p className="text-gray-500 mb-6">
              Empowering modern travelers with the best tools and seamless experiences across the globe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors"><FaLinkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors"><FaGithub size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Showcase</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Releases</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Traveloop Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-primary-600 transition-colors">English (US)</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
