import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3rd", label: "Year B.Tech Student" },
  { value: "7.80", label: "Current CGPA" },
  { value: "6+", label: "Major Projects & Concepts" },
  { value: "2026", label: "IEEE Day Ambassador" },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.utils.toArray(".about-stat").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-black py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-blue-400 mb-4">
          About
        </p>

        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-12 max-w-2xl leading-tight">
          Turning data, technology and ideas into digital solutions.
        </h2>

        <div
          ref={cardRef}
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
        >
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-sans">
            I'm Lithinkumar P, a 3rd-year B.Tech Artificial Intelligence &
            Data Science student at Kangeyam Institute of Technology. I'm
            interested in Data Analytics, Generative AI, Cloud Computing and
            modern software development, with a focus on building practical
            technology solutions.
          </p>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-sans mt-4">
            Alongside academics, I work with Java, Python, SQL, Generative AI,
            LLMs, RAG, AI Agents, AWS, Google Cloud and modern development
            tools. I also contribute to technical communities through
            leadership, event management and IEEE activities.
          </p>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-sans mt-4">
            From projects like NEERX and Dynamic RAG Chatbot to internships
            and technology initiatives, I enjoy learning by building and
            turning ideas into useful digital experiences.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="about-stat">
                <p className="text-2xl md:text-3xl font-sans font-bold text-white drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]">
                  {s.value}
                </p>

                <p className="text-xs md:text-sm text-gray-400 font-sans mt-1 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
