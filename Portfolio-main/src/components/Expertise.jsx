import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    tag: "01",
    title: "Programming & Development",
    desc: "Java, Python, SQL, Git and GitHub — building software solutions, working with databases, developing applications, and solving programming problems.",
    accent: "from-blue-500/30 to-blue-500/0",
  },
  {
    tag: "02",
    title: "Data Analytics",
    desc: "Data analysis, data processing, visualization and insight generation using Python, SQL, Excel and analytical tools to transform data into meaningful information.",
    accent: "from-purple-500/30 to-purple-500/0",
  },
  {
    tag: "03",
    title: "Generative AI & LLMs",
    desc: "Generative AI, Large Language Models, Prompt Engineering, Retrieval-Augmented Generation, AI Agents, LangChain, vector databases and conversational AI applications.",
    accent: "from-pink-500/30 to-pink-500/0",
  },
  {
    tag: "04",
    title: "Cloud & Modern Technologies",
    desc: "Cloud Computing with AWS and Google Cloud, Docker, FastAPI, Streamlit, MongoDB, ChromaDB and modern development tools for building and deploying digital solutions.",
    accent: "from-cyan-500/30 to-cyan-500/0",
  },
];

export default function Expertise() {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = cardRefs.current.length;

      cardRefs.current.forEach((card, i) => {
        if (i === 0) return;

        gsap.set(card, {
          yPercent: 100,
          opacity: 1,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${total * 600}`,
          scrub: 1,
          pin: true,
        },
      });

      cardRefs.current.forEach((card, i) => {
        if (i === 0) return;

        // Incoming card rises to the front
        tl.to(
          card,
          {
            yPercent: 0,
            ease: "power2.out",
            duration: 1,
          },
          i - 1
        );

        // Previous card moves back
        tl.to(
          cardRefs.current[i - 1],
          {
            scale: 0.82,
            y: -80,
            filter: "brightness(0.35) blur(6px)",
            ease: "power1.out",
            duration: 1,
          },
          i - 1
        );

        // Fade previous card after incoming card arrives
        tl.to(
          cardRefs.current[i - 1],
          {
            opacity: 0,
            filter: "brightness(0.2) blur(10px)",
            ease: "power1.in",
            duration: 0.6,
          },
          i
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={wrapperRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      <div className="absolute top-10 left-6 md:left-16 z-30">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-blue-400 mb-2">
          Expertise
        </p>

        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white">
          What I work with.
        </h2>
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        {cards.map((c, i) => (
          <div
            key={c.tag}
            ref={(el) => (cardRefs.current[i] = el)}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div
              className={`relative w-full max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br ${c.accent} bg-white/[0.03] backdrop-blur-md p-10 md:p-16 shadow-[0_0_60px_rgba(0,0,0,0.6)]`}
            >
              <span className="font-mono text-6xl md:text-8xl font-bold text-white/10 absolute top-6 right-8 select-none">
                {c.tag}
              </span>

              <h3 className="text-2xl md:text-4xl font-sans font-bold text-white mb-4 relative z-10">
                {c.title}
              </h3>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl relative z-10 font-sans">
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}