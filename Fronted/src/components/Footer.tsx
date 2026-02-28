import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Diamond } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Diamond className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">Shiv Gems</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Founded in 2002, Shiv Gems blends three generations of traditional craftsmanship with modern innovation, offering certified natural and lab-grown diamonds.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Products' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact Us' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-gray-400 hover:text-white transition-colors text-sm">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Diamond Cuts */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">Diamond Cuts</h3>
          <ul className="text-gray-400 text-sm space-y-1.5 grid grid-cols-2 gap-x-2">
            {["Round Brilliant", "Princess Cut", "Cushion Cut", "Emerald Cut", "Oval Cut", "Marquise Cut", "Pear Cut", "Heart Shape"].map(cut => (
              <li key={cut}>{cut}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">Contact</h3>
          <ul className="text-gray-400 text-sm space-y-3">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span>42 Diamond Market, Mahidharpura, Surat, Gujarat 395003, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>info@shivgems.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Shiv Gems. All Rights Reserved.</p>
        <div className="flex gap-6 text-gray-500 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Returns Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
