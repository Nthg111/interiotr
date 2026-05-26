"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const handsGroupRef = useRef<SVGGElement | null>(null);
  const ringOuterRef = useRef<SVGGElement | null>(null);
  const ringInnerRef = useRef<SVGGElement | null>(null);
  const axleRef = useRef<SVGGElement | null>(null);
  const sweepRef = useRef<SVGGElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const allSteps = useMemo(() => MICRO_STEPS, []);
  const [activeMajor, setActiveMajor] = useState<number | null>(null);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'detail'>('dashboard');

  const majorInfo = [
    { title: 'Consultation', detail: 'We start with you — understanding needs, preferences, and the essence of your space.' },
    { title: 'Design', detail: 'Concept exploration, space planning and 3D visualisation.' },
    { title: 'Execution', detail: 'Site execution, coordination and quality control.' },
    { title: 'Delivery', detail: 'Final handover, styling, and walkthrough.' },
  ];

  const MAJORS = [
    { key: 'Consultation', detail: majorInfo[0].detail },
    { key: 'Design', detail: majorInfo[1].detail },
    { key: 'Execution', detail: majorInfo[2].detail },
    { key: 'Delivery', detail: majorInfo[3].detail },
  ];

  useEffect(() => {
    if (prefersReduced) return;
    const el = containerRef.current;
    if (!el) return;
          const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          // Entrance choreography: bezel sweep, rings rotate, axle spin, quadrant glow
          tl.to(ringOuterRef.current, { rotation: 6, duration: 1.1, ease: 'power2.out' }, 0);
          tl.to(ringInnerRef.current, { rotation: -8, duration: 1.3, ease: 'power2.out' }, 0);
          tl.fromTo(axleRef.current, { rotation: -360 }, { rotation: 0, duration: 1.6, ease: 'elastic.out(1,0.6)' }, 0);
          tl.to(el.querySelectorAll('.lux-pin'), { scale: 1, opacity: 1, stagger: 0.03, ease: 'back.out(1.2)' }, 0.15);
          tl.to(el.querySelectorAll('.lux-quad'), { opacity: 1, stagger: 0.18, duration: 0.8, ease: 'power2.out' }, 0.2);
          // rim sweep intro and looping subtle sweep
          if (sweepRef.current) {
            tl.fromTo(sweepRef.current, { opacity: 0, x: -380 }, { opacity: 0.7, x: 380, duration: 1.4, ease: 'power3.out' }, 0.05);
            gsap.to(sweepRef.current, { x: -380, delay: 1.8, repeat: -1, duration: 5.2, ease: 'sine.inOut' });
          }
          // ensure hands group has correct transform origin for rotations
          if (handsGroupRef.current) gsap.set(handsGroupRef.current, { transformOrigin: '380px 380px' });
          if (ringInnerRef.current) gsap.set(ringInnerRef.current, { transformOrigin: '380px 380px' });
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
    const angle = (i / allSteps.length) * 360 - 90;
    // rotate the hands group (all hands move together)
    if (handsGroupRef.current) gsap.to(handsGroupRef.current, { rotation: angle, duration: 0.9, ease: 'power3.out' });
    // subtle inner ring parallax
    if (ringInnerRef.current) gsap.to(ringInnerRef.current, { rotation: -angle * 0.06, duration: 1.2, ease: 'power2.out' });
    // highlight corresponding quadrant softly
    const quadIndex = Math.floor((i / allSteps.length) * 4) % 4;
    const quads = containerRef.current?.querySelectorAll('.lux-quad');
    quads?.forEach((q, idx) => {
      if (idx === quadIndex) gsap.to(q, { opacity: 1, filter: 'drop-shadow(0 10px 30px rgba(199,166,110,0.12))', duration: 0.45 });
      else gsap.to(q, { opacity: 0.25, duration: 0.45 });
    });
  };

  useEffect(() => {
    if (typeof activeMicro === 'number') {
      handleHover(activeMicro);
    } else if (activeMicro === null) {
      handleHover(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMicro]);

  // navigate to detail view for a major quadrant
  const openMajorDetail = (idx: number) => {
    setActiveMajor(idx);
    setActiveDetail(MAJORS[idx].detail);
    setView('detail');
    const midAngle = ((idx + 0.5) / 4) * 360 - 90; // center of quadrant
    if (!prefersReduced && handsGroupRef.current) {
      gsap.to(handsGroupRef.current, { rotation: midAngle, duration: 1.0, ease: 'power3.out' });
    }
  };

  const closeDetail = () => {
    setView('dashboard');
    setActiveMajor(null);
    setActiveDetail(null);
    if (!prefersReduced && handsGroupRef.current) gsap.to(handsGroupRef.current, { rotation: 0, duration: 0.9, ease: 'power3.out' });
  };

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center" style={{ fontFamily: "Cinzel, 'Playfair Display', Georgia, serif" }}>
      <div className="process-frame p-6 relative max-w-[760px] mx-auto">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[760px] h-[760px] rounded-full bg-gradient-to-b from-black/40 to-black/20 opacity-30 blur-[80px]" />
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative">
            <svg viewBox="0 0 760 760" className="w-[720px] h-[720px] max-w-full">
              <defs>
                <radialGradient id="goldGrad" cx="50%" cy="30%">
                  <stop offset="0%" stopColor="#fff7ea" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#c7a66e" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.02" />
                </radialGradient>
                <linearGradient id="bevelGrad" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#0f1112" stopOpacity="0.98" />
                  <stop offset="50%" stopColor="#161616" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0b0b0b" stopOpacity="0.98" />
                </linearGradient>
                <radialGradient id="screwGrad" cx="35%" cy="30%">
                  <stop offset="0%" stopColor="#d9caa6" stopOpacity="0.98" />
                  <stop offset="60%" stopColor="#7a6a52" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#201a18" stopOpacity="0.85" />
                </radialGradient>
                <filter id="screwShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.6" />
                </filter>
                <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="10" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* outer bezel */}
              <g ref={ringOuterRef as any}>
                <circle cx="380" cy="380" r="350" fill="url(#bevelGrad)" stroke="#000" strokeWidth={6} />
                <circle cx="380" cy="380" r="336" fill="#0b0b0b" />
                <circle cx="380" cy="380" r="330" fill="none" stroke="#c7a66e33" strokeWidth={2} />
              </g>

              {/* rotating decorative rings (inner/outer) */}
              <g ref={ringInnerRef as any}>
                <circle cx="380" cy="380" r="260" fill="url(#goldGrad)" opacity="0.02" />
                {/* thin engraved ticks */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
                  const r1 = 300;
                  const r2 = i % 5 === 0 ? 280 : 290;
                  const x1 = 380 + Math.cos(a) * r1;
                  const y1 = 380 + Math.sin(a) * r1;
                  const x2 = 380 + Math.cos(a) * r2;
                  const y2 = 380 + Math.sin(a) * r2;
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 5 === 0 ? '#c7a66e55' : '#ffffff10'} strokeWidth={i % 5 === 0 ? 1.6 : 0.7} strokeLinecap="round" />
                  );
                })}
              </g>

              {/* quadrant arcs for the 4 major process segments (clickable) */}
              {MAJORS.map((m, idx) => {
                const start = (idx / 4) * Math.PI * 2 - Math.PI / 2;
                const end = ((idx + 1) / 4) * Math.PI * 2 - Math.PI / 2;
                const r = 220;
                const x1 = 380 + Math.cos(start) * r;
                const y1 = 380 + Math.sin(start) * r;
                const x2 = 380 + Math.cos(end) * r;
                const y2 = 380 + Math.sin(end) * r;
                const large = 0;
                const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
                // label position (midpoint)
                const mid = (start + end) / 2;
                const labelR = 240;
                const lx = 380 + Math.cos(mid) * labelR;
                const ly = 380 + Math.sin(mid) * labelR;
                return (
                  <g key={m.key} className="lux-quad-group" onClick={() => openMajorDetail(idx)} style={{ cursor: 'pointer' }}>
                    <path d={path} className="lux-quad" stroke="#c7a66e22" strokeWidth={8} fill="none" opacity={0.45} strokeLinecap="round" />
                    <text x={lx} y={ly + (idx === 0 ? -6 : 6)} fontSize={14} fontFamily="Cinzel, Playfair Display, serif" fill="#c7a66e" textAnchor="middle" alignmentBaseline="middle" style={{ pointerEvents: 'none', letterSpacing: '0.06em' }}>{m.key.toUpperCase()}</text>
                  </g>
                );
              })}

              {/* micro process pins (dots) - no text labels */}
              {allSteps.map((m, i) => {
                const a = (i / allSteps.length) * Math.PI * 2 - Math.PI / 2;
                const r = 280;
                const x = 380 + Math.cos(a) * r;
                const y = 380 + Math.sin(a) * r;
                return (
                  <g key={i} transform={`translate(${x},${y})`}>
                    <circle className="lux-pin" cx={0} cy={0} r={6} fill="#000" stroke="#c7a66e" strokeWidth={1} opacity={0.95} style={{ transformOrigin: '0px 0px', transformBox: 'fill-box', transform: 'scale(0.9)'}} />
                    <circle cx={0} cy={0} r={2} fill="#c7a66e" opacity={0.9} />
                  </g>
                );
              })}

              {/* inner vaulted dial + glass */}
              <g>
                <circle cx="380" cy="380" r="200" fill="#0a0a0a" stroke="#000" strokeWidth={1} />
                <circle cx="380" cy="380" r="170" fill="#0b0b0b" stroke="#111" strokeWidth={0.5} />
                {/* floating glass reflection */}
                <g ref={sweepRef as any} style={{ opacity: 0 }}>
                  <ellipse cx="420" cy="230" rx="220" ry="60" fill="rgba(255,255,255,0.03)" />
                </g>
              </g>
              {/* hands + axle (SVG) */}
              <g ref={handsGroupRef as any} style={{ transformBox: 'fill-box', transformOrigin: '380px 380px' }}>
                {/* thick gold hand */}
                <path d="M380 380 L380 140 C384 136 392 136 396 140 L396 380 Z" fill="#c7a66e" opacity="0.98" stroke="#6b532f" strokeWidth={0.5} />
                {/* thin silver hand */}
                <path d="M380 380 L380 170 C382 168 386 168 388 170 L388 380 Z" fill="#e6e6e6" opacity="0.95" stroke="#a9a9a9" strokeWidth={0.4} />
                {/* ultra-thin seconds hand */}
                <path d="M380 380 L380 120" stroke="#ffd" strokeWidth={1} opacity={0.9} strokeLinecap="round" />
              </g>

              <g ref={axleRef as any}>
                <circle cx="380" cy="380" r="16" fill="#0b0b0b" stroke="#c7a66e" strokeWidth={1.2} />
                <circle cx="380" cy="380" r="6" fill="#0b0b0b" />
              </g>

            </svg>

            {/* center/detail overlay — switches between dashboard and detail views */}
            {view === 'dashboard' ? (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[260px] h-[140px] flex items-center justify-center">
                  {activeDetail ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-none text-center px-3">
                      <p className="text-sm text-[color:var(--muted)]">{activeDetail}</p>
                    </motion.div>
                  ) : activeMajor !== null ? (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-none text-center px-3">
                      <p className="text-sm text-[color:var(--muted)]">{majorInfo[activeMajor].title}</p>
                      <p className="mt-2 text-xs text-[color:var(--muted)] max-w-[260px]">{majorInfo[activeMajor].detail}</p>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-auto">
                <div className="bg-black/85 p-8 rounded-2xl max-w-[760px] mx-4 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-serif tracking-wider">{activeMajor !== null ? MAJORS[activeMajor].key : 'DETAIL'}</h2>
                      <p className="mt-3 text-sm text-white/80 max-w-[520px]">{activeMajor !== null ? MAJORS[activeMajor].detail : 'Select a stage to view details.'}</p>
                    </div>
                    <div>
                      <button onClick={closeDetail} className="ml-4 text-sm text-white/70 hover:text-white">Back</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* interactive micro markers overlay for hover/click */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-[720px] h-[720px]">
              {allSteps.map((m, i) => {
                const a = (i / allSteps.length) * Math.PI * 2 - Math.PI / 2;
                const r = 280;
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
                      onClick={() => {
                        onOpen?.(i);
                        setActiveDetail(allSteps[i]);
                        // rotate hands precisely to micro index
                        if (!prefersReduced) {
                          const angle = (i / allSteps.length) * 360 - 90;
                          if (handsGroupRef.current) gsap.to(handsGroupRef.current, { rotation: angle, duration: 0.8, ease: 'power3.out' });
                        }
                      }}
                      className={`rounded-full transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] focus:outline-none focus-visible:ring-0 ${isActive ? 'scale-125 bg-[rgba(199,166,110,0.95)] shadow-[0_10px_30px_-10px_rgba(199,166,110,0.25)]' : 'bg-white/8'}`}
                      style={{ width: isActive ? 18 : 10, height: isActive ? 18 : 10 }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* engraved rim text and screws */}
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 760 760" className="w-full h-full">
            <defs>
              <radialGradient id="screwGradSmall" cx="35%" cy="30%">
                <stop offset="0%" stopColor="#d9caa6" stopOpacity="0.98" />
                <stop offset="60%" stopColor="#7a6a52" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#201a18" stopOpacity="0.85" />
              </radialGradient>
              <filter id="screwShadowSmall" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.6" />
              </filter>
              <path id="rimTextPathLarge" d="M380,40 a340,340 0 1,1 -0.1,0" />
            </defs>
            <text fontSize={12} fontFamily="serif" fill="#ffffff08">
              <textPath href="#rimTextPathLarge" startOffset="5%">PRIVILEGED PROCESS — TIME IS OUR CRAFT — PRIVILEGED PROCESS —</textPath>
            </text>
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              const r = 360;
              const x = 380 + Math.cos(a) * r;
              const y = 380 + Math.sin(a) * r;
              return (
                <g key={i} transform={`translate(${x},${y})`} filter="url(#screwShadowSmall)">
                  <circle cx={0} cy={0} r={8} fill="url(#screwGradSmall)" stroke="#000" strokeWidth={0.8} />
                  <circle cx={0} cy={0} r={3} fill="#0b0b0b" opacity={0.25} />
                  <path d="M-4,0 L4,0 M0,-4 L0,4" stroke="#2a241f" strokeWidth={1} strokeLinecap="round" opacity={0.6} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
