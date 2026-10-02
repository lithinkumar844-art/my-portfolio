import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Hero frame sequence is stored in /public/hero_frames_200_SORTED/hero_frames_200
  with files named 001.jpg, 002.jpg ... 200.jpg.

  This component reads that sequence directly so the actual frames are shown
  instead of the procedural fallback animation.
*/
const FRAME_COUNT = 200;
const frameSrc = (index) => `${import.meta.env.BASE_URL}hero_frames_200_SORTED/hero_frames_200/${(index + 1).toString().padStart(3, "0")}.jpg`;

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const [usingFrames, setUsingFrames] = useState(null); // null = unknown, true/false once resolved

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 15 + 15}s`,
      delay: `${Math.random() * -30}s`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const images = [];
    const sequence = { frame: 0 };
    let framesReady = false;

    // Probe whether real frame assets exist. If frame-001 fails to load,
    // we stay in procedural-gradient mode.
    const probe = new window.Image();
    probe.onload = () => {
      framesReady = true;
      setUsingFrames(true);
    };
    probe.onerror = () => {
      framesReady = false;
      setUsingFrames(false);
    };
    probe.src = frameSrc(0);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      images.push(img);
    }

    // Procedural fallback palette: deep space -> blue -> violet -> magenta
    const stops = [
      { r: 5, g: 5, b: 10 },
      { r: 30, g: 41, b: 99 },
      { r: 88, g: 28, b: 135 },
      { r: 15, g: 8, b: 20 },
    ];
    const lerp = (a, b, t) => a + (b - a) * t;
    const mixColor = (t) => {
      const scaled = t * (stops.length - 1);
      const i = Math.min(Math.floor(scaled), stops.length - 2);
      const localT = scaled - i;
      const a = stops[i];
      const b = stops[i + 1];
      return {
        r: lerp(a.r, b.r, localT),
        g: lerp(a.g, b.g, localT),
        b: lerp(a.b, b.b, localT),
      };
    };

    const renderFallback = (progress) => {
      const w = canvas.width;
      const h = canvas.height;
      const c = mixColor(progress);
      const grad = context.createRadialGradient(
        w * (0.3 + 0.4 * Math.sin(progress * Math.PI)),
        h * (0.4 + 0.2 * Math.cos(progress * Math.PI * 1.3)),
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      grad.addColorStop(0, `rgba(${c.r + 40},${c.g + 40},${c.b + 60},0.9)`);
      grad.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},0.85)`);
      grad.addColorStop(1, `rgba(0,0,0,1)`);
      context.fillStyle = "#000";
      context.fillRect(0, 0, w, h);
      context.fillStyle = grad;
      context.fillRect(0, 0, w, h);

      // Faint moving grid lines for a "signal" feel
      context.strokeStyle = `rgba(255,255,255,${0.03 + 0.02 * Math.sin(progress * Math.PI * 4)})`;
      context.lineWidth = 1;
      const spacing = 48;
      const offset = (progress * spacing * 4) % spacing;
      for (let x = -spacing; x < w + spacing; x += spacing) {
        context.beginPath();
        context.moveTo(x + offset, 0);
        context.lineTo(x + offset, h);
        context.stroke();
      }
    };

    const render = () => {
      const progress = sequence.frame / (FRAME_COUNT - 1);
      if (framesReady) {
        const img = images[sequence.frame];
        if (img && img.complete && img.naturalWidth > 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.max(scaleX, scaleY);
          const x = canvas.width / 2 - (img.width / 2) * scale;
          const y = canvas.height / 2 - (img.height / 2) * scale;
          context.drawImage(img, x, y, img.width * scale, img.height * scale);
          return;
        }
      }
      renderFallback(progress);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=2000",
      },
    });

    tl.to(
      sequence,
      {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        duration: 240,
        onUpdate: () => requestAnimationFrame(render),
      },
      0
    );

    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0 });

    // --- Block 1: Name ---
    tl.fromTo(text1Ref.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 20, ease: "power2.out" }, 60);
    tl.to(text1Ref.current, { opacity: 0, y: -15, duration: 20, ease: "power2.in" }, 100);

    // --- Block 2: Role ---
    tl.fromTo(text2Ref.current, { opacity: 0 }, { opacity: 1, duration: 20, ease: "power1.inOut" }, 120);
    tl.to(text2Ref.current, { opacity: 0, duration: 20, ease: "power1.inOut" }, 180);

    // --- Block 3: Tagline ---
    tl.fromTo(text3Ref.current, { opacity: 0 }, { opacity: 1, duration: 20, ease: "power1.inOut" }, 200);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      id="home"
      ref={containerRef}
      className="w-full h-screen bg-[#000000] overflow-hidden relative flex items-center justify-center p-0 m-0"
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <canvas ref={canvasRef} className="w-full h-full block relative z-10 opacity-80" />

      <div className="absolute inset-0 flex flex-col justify-center z-20 pointer-events-none text-white tracking-wide px-6">
        <h1
          ref={text1Ref}
          className="absolute left-6 md:left-16 text-5xl md:text-7xl font-sans font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          Hi, I'm Lithinkumar
        </h1>
        <h2
          ref={text2Ref}
          className="absolute left-6 md:left-16 text-4xl md:text-6xl font-sans font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] tracking-wider"
        >
          Data Science Student
        </h2>
        <h3
          ref={text3Ref}
          className="absolute left-6 md:left-16 max-w-3xl text-4xl md:text-6xl font-sans font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] tracking-wide leading-tight"
        >
          Building data-driven solutions <br />
          with AI, analytics &amp; cloud
        </h3>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60 pointer-events-none">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-300 font-sans">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/60 to-transparent"></div>
      </div>
    </div>
  );
}