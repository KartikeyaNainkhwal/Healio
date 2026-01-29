import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#F5F9FF] text-gray-600 pt-20">

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div className="md:col-span-2">
          <img src={assets.logo} alt="Healio" className="w-40 mb-4" />
          <p className="leading-7 max-w-md">
            <span className="text-black font-semibold">Healio</span> is a modern
            healthcare platform designed to simplify doctor discovery and
            appointment management. It helps clinics and patients connect
            efficiently through a clean, reliable, and easy-to-use interface.
          </p>

          <p className="mt-6 text-sm text-gray-500">
            Designed with performance, accessibility, and real-world usability
            in mind.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="over:text-white transition cursor-pointer">Company</h3>
          <ul className="space-y-3">
            <li className="hover:text-black transition cursor-pointer">Home</li>
            <li className="hover:text-black transition cursor-pointer">About Us</li>
            <li className="hover:text-black transition cursor-pointer">Contact</li>
            <li className="hover:text-black transition cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="over:text-white transition cursor-pointer">Contact</h3>
          <ul className="space-y-3">
            <li className="hover:text-black transition cursor-pointer">
              +91 90000 90000
            </li>
            <li className="hover:text-black transition cursor-pointer">
              support@healio.in
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © 2025 Healio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
