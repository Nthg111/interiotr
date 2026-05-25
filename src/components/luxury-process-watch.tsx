"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Quote, Ruler, Hammer, Boxes } from "lucide-react";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";

export type LuxuryProcessWatchProps = {
  onOpen?: (i: number) => void;
  activeMicro?: number | null;
  onMicroHover?: (i: number | null) => void;
};

const MICRO_STEPS = [
  "Consultation",
  "Site Visit",
  "Moodboarding",
  "Layout Planning",
  "Design",
  "Material Selection",
  "3D Visualization",
  "Fabrication",
  "Execution",
  "Site Coordination",
  "Installation",
  "Final Handover",
];

export default function LuxuryProcessWatch({ onOpen, activeMicro, onMicroHover }: LuxuryProcessWatchProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainHandRef = useRef<HTMLDivElement | null>(null);
  const thinHandRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const allSteps = useMemo(() => MICRO_STEPS, []);

  useEffect(() => {
    if (prefersReduced) return;
    const el = containerRef.current;
    if (!el) return;
          const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          tl.to(centerRef.current, { rotate: 360, duration: 1.2, ease: "power3.out" });
          tl.fromTo(
            mainHandRef.current,
            { rotate: -360 },
            { rotate: 0, duration: 1.4, ease: "elastic.out(1,0.6)" },
            "<"
          );
          tl.fromTo(
            thinHandRef.current,
            { rotate: -240 },
            { rotate: 0, duration: 1.2, ease: "power3.out" },
            "<0.05"
          );
          tl.to(el.querySelectorAll('.lux-mini'), { scale: 1, opacity: 1, stagger: 0.04, ease: 'back.out(1.2)' }, '<0.2');
          tl.fromTo(el.querySelectorAll('.lux-major'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.18, duration: 0.8, ease: 'power2.out' }, '<0.1');
          obs.disconnect();
        }
      }
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReduced]);

  const handleHover = (i: number | null) => {
    setActive(i);
    onMicroHover?.(i);
    if (prefersReduced) return;
    if (i === null) return;
    const angle = (i / allSteps.length) * 360;
    gsap.to(mainHandRef.current, { rotate: angle - 90, duration: 0.6, ease: 'power3.out' });
    gsap.to(thinHandRef.current, { rotate: angle - 90 + 4, duration: 0.8, ease: 'power3.out' });
  };

  useEffect(() => {
    if (typeof activeMicro === 'number') {
      handleHover(activeMicro);
    } else if (activeMicro === null) {
      handleHover(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMicro]);

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <div className="process-frame p-6 relative max-w-[640px] mx-auto">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-b from-black/40 to-black/20 opacity-30 blur-[40px]" />
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative">
            <svg viewBox="0 0 420 420" className="w-[420px] h-[420px]">
              <defs>
                <radialGradient id="goldGrad" cx="50%" cy="30%">
                  <stop offset="0%" stopColor="#fff7ea" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c7a66e" stopOpacity="0.15" />
                </radialGradient>
                <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* outer decorative rings */}
              <circle cx="210" cy="210" r="190" fill="none" stroke="#0b0b0b" strokeWidth={2} />
              <circle cx="210" cy="210" r="182" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth={1} />
              <circle cx="210" cy="210" r="168" fill="url(#goldGrad)" opacity="0.03" />
              <circle cx="210" cy="210" r="174" fill="none" stroke="rgba(199,166,110,0.06)" strokeWidth={1} />

              {/* tick marks */}
              {Array.from({ length: 60 }).map((_, i) => {
                const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
                const r1 = 168;
                const r2 = i % 5 === 0 ? 150 : 160;
                const x1 = 210 + Math.cos(a) * r1;
                const y1 = 210 + Math.sin(a) * r1;
                const x2 = 210 + Math.cos(a) * r2;
                const y2 = 210 + Math.sin(a) * r2;
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 5 === 0 ? '#c7a66e66' : '#ffffff10'} strokeWidth={i % 5 === 0 ? 1.2 : 0.6} strokeLinecap="round" />
                );
              })}

              {/* major markers (4) */}
              {[0, 3, 6, 9].map((pos, idx) => {
                const a = (pos / 12) * Math.PI * 2 - Math.PI / 2;
                const r = 120;
                const x = 210 + Math.cos(a) * r;
                const y = 210 + Math.sin(a) * r;
                const label = idx === 0 ? 'Consultation' : idx === 1 ? 'Design' : idx === 2 ? 'Execution' : 'Delivery';
                return (
                  <g key={pos} className="lux-major" transform={`translate(${x},${y})`}>
                    <g className="lux-major-badge">
                      <circle cx={0} cy={0} r={26} fill="#0b0b0b" stroke="#c7a66e22" strokeWidth={1} />
                      <circle cx={0} cy={0} r={18} fill="url(#goldGrad)" opacity={0.06} />
                      <circle cx={0} cy={0} r={10} fill="#0b0b0b" stroke="#ffffff08" />
                      {/* simple icon placeholders */}
                      {idx === 0 && (
                        <Quote size={18} color="#c7a66e" />
                      )}
                      {idx === 1 && (
                        <Ruler size={18} color="#c7a66e" />
                      )}
                      {idx === 2 && (
                        <Hammer size={18} color="#c7a66e" />
                      )}
                      {idx === 3 && (
                        <Boxes size={18} color="#c7a66e" />
                      )}
                    </g>
                    <text x={0} y={44} fill="#c7a66e" fontSize={10} fontFamily="serif" textAnchor="middle">{label}</text>
                  </g>
                );
              })}

              {/* micro markers */}
              {allSteps.map((m, i) => {
                const a = (i / allSteps.length) * Math.PI * 2 - Math.PI / 2;
                const r = 138;
                const x = 210 + Math.cos(a) * r;
                const y = 210 + Math.sin(a) * r;
                return (
                  <g key={m} transform={`translate(${x},${y})`}>
                    <circle
                      className="lux-mini opacity-0"
                      cx={0}
                      cy={0}
                      r={6}
                      fill="#ffffff10"
                      stroke="#c7a66e1a"
                      strokeWidth={1}
                    />
                    {/* small engraved numbers for a subset of indices */}
                    {([0,1,3,4,6,7,9,10] as number[]).includes(i) ? (
                      <text x={0} y={2} textAnchor="middle" fontSize={9} fontFamily="serif" fill="#ffffffaa">{String(i + 1)}</text>
                    ) : null}
                  </g>
                );
              })}

              {/* glass reflection path */}
              <g>
                <path d="M60,40 C160,10 260,10 360,40 L360,60 C260,30 160,30 60,60 Z" fill="rgba(255,255,255,0.03)" />
              </g>
            </svg>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div ref={mainHandRef as any} className="origin-bottom absolute h-[140px] w-[10px] rounded-[8px] bg-gradient-to-b from-[#c7a66e] to-[#c7a66e]/60 shadow-[0_40px_80px_-40px_rgba(199,166,110,0.25)]" style={{ bottom: '50%', left: '50%', transformOrigin: '50% 100%' }} />
              <div ref={thinHandRef as any} className="origin-bottom absolute h-[92px] w-[4px] rounded-[4px] bg-white/90 opacity-90" style={{ bottom: '50%', left: '50%', transformOrigin: '50% 100%' }} />
              <div ref={centerRef as any} className="absolute h-8 w-8 rounded-full bg-[radial-gradient(circle,#fff7ea,rgba(199,166,110,0.12))] border border-white/8" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
          </div>

          {/* interactive micro markers overlay for hover/click */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-[420px] h-[420px]">
              {allSteps.map((m, i) => {
                const a = (i / allSteps.length) * Math.PI * 2 - Math.PI / 2;
                const r = 138;
                const x = Math.cos(a) * r;
                const y = Math.sin(a) * r;
                const isActive = active === i;
                return (
                  <div
                    key={m}
                    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  >
                    <button
                      onMouseEnter={() => handleHover(i)}
                      onFocus={() => handleHover(i)}
                      onMouseLeave={() => handleHover(null)}
                      onBlur={() => handleHover(null)}
                      onClick={() => onOpen?.(i)}
                      className={`rounded-full transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] ${isActive ? 'scale-125 bg-[rgba(199,166,110,0.95)] shadow-[0_10px_30px_-10px_rgba(199,166,110,0.25)]' : 'bg-white/8'}`}
                      style={{ width: isActive ? 14 : 8, height: isActive ? 14 : 8 }}
                    />
                    {isActive ? (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="absolute left-6 top-0 z-40 rounded-md bg-black/80 px-2 py-1 text-xs text-[color:var(--muted)]">
                        {m}
                      </motion.div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* engraved rim text and screws */}
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 420 420" className="w-full h-full">
            <defs>
              <path id="rimTextPath" d="M210,30 a180,180 0 1,1 -0.1,0" />
            </defs>
            <text fontSize={10} fontFamily="serif" fill="#ffffff10">
              <textPath href="#rimTextPath" startOffset="5%">PRIVILEGED PROCESS — TIME IS OUR CRAFT — PRIVILEGED PROCESS —</textPath>
            </text>
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              const r = 188;
              const x = 210 + Math.cos(a) * r;
              const y = 210 + Math.sin(a) * r;
              return <circle key={i} cx={x} cy={y} r={3} fill="#ffffff06" />;
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
