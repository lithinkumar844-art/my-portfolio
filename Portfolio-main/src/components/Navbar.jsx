import React, { useState, useEffect } from 'react';

const links = ['Home', 'About', 'Expertise', 'Experience', 'Works', 'Contact'];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 rounded-2xl bg-[#050505]/40 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300">

      {/* Subtle floating particles confined to navbar background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none mix-blend-screen opacity-50">
        <div className="w-1 h-1 bg-white rounded-full absolute top-[20%] left-[10%] animate-pulse shadow-[0_0_8px_1px_white]"></div>
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full absolute top-[70%] left-[80%] animate-bounce shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]" style={{ animationDuration: '4s' }}></div>
        <div className="w-1 h-1 bg-purple-400 rounded-full absolute top-[40%] left-[50%] animate-ping shadow-[0_0_8px_2px_rgba(192,132,252,0.8)]" style={{ animationDuration: '5s' }}></div>
      </div>

      <div className="relative z-10 px-6 py-4 flex items-center justify-between">

        {/* Left: Logo */}
        <a href="#home" className="flex-shrink-0 cursor-pointer">
          <span className="text-white font-sans font-bold text-2xl tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)] transition-all duration-300">
            LK<span className="text-blue-400">.</span>
          </span>
        </a>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-200 font-sans font-medium text-sm tracking-wide transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="flex-shrink-0 hidden md:block">
          <a
            href="#contact"
            className="relative overflow-hidden group px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] inline-block"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-[1.5px] bg-white transition-transform duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`h-[1.5px] bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}></span>
            <span className={`h-[1.5px] bg-white transition-transform duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden relative z-10 flex flex-col items-center gap-6 pb-8 pt-2">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-gray-200 font-sans font-medium text-base tracking-wide hover:text-white"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-sans font-semibold text-sm"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;