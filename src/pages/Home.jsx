import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import hero1 from '../assets/hero/hero1.png';
import hero2 from '../assets/hero/hero2.png';
import hero3 from '../assets/hero/hero3.png';
import hero4 from '../assets/hero/hero4.png';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [hero1, hero2, hero3, hero4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main className="min-h-screen w-full bg-[#FBF9F7] flex flex-col md:flex-row md:h-screen md:overflow-hidden font-['Inter']">
      
  {/* LEFT SIDE: Content - Using items-center for vertical centering */}
  <section className="w-full md:w-[45%] flex items-center px-6 md:px-16 lg:px-24 py-20 md:py-0">
    {/* Change 2: Removed -translate-y-6 and added a responsive top margin to text */}
    <div className="w-full pt-10 md:pt-0">
      <h1 className="text-[#1A1A1A] text-4xl sm:text-5xl lg:text-5xl font-['Playfair_Display'] font-bold leading-[1.1] tracking-tight">
        50+ Years of <br />
        Crafting <span className="italic font-normal text-[#A65A44]">Timeless</span> <br />
        Architecture.
      </h1>
          
          <p className="mt-5 text-gray-500 text-sm md:text-sm leading-relaxed max-w-sm font-light tracking-wide">
            Bringing vision to life with precision, culture, and excellence built over five decades in Nigeria.
          </p>

          {/* BUTTONS: Stacked on mobile, side-by-side on desktop */}
          <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 pointer-events-auto">
            {/* Primary CTA */}
            <Link 
              to="/projects" 
              className="group relative flex h-[56px] sm:w-[200px] items-center justify-center bg-[#A65A44] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-[#1a1a1a]"
            >
              <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-white transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110">
                View Projects
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link 
              to="/contact" 
              className="group relative flex h-[56px] sm:w-[200px] items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
              <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-black group-hover:scale-105">
                Work With Us
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-black -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"></span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE: Image Slider */}
<section className="w-full md:w-[55%] relative h-[400px] sm:h-[500px] md:h-screen flex flex-col justify-center p-6 md:p-10 lg:p-16">
  {/* The container now has a fixed responsive height to prevent collapsing */}
  <div className="relative w-full h-full md:h-[75%] overflow-hidden rounded-xl shadow-2xl shadow-black/5 bg-gray-100">
    {images.map((img, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      >
        <img
          src={img}
          alt="Architectural Project"
          className="h-full w-full object-cover"
          /* Added loading priority since these are hero images */
          loading="eager"
        />
      </div>
    ))}
  </div>

  {/* Indicators */}
  <div className="mt-8 flex justify-center space-x-3">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`h-[2px] transition-all duration-500 cursor-pointer ${
          index === currentSlide ? 'w-12 bg-[#A65A44]' : 'w-6 bg-gray-200'
        }`}
      />
    ))}
  </div>
</section>
</main>
  );
};

export default Home;