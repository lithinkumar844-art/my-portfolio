import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "NEERX",
    subtitle: "Autonomous River Cleaning & Water Quality Monitoring Robot",
    stack: [
      "Python",
      "IoT",
      "Sensors",
      "Automation",
      "Data Analytics",
      "Embedded Systems",
    ],
    metric: "Smart environmental monitoring",
    points: [
      "Autonomous floating robot designed to collect floating waste and aquatic weeds from polluted water bodies.",
      "Integrates pH, turbidity, TDS, EC, dissolved oxygen, temperature and other water-quality sensors for real-time monitoring.",
      "Designed with dedicated waste collection compartments and an automated navigation and cleaning workflow.",
    ],
    gradient: "from-blue-600/40 via-blue-900/20 to-black",
    size: "large",
  },
  {
    title: "Dynamic RAG Chatbot",
    subtitle: "Real-Time Retrieval-Augmented AI Assistant",
    stack: [
      "Python",
      "LangChain",
      "Streamlit",
      "ChromaDB",
      "LLM",
      "RAG",
    ],
    metric: "Dynamic knowledge retrieval",
    points: [
      "Built a document-based conversational AI system using Retrieval-Augmented Generation.",
      "Uses LangChain and ChromaDB for document processing, embeddings and vector-based retrieval.",
      "Designed to provide context-aware responses from dynamically added knowledge sources through a Streamlit interface.",
    ],
    gradient: "from-purple-600/40 via-purple-900/20 to-black",
    size: "small",
  },
  {
    title: "CivicPulse",
    subtitle: "Digital Civic Engagement & Community Solution",
    stack: [
      "Python",
      "Data Analytics",
      "Web Development",
      "Database",
      "UI/UX",
    ],
    metric: "Technology for civic impact",
    points: [
      "Designed a digital platform concept focused on improving communication between citizens and civic systems.",
      "Organizes community-related information into a more accessible and user-friendly digital experience.",
      "Combines data-driven insights with a simple interface to support better civic interaction.",
    ],
    gradient: "from-pink-600/40 via-pink-900/20 to-black",
    size: "small",
  },
];

export default function Works() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".work-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (i % 3) * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative w-full bg-black py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-blue-400 mb-4">
          Works
        </p>

        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-16">
          Selected projects.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`work-card group relative rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br ${
                p.gradient
              } p-8 md:p-10 flex flex-col justify-between min-h-[380px] ${
                p.size === "large"
                  ? "md:col-span-2 md:min-h-[420px]"
                  : ""
              }`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 backdrop-blur-[1px] pointer-events-none" />

              <div className="relative z-10">
                <p className="font-mono text-xs tracking-widest uppercase text-white/60 mb-2">
                  {p.subtitle}
                </p>

                <h3 className="text-2xl md:text-3xl font-sans font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {p.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/20 text-gray-200 bg-black/30"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <ul className="space-y-2 mb-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="text-sm text-gray-200 leading-relaxed font-sans"
                    >
                      — {pt}
                    </li>
                  ))}
                </ul>

                <p className="text-lg font-sans font-bold text-white drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                  {p.metric}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}