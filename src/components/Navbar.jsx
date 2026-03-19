import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, 
    
    []);
    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

    

return (
    <>
      <nav className={`fixed top-0 w-full z-[60] flex items-center justify-between px-6 md:px-12 transition-all duration-700 
        ${isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-8'}`}>
        
        {/* LOGO */}
        <div className="flex items-center">
          <span className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-black italic">
            Samuel Richard
          </span>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center space-x-12"> 
          <div className="flex items-center space-x-10">
            <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-semibold text-gray-800 hover:text-[#A65A44] transition-colors">Home</a>
            <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-semibold text-gray-800 hover:text-[#A65A44] transition-colors">Projects</a>
            <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-semibold text-gray-800 hover:text-[#A65A44] transition-colors">About</a>
          </div>
          <span className="h-4 w-[1px] bg-[#A65A44] opacity-40"></span>
          <button className="bg-[#A65A44] text-white px-8 py-4 rounded-none text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all duration-500">
            Work With Us
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden flex flex-col space-y-1.5 p-2"
        >
          <span className="w-6 h-[1.5px] bg-black"></span>
          <span className="w-4 h-[1.5px] bg-black self-end"></span>
        </button>
      </nav>

     {/* MOBILE OVERLAY MENU */}
<div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
  
  {/* CLICK-OUTSIDE */}
  <div 
    className="absolute inset-0 bg-black/40 backdrop-blur-md" 
    onClick={() => setIsOpen(false)} 
  />

  {/* SLIM MENU PANEL */}
  <div className={`absolute right-0 top-0 h-full w-[65%] sm:w-[50%] bg-white shadow-2xl transition-transform duration-500 ease-in-out p-8 flex flex-col
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    
    {/* CLOSEBUTTON */}
    <button 
      onClick={() => setIsOpen(false)}
      className="self-end p-2 text-4xl font-light text-gray-400 hover:text-black transition-colors outline-none"
    >
      &times;
    </button>

    {/* NAV LINKS */}
    <div className="mt-16 flex flex-col space-y-10">
      <a href="#" className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-900 hover:text-[#A65A44] transition-colors">Home</a>
      <a href="#" className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-900 hover:text-[#A65A44] transition-colors">Projects</a>
      <a href="#" className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-900 hover:text-[#A65A44] transition-colors">About</a>
      
      {/* Separator Line */}
      <span className="w-8 h-[1px] bg-[#A65A44] opacity-30"></span>

      <button className="bg-[#A65A44] text-white py-4 px-4 rounded-none text-[9px] uppercase tracking-[0.2em] font-bold shadow-lg active:scale-95 transition-all">
        Work With Us
      </button>
    </div>

    {/* FOOTER INFO */}
    <div className="mt-auto border-t border-gray-100 pt-6">
      <p className="text-[9px] uppercase tracking-widest text-gray-400 leading-relaxed">
        © 2026 Samuel Richard
      </p>
    </div>
    </div>
    </div>
    </>
  );
};

export default Navbar;