import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer data-animate className="bg-white border-t-2 border-[#1A1A1A] pt-16 pb-10 px-8 md:px-16 lg:px-24 font-['Inter']">
      <div className="max-w-7xl mx-auto">

        {/* TOP — Brand left, columns right */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-16">

          {/* Brand */}
          <Link to="/" className="group flex-shrink-0">
            <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold italic text-[#1A1A1A] leading-tight">
              Samuel<br />Richard
            </h2>
            <span className="mt-4 block text-[9px] uppercase tracking-[0.5em] text-[#6B6B6B] font-semibold">
              Architecture & Interior Design
            </span>
            <div className="mt-3 h-[2px] w-8 bg-[#A65A44] transition-all duration-500 group-hover:w-16" />
          </Link>

          {/* Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-20 lg:pt-2">

            <div>
              <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#A65A44] mb-6">Navigate</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Projects', path: '/projects' },
                  { label: 'About', path: '/about' },
                  { label: 'Contact', path: '/contact' },
                ].map((l) => (
                  <Link key={l.label} to={l.path} className="text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200 font-light">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#A65A44] mb-6">Contact</h4>
              <div className="flex flex-col gap-3 text-[13px] text-[#6B6B6B] font-light">
                <a href="tel:+2348000000000" className="hover:text-[#1A1A1A] transition-colors duration-200">
                  +234 800 000 0000
                </a>
                <a href="mailto:studio@samuelrichard.com" className="hover:text-[#1A1A1A] transition-colors duration-200">
                  studio@samuelrichard.com
                </a>
                <p className="leading-relaxed">
                  GRA Phase 2,<br />Port Harcourt.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#A65A44] mb-6">Social</h4>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} className="text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200 font-light">
                    {s.name}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM — Copyright + social icons */}
        <div className="border-t border-[#EFEFEF] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300 font-medium">
            &copy; {currentYear} Samuel Richard. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a key={s.name} href={s.href} className="text-gray-300 hover:text-[#A65A44] transition-colors duration-200">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
