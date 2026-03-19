import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

return (
        <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-12 transition-all duration-700 
  ${isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-8'}`}>
  
  <div className="flex items-center">
    {/* LOGO */}
    <span className="text-xl font-bold uppercase tracking-[0.2em] text-black italic" style={{ fontFamily: "'Playfair Display', serif" }}>
      Samuel Richard
    </span>
  </div>

  <div className="flex items-center space-x-12"> 
    {/* LINKS */}
    <div className="hidden md:flex items-center space-x-10">
      <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-semibold text-gray-800 hover:text-[#A65A44] transition-colors">Home</a>
      <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-semibold text-gray-800 hover:text-[#A65A44] transition-colors">Projects</a>
      <a href="#" className="text-[11px] uppercase tracking-[0.3em] font-semibold text-gray-800 hover:text-[#A65A44] transition-colors">About</a>
    </div>

    <span className="h-4 w-[1px] bg-[#A65A44] opacity-40"></span>

    {/* BUTTON */}
    <button className="bg-[#A65A44] text-white px-8 py-4 rounded-none text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all duration-500">
      Work With Us
    </button>
  </div>
</nav>
  );
};

export default Navbar;