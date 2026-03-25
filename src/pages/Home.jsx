import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatsSection from '../components/Stats';

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
    <div className="bg-[#FBF9F7]">
      {/* HERO SECTION */}
      <main className="min-h-screen w-full flex flex-col md:flex-row md:h-screen font-['Inter']">

        {/* LEFT SIDE: Content */}
        <section className="w-full md:w-[45%] flex items-center px-6 md:px-16 lg:px-24 py-20 md:py-0">
          <div className="w-full pt-10 md:pt-0">
            <h1 className="text-[#1A1A1A] text-4xl sm:text-5xl lg:text-5xl font-['Playfair_Display'] font-bold leading-[1.1] tracking-tight">
                24+ Years of <br />
                  <span className="italic font-normal text-[#A65A44]"> Designing Spaces</span> that Last.
            </h1>

            <p className="mt-5 text-gray-500 text-sm md:text-sm leading-relaxed max-w-sm font-light tracking-wide">
              Thoughtfully designed residential and commercial spaces shaped by over two decades of experience across Nigeria.
            </p>

            <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 pointer-events-auto">
              <Link to="/projects" className="group relative flex h-[56px] sm:w-[200px] items-center justify-center bg-[#A65A44] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-[#6B6B6B]">
                <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-white transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110">
                  View Projects
                </span>
              </Link>

              <Link to="/contact" className="group relative flex h-[56px] sm:w-[200px] items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
                <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-black group-hover:scale-105">
                  Work With Us
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-black -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"></span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE: Image Slider */}
        <section className="w-full md:w-[55%] relative h-[450px] md:h-full flex flex-col justify-center p-6 md:p-10 lg:p-16">

          {/* Decorative gray box — offset right, peeks behind image */}
          <div
            className="absolute rounded-xl bg-[#E8E8E8]"
            style={{
              top: '20%',
              bottom: '20%',
              left: '10%',
              right: '9%',
              transform: 'translateX(18px)',
              zIndex: 0,
            }}
          />

          {/* Image slider — sits in front, offset slightly left so box peeks right */}
          <div
            className="relative overflow-hidden rounded-xl bg-gray-100"
            style={{
              height: '75%',
              zIndex: 1,
              marginRight: '18px',
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img src={img} alt="Architectural Project" className="h-full w-full object-cover" loading="eager" />
              </div>
            ))}
          </div>

          {/* Slide indicators */}
          <div className="mt-8 flex justify-center space-x-3" style={{ position: 'relative', zIndex: 1 }}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-[2px] transition-all duration-500 cursor-pointer ${
                  index === currentSlide ? 'w-12 bg-[#6B6B6B]' : 'w-6 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </section>
      </main>

      {/* STATS SECTION */}
      <div className="relative z-20 -mt-10 md:-mt-20">
        <StatsSection />
      </div>

      {/* ABOUT / PHILOSOPHY SECTION */}
      <section className="w-full bg-[#FBF9F7] py-24 md:py-36 px-6 md:px-16 lg:px-24 font-['Inter']">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">

          {/* LEFT: Photo with decorative box */}
          <div className="w-full md:w-[45%] relative flex-shrink-0">
            {/* Decorative offset box — peeks bottom-right */}
            <div className="absolute bottom-[-16px] right-[-16px] w-full h-full bg-[#E8E8E8] rounded-xl z-0" />
            {/* Terracotta accent line — top left */}
            <div className="absolute top-[-12px] left-[-12px] w-16 h-16 border-t-2 border-l-2 border-[#A65A44] z-10" />
            {/* Photo */}
            <div className="relative z-[1] overflow-hidden rounded-xl bg-[#D0CBC6] aspect-[4/5]">
              <img
                src="/src/assets/samuel.jpg"
                alt="Samuel Richard"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                }}
              />
              {/* Fallback if image missing */}
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#A65A44]/40 font-semibold hidden">
                Samuel Richard
              </span>
            </div>
          </div>

          {/* RIGHT: Text */}
          <div className="w-full md:w-[55%]">
            <span className="text-[9px] uppercase tracking-[0.5em] text-[#6B6B6B] font-semibold">
              The Architect
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-[#1A1A1A] leading-[1.15]">
              24+ Years of <br />
                <span className="italic font-normal text-[#A65A44]">Shaping Spaces.</span>
            </h2>

            <div className="mt-6 h-[2px] w-12 bg-[#A65A44]" />

            <p className="mt-8 text-gray-500 text-sm leading-[1.9] font-light max-w-md">
              Samuel Richard has spent over two decades shaping the built environment across Nigeria — from private homes to large-scale commercial projects. His work is grounded in a clear understanding of space, culture, and how people truly live.
            </p>

            <p className="mt-4 text-gray-500 text-sm leading-[1.9] font-light max-w-md">
              Each project begins with listening — to the client, the environment, and the purpose the space is meant to serve.
            </p>

            {/* Signature-style quote */}
            <blockquote className="mt-8 pl-5 border-l-2 border-[#A65A44]">
              <p className="text-[#1A1A1A] font-['Playfair_Display'] italic text-lg leading-relaxed">
                "Clarity is what makes architecture endure."
              </p>
            </blockquote>

            <Link
              to="/about"
              className="group inline-flex items-center gap-3 mt-10 text-[10px] uppercase tracking-[0.4em] font-bold text-[#1A1A1A] hover:text-[#A65A44] transition-colors duration-300"
            >
              Read Full Story
              <span className="h-[1px] w-6 bg-current transition-all duration-500 group-hover:w-12" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
