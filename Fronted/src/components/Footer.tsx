import React from "react";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Shiv Gems */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Shiv Gems</h3>
          <p className="text-gray-400 text-sm">
            Founded in 2002 and carried forward by three generations, Shiv Gems blends
            traditional craftsmanship with modern innovations, offering natural,
            lab-grown, and certified diamonds.
          </p>
        </div>

        {/* Expertise & Offerings */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Expertise</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Natural Diamonds</li>
            <li>Lab-Grown Diamonds</li>
            <li>Certified Diamonds</li>
            <li>Bespoke Creations</li>
          </ul>
        </div>

        {/* Diamond Cuts */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Diamond Cuts</h3>
          <ul className="text-gray-400 text-sm space-y-2 grid grid-cols-2 gap-2">
            <li>Round Brilliant</li>
            <li>Princess Cut</li>
            <li>Cushion Cut</li>
            <li>Emerald Cut</li>
            <li>Asscher Cut</li>
            <li>Oval Cut</li>
            <li>Marquise Cut</li>
            <li>Pear Cut</li>
            <li>Heart Shape</li>
            <li>Radiant Cut</li>
            <li>Baguette & Trillion</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="text-gray-400 text-sm space-y-3">
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" /> Mumbai, India
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-400" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" /> contact@shivgems.com
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-blue-400">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-400">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-300">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Shiv Gems. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
