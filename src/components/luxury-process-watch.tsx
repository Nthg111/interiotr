"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";

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
  const pinsGroupRef = useRef<SVGGElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [activeMajor, setActiveMajor] = useState<number | null>(null);
  const [view, setView] = useState<'dashboard' | 'detail'>('dashboard');

  const CENTER = { x: 380, y: 380 };
  const OUTER_R = 350;
  const TICK_R = 300;
  const MICRO_R = 280;

  const allSteps = useMemo(() => MICRO_STEPS, []);

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

  const polar = (deg: number, r: number) => {
    const a = (deg - 90) * (Math.PI / 180);
    return { x: CENTER.x + Math.cos(a) * r, y: CENTER.y + Math.sin(a) * r };
  };

  useEffect(() => {
    if (handsGroupRef.current) {
      gsap.set(handsGroupRef.current, { transformOrigin: `${CENTER.x}px ${CENTER.y}px` });
    }
    if (pinsGroupRef.current) {
      gsap.set(pinsGroupRef.current, { transformOrigin: `${CENTER.x}px ${CENTER.y}px` });
    }
  }, []);

  const focusPin = (i: number | null) => {
    setActive(i);
    onMicroHover?.(i);
    if (prefersReduced) return;
    if (i === null) return;
    const angle = (i / allSteps.length) * 360;
    if (handsGroupRef.current) {
      gsap.to(handsGroupRef.current, { rotation: angle, duration: 0.7, ease: 'power3.out' });
    }
  };

  useEffect(() => {
    if (typeof activeMicro === 'number') focusPin(activeMicro);
    if (activeMicro === null) focusPin(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMicro]);

  const openMajorDetail = (idx: number) => {
    setActiveMajor(idx);
    setView('detail');
    const midAngle = ((idx + 0.5) / 4) * 360;
    if (!prefersReduced && handsGroupRef.current) {
      gsap.to(handsGroupRef.current, { rotation: midAngle, duration: 0.9, ease: 'power3.out' });
    }
  };

  const closeDetail = () => {
    setView('dashboard');
    setActiveMajor(null);
    if (!prefersReduced && handsGroupRef.current) {
      gsap.to(handsGroupRef.current, { rotation: 0, duration: 0.7, ease: 'power3.out' });
    }
  };

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center" style={{ fontFamily: "Cinzel, 'Playfair Display', Georgia, serif" }}>
      <div className="process-frame p-6 relative max-w-[760px] mx-auto">
        <svg viewBox="0 0 760 760" className="w-[720px] h-[720px] max-w-full" role="img" aria-label="Process watch">
          <defs>
            <linearGradient id="bevel" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#0f1112" stopOpacity="0.98" />
              <stop offset="50%" stopColor="#161616" stopOpacity="1" />
              <stop offset="100%" stopColor="#0b0b0b" stopOpacity="0.98" />
            </linearGradient>
            <radialGradient id="gold" cx="50%" cy="20%">
              <stop offset="0%" stopColor="#fff7ea" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#c7a66e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.02" />
            </radialGradient>
          </defs>

          <g>
            <circle cx={CENTER.x} cy={CENTER.y} r={OUTER_R} fill="url(#bevel)" stroke="#000" strokeWidth={6} />
            <circle cx={CENTER.x} cy={CENTER.y} r={OUTER_R - 14} fill="#0b0b0b" />
            <circle cx={CENTER.x} cy={CENTER.y} r={OUTER_R - 20} fill="none" stroke="#c7a66e22" strokeWidth={2} />
          </g>

          <g>
            {Array.from({ length: 60 }).map((_, i) => {
              const deg = (i / 60) * 360;
              const inner = i % 5 === 0 ? TICK_R - 18 : TICK_R - 10;
              const outer = TICK_R;
              const p1 = polar(deg, inner);
              const p2 = polar(deg, outer);
              return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={i % 5 === 0 ? '#c7a66e55' : '#ffffff10'} strokeWidth={i % 5 === 0 ? 1.6 : 0.7} strokeLinecap="round" />;
            })}
          </g>

          {[
            { label: 'CONSULTATION', deg: 0 },
            { label: 'DESIGN', deg: 90 },
            { label: 'DELIVERY', deg: 180 },
            { label: 'EXECUTION', deg: 270 },
          ].map((m, idx) => {
            const pos = polar(m.deg, 240);
            return (
              <text
                key={m.label}
                x={pos.x}
                y={pos.y}
                fontSize={14}
                fontFamily="Cinzel, Playfair Display, serif"
                fill="#c7a66e"
                textAnchor="middle"
                alignmentBaseline="middle"
                style={{ letterSpacing: '0.06em', cursor: 'pointer', userSelect: 'none' }}
                onClick={() => openMajorDetail(idx)}
              >
                {m.label}
              </text>
            );
          })}

          <g ref={pinsGroupRef as any}>
            {allSteps.map((step, i) => {
              const deg = (i / allSteps.length) * 360;
              const p = polar(deg, MICRO_R);
              const isActive = active === i;
              return (
                <g key={step} transform={`translate(${p.x},${p.y})`}>
                  <circle
                    cx={0}
                    cy={0}
                    r={isActive ? 7 : 5}
                    fill={isActive ? '#c7a66e' : '#000'}
                    stroke="#c7a66e"
                    strokeWidth={isActive ? 1.2 : 1}
                    role="button"
                    tabIndex={0}
                    aria-label={`Process step ${i + 1}: ${step}`}
                    onMouseEnter={() => focusPin(i)}
                    onFocus={() => focusPin(i)}
                    onMouseLeave={() => focusPin(null)}
                    onBlur={() => focusPin(null)}
                    onClick={() => {
                      onOpen?.(i);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </g>
              );
            })}
          </g>

          <g>
            <circle cx={CENTER.x} cy={CENTER.y} r={200} fill="#080808" stroke="#000" strokeWidth={1} />
            <circle cx={CENTER.x} cy={CENTER.y} r={170} fill="#0b0b0b" stroke="#111" strokeWidth={0.5} />
            <circle cx={CENTER.x} cy={CENTER.y} r={140} fill="url(#gold)" opacity={0.04} />
          </g>

          <g ref={handsGroupRef as any} style={{ transformBox: 'fill-box', transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}>
            <path d={`M${CENTER.x} ${CENTER.y} L${CENTER.x} ${CENTER.y - 240} C${CENTER.x + 4} ${CENTER.y - 244} ${CENTER.x + 12} ${CENTER.y - 244} ${CENTER.x + 16} ${CENTER.y - 240} L${CENTER.x + 16} ${CENTER.y} Z`} fill="#c7a66e" stroke="#6b532f" strokeWidth={0.5} />
            <path d={`M${CENTER.x} ${CENTER.y} L${CENTER.x} ${CENTER.y - 210} C${CENTER.x + 2} ${CENTER.y - 212} ${CENTER.x + 6} ${CENTER.y - 212} ${CENTER.x + 8} ${CENTER.y - 210} L${CENTER.x + 8} ${CENTER.y} Z`} fill="#e6e6e6" stroke="#a9a9a9" strokeWidth={0.4} />
            <path d={`M${CENTER.x} ${CENTER.y} L${CENTER.x} ${CENTER.y - 260}`} stroke="#ffd" strokeWidth={1} opacity={0.9} strokeLinecap="round" />
          </g>

          <g>
            <circle cx={CENTER.x} cy={CENTER.y} r={16} fill="#0b0b0b" stroke="#c7a66e" strokeWidth={1.2} />
            <circle cx={CENTER.x} cy={CENTER.y} r={6} fill="#0b0b0b" />
          </g>

          <g>
            <text x={CENTER.x} y={CENTER.y + 44} fontSize={12} fontFamily="Cinzel, Playfair Display, serif" fill="#c7a66e" textAnchor="middle" alignmentBaseline="middle">
              {activeMajor !== null ? majorInfo[activeMajor].title.toUpperCase() : ''}
            </text>
          </g>
        </svg>

        {view === 'detail' ? (
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
        ) : null}
      </div>
    </div>
  );
}
