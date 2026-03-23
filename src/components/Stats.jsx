import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '400+', label: 'Projects Completed' },
    { number: '27+', label: 'Years Experience' },
    { number: '400+', label: 'Happy Clients' },
    { number: '100%', label: 'Satisfaction' },
  ];

  return (
    <section className="w-full bg-white py-20 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            /* Animation: Staggered Fade In Up */
            className="group flex flex-col items-center md:items-start text-center md:text-left transition-all duration-1000 ease-out"
            style={{ 
              animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both` 
            }}
          >
            {/* The Number */}
            <h2 className="text-[#1A1A1A] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-transform duration-500 group-hover:-translate-y-2">
              {stat.number}
            </h2>
            
            {/* Subtle Divider Line that grows on hover */}
            <div className="h-[2px] w-8 bg-[#A65A44] mt-3 mb-2 transition-all duration-500 group-hover:w-16"></div>
            
            {/* The Label */}
            <p className="text-gray-400 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Adding the necessary Keyframes in a style tag or your global CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;