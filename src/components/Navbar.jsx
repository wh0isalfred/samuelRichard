import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const location = useLocation(); // Helps us know which page we are on

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Close mobile menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[60] flex items-center justify-between px-8 md:px-12 transition-all duration-1000 ease-out 
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} 
        ${isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-8'}`}
      >
        
        {/* LOGO - Returns to Home */}
        <Link to="/" className="flex items-center outline-none">
          <span className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-black italic">
            Samuel Richard
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-12"> 
          <div className="flex items-center space-x-10">
            {[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'About', path: '/about' }
            ].map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-[11px] uppercase tracking-[0.3em] font-semibold transition-colors 
                ${location.pathname === link.path ? 'text-[#A65A44]' : 'text-gray-800 hover:text-[#A65A44]'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <span className="h-4 w-[1px] bg-[#A65A44] opacity-40"></span>
          
          <Link 
            to="/contact" 
            className="bg-[#A65A44] text-white px-8 py-3 rounded-none text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all duration-700"
          >
            Work With Us
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button onClick={() => setIsOpen(true)} className="md:hidden flex flex-col space-y-1.5 p-2 outline-none">
          <span className="w-6 h-[1.5px] bg-black"></span>
          <span className="w-4 h-[1.5px] bg-black self-end"></span>
        </button>
      </nav>

      {/* MOBILE OVERLAY */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={closeMenu} />
        
        <div className={`absolute right-0 top-0 h-full w-[65%] bg-white transition-transform duration-700 ease-in-out p-10 flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <button onClick={closeMenu} className="self-end text-4xl font-light text-gray-400 hover:text-black outline-none">&times;</button>

          <div className="mt-20 flex flex-col space-y-10">
            {[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'About', path: '/about' }
            ].map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={closeMenu}
                className={`text-[10px] uppercase tracking-[0.4em] font-bold 
                ${location.pathname === link.path ? 'text-[#A65A44]' : 'text-gray-900'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <span className="w-8 h-[1px] bg-[#A65A44] opacity-30"></span>
            
            <Link 
              to="/contact" 
              onClick={closeMenu}
              className="bg-[#A65A44] text-white py-4 rounded-none text-[9px] uppercase tracking-[0.2em] font-bold text-center"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;