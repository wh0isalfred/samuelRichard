import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[60] flex items-center justify-between px-8 md:px-12 transition-all duration-700 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} 
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' 
          : 'bg-white/80 backdrop-blur-sm py-6'}`}
      >
        
        {/* LOGO */}
        <Link to="/" className="flex items-center outline-none group relative">
        <div className="relative flex flex-col items-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110">
            
            {/* The Text - Grows with the container */}
            <span className="text-lg md:text-xl font-bold uppercase tracking-[0.3em] text-black italic transition-all duration-700">
            Samuel Richard
            </span>
            
            {/* The Short Underline - Grows in both width and scale */}
            <span className="mt-1 h-[2px] w-6 bg-black rounded-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-16"></span>
            
        </div>
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
                className={`text-[11px] uppercase tracking-[0.3em] font-semibold transition-colors duration-300
                ${location.pathname === link.path ? 'text-[#A65A44]' : 'text-gray-900 hover:text-[#A65A44]'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <span className="h-4 w-[2px] bg-gray-200"></span>
          
          <Link 
            to="/contact" 
            className="bg-[#A65A44] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all duration-500"
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
  {/* Darker backdrop for better focus on the slim menu */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu} />
  
  {/* Slimmer Drawer: Changed w-[75%] to w-[60%] on small and w-[40%] on medium devices */}
  <div className={`absolute right-0 top-0 h-full w-[65%] md:w-[40%] bg-[#FBF9F7] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] p-8 flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    
    {/* Close Button: More minimal */}
    <button onClick={closeMenu} className="self-end p-2 outline-none group">
      <div className="relative w-6 h-6">
        <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black rotate-45"></span>
        <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black -rotate-45"></span>
      </div>
    </button>

    <div className="mt-16 flex flex-col space-y-8">
      {[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: 'About', path: '/about' }].map((link, index) => (
        <Link 
          key={link.name} 
          to={link.path} 
          onClick={closeMenu}
          /* Staggered entry feel */
          className={`text-[11px] uppercase tracking-[0.4em] font-bold transition-all duration-700 delay-${index * 100} 
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
          ${location.pathname === link.path ? 'text-[#A65A44]' : 'text-gray-900'}`}
        >
          {link.name}
        </Link>
      ))}

      <span className="w-6 h-[1px] bg-gray-300"></span>
      
      <Link 
        to="/contact" 
        onClick={closeMenu} 
        className={`bg-[#A65A44] text-white py-4 px-6 text-[10px] uppercase tracking-[0.2em] font-bold text-center transition-all duration-700 delay-300
        ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        Work With Us
      </Link>
    </div>

    <div className="mt-auto pb-4">
      <p className="text-[8px] uppercase tracking-widest text-gray-400">Sameul Richard</p>
    </div>
    </div>
    </div>
    </>
  );
};

export default Navbar;