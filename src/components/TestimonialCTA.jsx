import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ── Edit your testimonials here ──────────────────────────────
const TESTIMONIALS = [
  {
    quote: "The space is exactly what we envisioned. Samuel understood our brief from day one and delivered beyond expectation.",
    name: "Julian Ojo",
    company: "Bella Naija",
  },
  {
    quote: "Working with Samuel was one of the best decisions we made. He brought clarity and precision to every stage of the project.",
    name: "Emeka Okafor",
    company: "Okafor & Associates",
  },
  {
    quote: "Our home feels like it was always meant to exist. The attention to detail and respect for our lifestyle was remarkable.",
    name: "Adaeze Nwosu",
    company: "Private Client",
  },
  {
    quote: "Samuel has a rare ability to balance aesthetics with function. The office space he designed has genuinely improved how our team works.",
    name: "Tunde Fashola",
    company: "Fashola Group",
  },
  {
    quote: "From brief to handover, the process was seamless. He doesn't just design buildings — he designs experiences.",
    name: "Chisom Eze",
    company: "Private Client",
  },
];
// ─────────────────────────────────────────────────────────────

const TestimonialCTA = () => {
  const [active, setActive] = useState(0);

  // Auto-cycle every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { quote, name, company } = TESTIMONIALS[active];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 font-['Inter']">

      {/* LEFT — Testimonial */}
      <div className="bg-[#FBF9F7] px-8 md:px-16 lg:px-20 py-20 md:py-28 flex flex-col justify-center border-t border-[#EFEFEF]">
        <span className="text-[9px] uppercase tracking-[0.5em] text-[#6B6B6B] font-semibold mb-8">
          What Clients Say
        </span>

        {/* Quote — fades on change */}
        <p
          key={active}
          className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1A1A1A] leading-[1.75] italic font-normal max-w-md"
          style={{ animation: 'fadeUp 0.5s ease both' }}
        >
          "{quote}"
        </p>

        <div className="h-[2px] w-8 bg-[#A65A44] my-6" />

        <p
          key={`name-${active}`}
          className="text-sm font-semibold text-[#1A1A1A] tracking-wide"
          style={{ animation: 'fadeUp 0.5s ease 0.1s both' }}
        >
          {name}
        </p>
        <p className="text-[9px] uppercase tracking-[0.4em] text-[#6B6B6B] mt-1">
          {company}
        </p>

        {/* Dots */}
        <div className="flex gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-[2px] transition-all duration-500 cursor-pointer ${
                i === active ? 'w-7 bg-[#A65A44]' : 'w-3.5 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — CTA */}
      <div className="bg-[#1A1A1A] px-8 md:px-16 lg:px-20 py-20 md:py-28 flex flex-col justify-center">
        <span className="text-[9px] uppercase tracking-[0.5em] text-[#A65A44] font-semibold mb-5">
          Let's Work Together
        </span>

        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-semibold leading-[1.2] mb-12">
          Have a project <br />
          <em className="font-normal text-[#A65A44]">in mind?</em>
        </h2>

        <Link
          to="/contact"
          className="group inline-flex items-center gap-4 bg-[#A65A44] text-white text-[9px] uppercase tracking-[0.4em] font-bold px-8 py-5 w-fit hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
        >
          Work With Us
          <span className="h-[1px] w-4 bg-current transition-all duration-300 group-hover:w-7" />
        </Link>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TestimonialCTA;
