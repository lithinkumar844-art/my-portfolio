import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    period: "Sep 2026",
    title: "GenAI Intern",
    org: "Elevance Skills",
    points: [
      "Worked on a Real-Time GenAI Customer Service Bot using Large Language Models, RAG, vector databases and Streamlit.",
      "Worked on dynamic knowledge-base expansion, multimodal AI, Medical Q&A, sentiment analysis and multilingual AI applications.",
    ],
    kind: "work",
  },
  {
    period: "Jun 2026 — Jul 2026",
    title: "Cloud Computing Internship Training",
    org: "Accent Techno Soft",
    points: [
      "Completed practical training focused on cloud computing concepts and technologies.",
      "Gained hands-on exposure to cloud-based infrastructure and modern deployment concepts.",
    ],
    kind: "work",
  },
  {
    period: "Jul 2026",
    title: "GenAI Powered Data Analytics",
    org: "Tata · Forage Virtual Experience",
    points: [
      "Completed a virtual experience focused on applying Generative AI concepts to data analytics.",
      "Worked through practical tasks involving data-driven problem solving and AI-assisted analysis.",
    ],
    kind: "work",
  },
  {
    period: "2024 — Present",
    title: "B.Tech — Artificial Intelligence & Data Science",
    org: "Kangeyam Institute of Technology",
    points: [
      "Currently pursuing B.Tech in Artificial Intelligence & Data Science.",
      "3rd Year · CGPA: 7.80",
    ],
    kind: "edu",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-item").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-black py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-blue-400 mb-4">
          Experience &amp; Education
        </p>

        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-16">
          The path so far.
        </h2>

        <div className="relative pl-10">
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/10">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 origin-top" />
          </div>

          <div className="flex flex-col gap-14">
            {timeline.map((item) => (
              <div key={`${item.period}-${item.title}`} className="timeline-item relative">
                <div
                  className={`absolute -left-[42px] top-1.5 w-3 h-3 rounded-full ${
                    item.kind === "work"
                      ? "bg-blue-400 shadow-[0_0_10px_3px_rgba(96,165,250,0.6)]"
                      : "bg-purple-400 shadow-[0_0_10px_3px_rgba(192,132,252,0.6)]"
                  }`}
                />

                <p className="font-mono text-xs tracking-widest uppercase text-gray-500 mb-1">
                  {item.period}
                </p>

                <h3 className="text-xl md:text-2xl font-sans font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-sm md:text-base text-gray-400 font-sans mb-3">
                  {item.org}
                </p>

                <ul className="space-y-1.5">
                  {item.points.map((p) => (
                    <li
                      key={p}
                      className="text-gray-300 text-sm md:text-base leading-relaxed font-sans flex gap-2"
                    >
                      <span className="text-blue-400 mt-1.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}