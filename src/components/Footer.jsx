import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-12 px-8 md:px-20 border-t border-gray-100 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-0">
          
          {/* LOGO BLOCK - Balanced Size */}
          <div className="flex flex-col">
            <Link to="/" className="group">
              <h2 className="text-6xl md:text-7xl font-serif italic leading-tight text-black tracking-tight">
                Samuel <br /> Richard
              </h2>
              <div className="mt-4 flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-black">
                  Architecture & Interior Design
                </span>
                {/* Minimal line that matches your Navbar */}
                <div className="mt-2 h-[2px] w-6 bg-[#A65A44] transition-all duration-500 group-hover:w-12" />
              </div>
            </Link>
          </div>

          {/* NAV COLUMNS - Clean & Aligned */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-20">
            
            {/* Column 1 */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-[#A65A44]">Navigate</h4>
              <nav className="flex flex-col space-y-3">
                {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                  <Link 
                    key={item} 
                    to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                    className="text-[13px] text-gray-500 hover:text-black transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-[#A65A44]">Contact</h4>
              <div className="flex flex-col space-y-3 text-[13px] text-gray-500">
                <a href="tel:+2348000000000" className="hover:text-black transition-colors">+234 800 000 0000</a>
                <a href="mailto:studio@samuel.com" className="hover:text-black transition-colors">studio@samuel.com</a>
                <p className="leading-relaxed">GRA Phase 2,<br />Port Harcourt.</p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-[#A65A44]">Social</h4>
              <div className="flex flex-col space-y-3 text-[13px] text-gray-500">
                {['Instagram', 'Facebook', 'LinkedIn'].map((platform) => (
                  <a key={platform} href="#" className="hover:text-black transition-colors">
                    {platform}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR - Subtle & Professional */}
        <div className="mt-24 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">
            © {currentYear} Samuel Richard. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-gray-400">
            <a href="#" className="hover:text-black transition-colors"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-black transition-colors"><FaFacebookF size={16} /></a>
            <a href="#" className="hover:text-black transition-colors"><FaLinkedinIn size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;