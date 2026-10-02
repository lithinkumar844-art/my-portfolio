import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black border-t border-white/10 py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white font-sans font-bold text-lg tracking-wide">
          LK<span className="text-blue-400">.</span>
        </span>
        <p className="text-gray-500 text-xs font-mono text-center">
          © {year} Lithinkumar P. Built with React, Tailwind &amp; GSAP.
        </p>
        <div className="flex gap-5 text-xs font-mono text-gray-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#works" className="hover:text-white transition-colors">Works</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
