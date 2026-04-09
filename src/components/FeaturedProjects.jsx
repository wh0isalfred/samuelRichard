import { Link } from 'react-router-dom';

import building1 from '../assets/Featured/Buildings/building1.png';
import building2 from '../assets/Featured/Buildings/building2.png';
// import building3 from '../assets/Featured/Buildings/building3.png';

import interior1 from '../assets/Featured/Interiors/Interior1.png';
import interior2 from '../assets/Featured/Interiors/interior2.png';
// import interior3 from '../assets/Featured/Interiors/interior3.png';

const BUILDINGS = [
  { image: building1, name: 'Lekki Waterfront Residence', location: 'Lagos', year: '2023' },
  { image: building2, name: 'Abuja Corporate Tower', location: 'Abuja', year: '2022' },
  // { image: building3, name: 'Port Harcourt Civic Centre', location: 'Port Harcourt', year: '2021' },
];

const INTERIORS = [
  { image: interior1, name: 'GRA Penthouse Suite', location: 'Port Harcourt', year: '2023' },
  { image: interior2, name: 'Maitama Family Residence', location: 'Abuja', year: '2022' },
  // { image: interior3, name: 'Victoria Island Office', location: 'Lagos', year: '2022' },
];

// Each project row — text left, image right. Alternates on even rows.
const ProjectRow = ({ image, name, location, year, index }) => {
  const isEven = index % 2 !== 0;

  
  return (
    <div
      className={`group flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-stretch border-b border-[#EFEFEF] py-10 gap-8 md:gap-16 transition-all duration-500`}
    >
      {/* Text side */}
      <div className="w-full md:w-[35%] flex flex-col justify-center gap-4">
        <p className="text-[9px] uppercase tracking-[0.5em] text-[#6B6B6B] font-semibold">
          {location} · {year}
        </p>
        <h4 className="font-['Playfair_Display'] text-2xl md:text-3xl font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#A65A44] transition-colors duration-500">
          {name}
        </h4>
        <div className="h-[1px] w-8 bg-[#A65A44] transition-all duration-500 group-hover:w-16" />
      </div>

      {/* Image side */}
      <div className="w-full md:w-[65%] overflow-hidden bg-[#D0CBC6]">
        <img
          src={image}
          alt={name}
          className="w-full h-[280px] md:h-[360px] object-cover transition duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
};

const CategoryBlock = ({ title, projects, tab }) => (
  <div className="mb-24">
    {/* Category header */}
    <div className="flex items-center gap-5 mb-4">
      <h3 className="text-[11px] uppercase tracking-[0.5em] font-bold text-[#1A1A1A] whitespace-nowrap">
        {title}
      </h3>
      <div className="flex-1 h-[1px] bg-[#E8E8E8]" />
      <Link
        to="/projects"
        state={{ tab }}
        className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] font-bold text-[#A65A44] hover:text-[#1A1A1A] transition-colors duration-300 whitespace-nowrap"
      >
        View More
        <span className="h-[1px] w-5 bg-current transition-all duration-500 group-hover:w-8" />
      </Link>
    </div>

    {/* Rows */}
    <div>
      {projects.map((p, i) => (
        <ProjectRow key={i} {...p} index={i} />
      ))}
    </div>
  </div>
);

const FeaturedProjects = () => (
  <section className="w-full bg-white py-24 md:py-36 px-6 md:px-16 lg:px-24 font-['Inter']">
    <div className="max-w-7xl mx-auto">

      {/* Section heading */}
      <div className="mb-16">
        <span className="text-[9px] uppercase tracking-[0.5em] text-[#6B6B6B] font-semibold">
          Portfolio
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-['Playfair_Display'] font-semibold text-[#1A1A1A]">
          Featured Projects
        </h2>
        <div className="mt-4 h-[2px] w-12 bg-[#A65A44]" />
      </div>

      <CategoryBlock title="Buildings" projects={BUILDINGS} tab="building" />
      <CategoryBlock title="Interiors" projects={INTERIORS} tab="interior" />

    </div>
  </section>
);

export default FeaturedProjects;
