"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Mail,
  MapPinned,
  Menu,
  MoonStar,
  MoveUpRight,
  Phone,
  Quote,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SunMedium,
  Hammer,
  Building2,
  Send,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type IconComponent = React.ComponentType<{ className?: string }>;

type Service = {
  title: string;
  description: string;
  icon: IconComponent;
};

type Project = {
  name: string;
  style: string;
  area: string;
  description: string;
  tone: string;
  accent: string;
};

type GalleryItem = {
  title: string;
  category: "Residential" | "Commercial" | "Materials";
  note: string;
  accent: string;
};

const services: Service[] = [
  {
    title: "Interior Design",
    description:
      "Architectural planning, spatial clarity, and layered material composition tailored to refined living.",
    icon: Sparkles,
  },
  {
    title: "Turnkey Execution",
    description:
      "A single team handling site management, coordination, and handover-ready delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Residential Interiors",
    description:
      "Homes shaped with warm textures, calm palettes, and custom millwork that feels timeless.",
    icon: Building2,
  },
  {
    title: "Commercial Interiors",
    description:
      "Premium environments for offices, hospitality, and showrooms with subtle brand presence.",
    icon: LayoutGrid,
  },
  {
    title: "Modular Solutions",
    description:
      "Precision-built storage, kitchens, and utilities designed to stay elegant and efficient.",
    icon: Boxes,
  },
  {
    title: "Raw Material Supply",
    description:
      "Trusted sourcing for contractors and builders across veneers, tiles, glass, and more.",
    icon: Ruler,
  },
  {
    title: "Site Planning",
    description:
      "A clean execution roadmap with coordination, sequencing, and quality checkpoints.",
    icon: ScanSearch,
  },
  {
    title: "Custom Furniture",
    description:
      "Hand-finished pieces with sculpted proportions, premium detailing, and long-life comfort.",
    icon: Hammer,
  },
];

const projects: Project[] = [
  {
    name: "Aurelia Residence",
    style: "Contemporary Classic",
    area: "4,800 sq ft",
    description: "Warm stone, soft brass, and gallery-like restraint for a private family home.",
    tone: "from-stone-900 via-zinc-700 to-amber-800",
    accent: "Champagne Finish",
  },
  {
    name: "Monolith Penthouse",
    style: "Minimal Luxury",
    area: "3,100 sq ft",
    description: "A high-rise residence with horizon framing, tactile surfaces, and understated drama.",
    tone: "from-zinc-950 via-neutral-700 to-stone-600",
    accent: "Urban Calm",
  },
  {
    name: "The Atelier Office",
    style: "Executive Commercial",
    area: "8,600 sq ft",
    description: "A polished workplace using timber rhythm, linear light, and precise planning.",
    tone: "from-stone-800 via-neutral-700 to-zinc-600",
    accent: "Workplace Prestige",
  },
  {
    name: "Maison Court",
    style: "Resort Modern",
    area: "6,200 sq ft",
    description: "An indoor-outdoor villa concept with calm tonal depth and layered transparency.",
    tone: "from-amber-950 via-stone-700 to-zinc-500",
    accent: "Resort Flow",
  },
];

const processSteps = [
  {
    title: "Consultation",
    description: "We define intent, budget, use-case, and the level of finish expected.",
  },
  {
    title: "Design",
    description: "Moodboards, layouts, and material studies evolve into a cohesive direction.",
  },
  {
    title: "Material Selection",
    description: "Stone, timber, fabrics, and finishes are curated with a premium eye.",
  },
  {
    title: "Execution",
    description: "Site coordination, fabrication, and installation are handled with precision.",
  },
  {
    title: "Quality Check",
    description: "Every junction, finish, and line is inspected before delivery is accepted.",
  },
  {
    title: "Delivery",
    description: "A finished interior is handed over ready for immediate use and longevity.",
  },
];

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Private Villa Owner",
    quote:
      "The execution felt calm and controlled from the first meeting to final handover. The finish quality is exceptional.",
  },
  {
    name: "Nandini Rao",
    role: "Hospitality Developer",
    quote:
      "They understood the luxury brief immediately and translated it into a space that feels intentional and enduring.",
  },
  {
    name: "Kabir Shah",
    role: "Builder Partner",
    quote:
      "Their material supply is reliable, and the site coordination saves time without sacrificing quality.",
  },
];

const galleryItems: GalleryItem[] = [
  {
    title: "Marble Lobby Sequence",
    category: "Commercial",
    note: "Dramatic stone surfaces and soft light for a refined first impression.",
    accent: "from-stone-950 via-zinc-700 to-amber-900",
  },
  {
    title: "Warm Wood Suite",
    category: "Residential",
    note: "Natural grain, layered drapery, and tailored geometry for quiet luxury.",
    accent: "from-amber-950 via-stone-800 to-neutral-600",
  },
  {
    title: "Acrylic Study Wall",
    category: "Materials",
    note: "A close study of finishes, textures, and surface depth under soft lighting.",
    accent: "from-zinc-950 via-stone-700 to-neutral-500",
  },
  {
    title: "Chef Kitchen Detail",
    category: "Residential",
    note: "Modular precision balanced with warm task lighting and seamless detailing.",
    accent: "from-neutral-950 via-stone-700 to-amber-800",
  },
  {
    title: "Executive Lounge",
    category: "Commercial",
    note: "Muted palette, generous spacing, and controlled reflections across the room.",
    accent: "from-stone-900 via-neutral-700 to-zinc-500",
  },
  {
    title: "Texture Sample Grid",
    category: "Materials",
    note: "Plywood, veneer, and laminate combinations arranged for rapid selection.",
    accent: "from-amber-900 via-stone-700 to-neutral-500",
  },
];

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "18", label: "Years of Experience" },
  { value: "9", label: "Material Categories" },
  { value: "360°", label: "Design to Handover" },
];

const galleryFilters = ["All", "Residential", "Commercial", "Materials"] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionShell({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 sm:px-8 lg:px-10">
      <Badge className="w-fit">{eyebrow}</Badge>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base lg:justify-self-end">
          {description}
        </p>
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Button
      ref={ref}
      className={className}
      onMouseMove={(event) => {
        const element = ref.current;
        if (!element) return;

        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.style.transform = "translate3d(0, 0, 0)";
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export function LuxurySite() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedGalleryFilter, setSelectedGalleryFilter] = useState<(typeof galleryFilters)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [split, setSplit] = useState(56);
  const { setTheme, resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const gallery = useMemo(
    () =>
      selectedGalleryFilter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === selectedGalleryFilter),
    [selectedGalleryFilter],
  );

  useEffect(() => {
    const mountFrame = requestAnimationFrame(() => setMounted(true));

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(mountFrame);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ticker = window.setInterval(() => {
      setActiveTestimonial((value) => (value + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(ticker);
  }, []);

  const themeIsDark = resolvedTheme ? resolvedTheme === "dark" : true;

  return (
    <div className="relative isolate overflow-hidden bg-[color:var(--background)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(199,166,110,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%,transparent_82%,rgba(10,10,10,0.1))]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1 origin-left bg-[linear-gradient(90deg,transparent,rgba(199,166,110,0.95),rgba(255,255,255,0.95),rgba(199,166,110,0.95),transparent)]"
        style={{ scaleX: progress }}
      />


      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/55 px-4 py-3 shadow-[0_18px_60px_-30px_rgba(10,10,10,0.55)] backdrop-blur-2xl">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-3 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/5 text-sm font-semibold tracking-[0.3em] text-[color:var(--accent)]">
              ITA
            </div>
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                Interio & Trade associates
              </p>
              <p className="text-sm text-[color:var(--foreground)]/90">Luxury Interiors & Execution</p>
            </div>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {[
              ["Home", "home"],
              ["About", "about"],
              ["Services", "services"],
              ["Projects", "projects"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollToSection(id)}
                className="rounded-full px-4 py-2 text-sm text-[color:var(--muted)] transition-colors hover:bg-white/6 hover:text-[color:var(--foreground)]"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {mounted ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-full border border-[color:var(--border)]"
                aria-label="Toggle theme"
                onClick={() => setTheme(themeIsDark ? "light" : "dark")}
              >
                {themeIsDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
              </Button>
            ) : null}

            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full border border-[color:var(--border)] lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen((value) => !value)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            <MagneticButton
              className="hidden border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/12 text-[color:var(--foreground)] lg:inline-flex"
              onClick={() => scrollToSection("contact")}
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--background)]/92 p-4 shadow-[0_28px_80px_-40px_rgba(10,10,10,0.75)] backdrop-blur-2xl lg:hidden"
            >
              <div className="grid gap-2">
                {[
                  ["Home", "home"],
                  ["About", "about"],
                  ["Services", "services"],
                  ["Projects", "projects"],
                  ["Contact", "contact"],
                ].map(([label, id]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      scrollToSection(id);
                    }}
                    className="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-white/5 px-4 py-3 text-left text-sm text-[color:var(--foreground)]"
                  >
                    {label}
                    <ArrowRight className="h-4 w-4 text-[color:var(--muted)]" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="relative">
        <section id="home" className="relative min-h-screen overflow-hidden pt-28 sm:pt-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge>Luxury Interiors + Raw Material Supply</Badge>
                <div className="max-w-3xl space-y-5">
                  <p
                    data-hero-line
                    className="text-xs uppercase tracking-[0.42em] text-[color:var(--muted)]"
                  >
                    Interio & Trade associates
                  </p>
                  <h1
                    data-hero-line
                    className="font-display max-w-4xl text-5xl leading-[0.9] tracking-tight text-[color:var(--foreground)] sm:text-7xl lg:text-[5.5rem]"
                  >
                    Crafting timeless luxury spaces with precise execution.
                  </h1>
                  <p
                    data-hero-line
                    className="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg"
                  >
                    An elevated interior design and turnkey execution studio that also supplies
                    trusted raw materials to builders and contractors.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton onClick={() => scrollToSection("projects")}>
                  View Projects
                  <MoveUpRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                >
                  Book Consultation
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item, index) => (
                  <Reveal key={item.label} delay={index * 0.08}>
                    <Card className="h-full min-h-[8.75rem] bg-white/4 p-4 sm:p-5">
                      <p className="font-display text-2xl leading-none text-[color:var(--foreground)] sm:text-3xl">
                        {item.value}
                      </p>
                      <p className="mt-3 max-w-[8.5rem] text-[0.68rem] leading-5 tracking-[0.2em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.24em]">
                        {item.label}
                      </p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal>
              <div className="relative mx-auto w-full max-w-[39rem]">
                <div className="absolute -left-8 top-12 h-36 w-36 rounded-full bg-[color:var(--accent)]/18 blur-3xl" />
                <div className="absolute -right-12 bottom-8 h-44 w-44 rounded-full bg-white/8 blur-3xl" />

                <Card className="relative overflow-hidden border-white/10 bg-white/[0.06] p-4 shadow-[0_32px_110px_-50px_rgba(0,0,0,0.85)]">
                  <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-[32rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03)),radial-gradient(circle_at_top,rgba(199,166,110,0.35),transparent_45%),linear-gradient(145deg,rgba(20,20,20,0.94),rgba(56,43,28,0.9))]">
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]" />
                      <div className="absolute inset-x-4 top-4 flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 text-xs uppercase tracking-[0.28em] text-white/75 backdrop-blur-xl">
                        <span>Hero Cinematic View</span>
                        <span>2026</span>
                      </div>
                      <div className="absolute inset-x-4 bottom-4 grid gap-3">
                        {[
                          ["Design-led execution", "From concept to handover"],
                          ["Material partner", "Supplying builders and contractors"],
                          ["Premium detailing", "Stone, wood, brass, and glass"],
                        ].map(([title, subtitle]) => (
                          <div
                            key={title}
                            className="rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <p className="text-sm font-medium text-white">{title}</p>
                              <ArrowRight className="h-4 w-4 text-[color:var(--accent)]" />
                            </div>
                            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/55">
                              {subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <Card className="bg-white/[0.05] p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
                            Signature Promise
                          </p>
                          <BadgeCheck className="h-5 w-5 text-[color:var(--accent)]" />
                        </div>
                        <h2 className="mt-6 max-w-xs font-display text-3xl leading-tight text-[color:var(--foreground)]">
                          Luxury interiors with perfect execution.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                          We build tactile, calm, and high-value interiors for clients who want
                          precision, trust, and a refined visual language.
                        </p>
                      </Card>

                      <Card className="grid gap-4 bg-white/[0.04] p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--accent)]/14 text-[color:var(--accent)]">
                            <Phone className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[color:var(--foreground)]">
                              Fast consultation response
                            </p>
                            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                              Premium client onboarding
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white/5 px-4 py-3 text-sm text-[color:var(--muted)]">
                          <Mail className="h-4 w-4 text-[color:var(--accent)]" />
                          hello@interioandtrade.com
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white/5 px-4 py-3 text-sm text-[color:var(--muted)]">
                          <MapPinned className="h-4 w-4 text-[color:var(--accent)]" />
                          Design studio and supply partner across India
                        </div>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="py-10 sm:py-20">
          <SectionShell
            eyebrow="About"
            title="A studio shaped around trust, detail, and quiet confidence."
            description="Interio & Trade associates blends interior design, turnkey execution, and material sourcing into one disciplined experience for homeowners, developers, and contractors."
          />

          <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-6 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
            <Reveal>
              <Card className="overflow-hidden p-0">
                <div className="grid min-h-[28rem] lg:grid-cols-[1fr_0.9fr]">
                  <div className="p-6 sm:p-8">
                    <Badge>Studio Philosophy</Badge>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
                      Every interior should feel composed, effortless, and durable. We think in
                      light, proportion, material honesty, and the human rituals that define a
                      space.
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {[
                        ["Minimal language", "We keep the composition calm and architectural."],
                        ["High touch delivery", "Our team remains present through every stage."],
                        ["Material integrity", "Products and finishes are chosen for longevity."],
                        ["Reliable execution", "Design intent survives the realities of site work."],
                      ].map(([title, text]) => (
                        <div
                          key={title}
                          className="rounded-[1.25rem] border border-[color:var(--border)] bg-white/5 p-4"
                        >
                          <p className="font-medium text-[color:var(--foreground)]">{title}</p>
                          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative min-h-[28rem] border-t border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(199,166,110,0.14),transparent_35%),radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_25%),linear-gradient(135deg,rgba(31,24,18,0.96),rgba(10,10,10,0.94))] lg:border-t-0 lg:border-l">
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.07),transparent)]" />
                    <div className="absolute inset-0 p-6 sm:p-8">
                      <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/15 p-5 backdrop-blur-xl">
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                            Company Story
                          </p>
                          <p className="mt-6 max-w-sm font-display text-4xl leading-[0.95] text-white">
                            Luxury is built through restraint.
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {stats.slice(0, 3).map((item) => (
                            <div key={item.label} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                              <p className="font-display text-3xl text-white">{item.value}</p>
                              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/55">
                                {item.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            <div className="grid gap-6">
              {[
                {
                  title: "Design-first thinking",
                  text: "A design language that feels architectural before it feels decorative.",
                },
                {
                  title: "Execution discipline",
                  text: "A calm workflow that keeps decisions visible and the site under control.",
                },
                {
                  title: "Trade confidence",
                  text: "Reliable sourcing and supply for contractors who value consistency.",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08}>
                  <Card className="h-full">
                    <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-display text-3xl text-[color:var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{item.text}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-10 sm:py-20">
          <SectionShell
            eyebrow="Services"
            title="A refined suite of design, execution, and material capabilities."
            description="Every service is shaped to feel premium, precise, and quietly efficient, from idea to installation."
          />

          <div className="mx-auto mt-10 grid max-w-7xl gap-4 px-6 sm:px-8 md:grid-cols-2 xl:grid-cols-4 lg:px-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 0.04}>
                  <Card className="group h-full min-h-[16rem] transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--accent)]/35 hover:bg-white/[0.08]">
                    <div className="flex h-full flex-col justify-between gap-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white/5 text-[color:var(--accent)] transition-transform duration-500 group-hover:scale-105">
                          <Icon className="h-5 w-5" />
                        </div>
                        <MoveUpRight className="h-4 w-4 text-[color:var(--muted)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl text-[color:var(--foreground)]">
                          {service.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="projects" className="py-10 sm:py-20">
          <SectionShell
            eyebrow="Featured Projects"
            title="Immersive project presentations with full-screen presence."
            description="A masonry-like luxury grid, soft hover motion, and a before/after slider for one of the studio's execution stories."
          />

          <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <Reveal>
              <Card className="overflow-hidden p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {projects.map((project, index) => (
                    <motion.article
                      key={project.name}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="group relative overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/60"
                    >
                      <div className={`min-h-80 bg-gradient-to-br ${project.tone}`} />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(10,10,10,0.86))]" />
                      <div className="absolute inset-0 flex flex-col justify-end p-5">
                        <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/65">
                          <span>{project.style}</span>
                          <span>{project.area}</span>
                        </div>
                        <h3 className="font-display text-3xl text-white">{project.name}</h3>
                        <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">
                          {project.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between rounded-full border border-white/10 bg-white/8 px-4 py-3 text-xs uppercase tracking-[0.24em] text-white/75 backdrop-blur-xl">
                          <span>{project.accent}</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </Card>
            </Reveal>

            <div className="grid gap-6">
              <Reveal>
                <Card className="overflow-hidden p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Badge>Before / After</Badge>
                      <h3 className="mt-4 font-display text-3xl text-[color:var(--foreground)]">
                        One room, two states.
                      </h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white/5 text-[color:var(--accent)]">
                      <SlidersHorizontal className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-white/5">
                    <div className="relative h-[24rem]">
                      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(10,10,10,0.95),rgba(64,47,30,0.92)),radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_34%)]" />
                      <div
                        className="absolute inset-y-0 left-0 overflow-hidden border-r border-[color:var(--accent)]/45"
                        style={{ width: `${split}%` }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(35,27,20,0.96),rgba(145,118,74,0.82)),radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_30%)]" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end p-5 text-white">
                          <div className="max-w-[12rem]">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/55">Before</p>
                            <p className="mt-2 font-display text-xl leading-tight sm:text-2xl">
                              Raw shell with potential
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-end justify-end p-5 text-white">
                        <div className="max-w-[12rem] text-right">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/55">After</p>
                          <p className="mt-2 font-display text-xl leading-tight sm:text-2xl">
                            Polished luxury finish
                          </p>
                        </div>
                      </div>
                      <div
                        className="absolute inset-y-4 z-10 w-1 -translate-x-1/2 rounded-full bg-[color:var(--accent)] shadow-[0_0_30px_rgba(199,166,110,0.7)]"
                        style={{ left: `${split}%` }}
                      />
                    </div>
                    <div className="border-t border-[color:var(--border)] p-4">
                      <input
                        type="range"
                        min={15}
                        max={85}
                        value={split}
                        onChange={(event) => setSplit(Number(event.target.value))}
                        className="w-full accent-[color:var(--accent)]"
                        aria-label="Before after slider"
                      />
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal>
                <Card className="bg-white/[0.05] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                    Project Flow
                  </p>
                  <p className="mt-3 font-display text-3xl text-[color:var(--foreground)]">
                    Presentation that feels cinematic.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    Hover states, layered light, and a restrained palette keep the portfolio premium
                    without becoming heavy.
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-20">
          <SectionShell
            eyebrow="Process"
            title="A six-step timeline designed for calm, premium delivery."
            description="The sequence feels architectural and legible, so clients and contractors understand exactly where the project stands."
          />

          <div className="mx-auto mt-10 max-w-7xl px-6 sm:px-8 lg:px-10">
            <Card className="overflow-hidden bg-white/[0.05] p-6 sm:p-8">
              <div className="relative grid gap-6 lg:grid-cols-6 lg:gap-0">
                <div className="absolute left-[2.25rem] top-8 block h-[calc(100%-4rem)] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(199,166,110,0.8),rgba(255,255,255,0.18))] lg:hidden" />
                {processSteps.map((step, index) => (
                  <Reveal key={step.title} delay={index * 0.06}>
                    <motion.div
                      className="relative pl-14 lg:pl-0 lg:pt-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                      whileHover={{ y: -4 }}
                    >
                      <motion.div
                        className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] text-xs font-semibold text-[color:var(--accent)] lg:top-0 lg:-translate-x-1/2"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.15,
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </motion.div>
                      <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/5 p-5 transition-colors duration-300 lg:min-h-[15rem] hover:border-[color:var(--accent)]/30">
                        <motion.div
                          className="mb-4 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(199,166,110,0.85),transparent)] lg:hidden"
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileInView={{ scaleX: 1, opacity: 1 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 + 0.1 }}
                        />
                        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                          Step
                        </p>
                        <h3 className="mt-4 font-display text-2xl text-[color:var(--foreground)]">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="testimonials" className="py-10 sm:py-20">
          <SectionShell
            eyebrow="Testimonials"
            title="Quietly confident words from clients and partners."
            description="A restrained slider keeps the focus on trust, craftsmanship, and the experience of delivery."
          />

          <div className="mx-auto mt-10 max-w-7xl px-6 sm:px-8 lg:px-10">
            <Card className="overflow-hidden p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_0.35fr] lg:items-end">
                <div className="relative min-h-[18rem] rounded-[1.75rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonials[activeTestimonial].name}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="grid h-full gap-4"
                    >
                      <Quote className="h-8 w-8 text-[color:var(--accent)]" />
                      <p className="max-w-3xl font-display text-3xl leading-tight text-[color:var(--foreground)] sm:text-4xl">
                        {testimonials[activeTestimonial].quote}
                      </p>
                      <div className="mt-auto">
                        <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
                          {testimonials[activeTestimonial].role}
                        </p>
                        <p className="mt-2 text-lg text-[color:var(--foreground)]">
                          {testimonials[activeTestimonial].name}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-stretch">
                  <Button variant="outline" size="sm" onClick={() => setActiveTestimonial((value) => (value - 1 + testimonials.length) % testimonials.length)}>
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>
                  <div className="hidden h-px w-full bg-[color:var(--border)] lg:block" />
                  <Button variant="outline" size="sm" onClick={() => setActiveTestimonial((value) => (value + 1) % testimonials.length)}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="gallery" className="py-10 sm:py-20">
          <SectionShell
            eyebrow="Gallery"
            title="An immersive visual gallery with category filters and lightbox detail."
            description="The gallery uses elegant transitions, soft overlays, and quick category filtering to keep the experience fluid."
          />

          <div className="mx-auto mt-10 max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex flex-wrap gap-2">
              {galleryFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedGalleryFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGalleryFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {gallery.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.04}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] text-left"
                  >
                    <div className={`h-[23rem] bg-gradient-to-br ${item.accent}`} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(10,10,10,0.84))]" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/65">
                        <span>{item.category}</span>
                        <ScanSearch className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <h3 className="mt-4 font-display text-3xl text-white">{item.title}</h3>
                      <p className="mt-3 max-w-sm text-sm leading-7 text-white/70">{item.note}</p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {lightboxIndex !== null ? (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
              >
                <motion.div
                  initial={{ scale: 0.96, y: 24 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.96, y: 24 }}
                  transition={{ duration: 0.35 }}
                  onClick={(event) => event.stopPropagation()}
                  className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[color:var(--background)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]"
                >
                  <div className={`h-[24rem] bg-gradient-to-br ${gallery[lightboxIndex].accent}`} />
                  <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                      <Badge>{gallery[lightboxIndex].category}</Badge>
                      <h3 className="mt-4 font-display text-4xl text-[color:var(--foreground)]">
                        {gallery[lightboxIndex].title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                        {gallery[lightboxIndex].note}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setLightboxIndex(null)}>
                      Close
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>

        <section id="contact" className="py-10 pb-24 sm:py-20 sm:pb-32">
          <SectionShell
            eyebrow="Contact"
            title="A minimal, high-touch contact section ready for new projects."
            description="The form is purely frontend, with clear calls to WhatsApp, phone, and email for immediate follow-up."
          />

          <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
            <Reveal>
              <Card className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">
                    Direct contact
                  </p>
                  <h3 className="mt-4 font-display text-4xl text-[color:var(--foreground)]">
                    Start a project conversation.
                  </h3>
                </div>

                <div className="grid gap-3">
                  {[
                    { icon: Phone, label: "+91 00000 00000", action: "Call" },
                    { icon: Mail, label: "hello@interioandtrade.com", action: "Email" },
                    { icon: MoveUpRight, label: "WhatsApp quick inquiry", action: "WhatsApp" },
                  ].map(({ icon: Icon, label, action }) => (
                    <button
                      key={String(label)}
                      type="button"
                      className="flex items-center justify-between rounded-[1.25rem] border border-[color:var(--border)] bg-white/5 px-4 py-4 text-left transition-colors hover:bg-white/8"
                    >
                      <span className="flex items-center gap-3 text-sm text-[color:var(--foreground)]">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)]/12 text-[color:var(--accent)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block font-medium">{action}</span>
                          <span className="block text-[color:var(--muted)]">{label}</span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-[color:var(--muted)]" />
                    </button>
                  ))}
                </div>

                <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,rgba(199,166,110,0.16),rgba(255,255,255,0.02))] p-5">
                  <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">
                    Map Placeholder
                  </p>
                  <div className="mt-4 flex min-h-64 items-center justify-center rounded-[1.25rem] border border-dashed border-[color:var(--border)] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09),transparent_35%),linear-gradient(145deg,rgba(10,10,10,0.94),rgba(28,22,17,0.94))] p-6 text-center">
                    <div>
                      <MapPinned className="mx-auto h-10 w-10 text-[color:var(--accent)]" />
                      <p className="mt-4 font-display text-3xl text-[color:var(--foreground)]">
                        Embedded map UI placeholder
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                        Replace this with the preferred location widget when the studio location is finalized.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="bg-white/[0.05] p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--muted)]">
                      Inquiry form
                    </p>
                    <h3 className="mt-4 font-display text-4xl text-[color:var(--foreground)]">
                      Floating labels, polished spacing, no backend.
                    </h3>
                  </div>
                  <Badge>Frontend Only</Badge>
                </div>

                <form
                  className="mt-8 grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="relative block">
                      <span className="pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)] transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:translate-y-0 peer-focus:text-xs">
                        Full Name
                      </span>
                      <Input className="peer pt-6" placeholder=" " />
                    </label>
                    <label className="relative block">
                      <span className="pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)] transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:translate-y-0 peer-focus:text-xs">
                        Phone Number
                      </span>
                      <Input className="peer pt-6" placeholder=" " />
                    </label>
                  </div>

                  <label className="relative block">
                    <span className="pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)] transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:translate-y-0 peer-focus:text-xs">
                      Project Type
                    </span>
                    <Input className="peer pt-6" placeholder=" " />
                  </label>

                  <label className="relative block">
                    <span className="pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)] transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:translate-y-0 peer-focus:text-xs">
                      Requirements
                    </span>
                    <Textarea className="peer pt-6" placeholder=" " />
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <MagneticButton type="submit">
                      Send Inquiry
                      <Send className="h-4 w-4" />
                    </MagneticButton>
                    <MagneticButton variant="outline" type="button" onClick={() => scrollToSection("home")}>
                      Back to Top
                    </MagneticButton>
                  </div>
                </form>
              </Card>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:var(--border)] bg-[color:var(--background)]/75 px-6 py-10 backdrop-blur-xl sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/5 text-sm font-semibold tracking-[0.3em] text-[color:var(--accent)]">
                ITA
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                  Interio & Trade associates
                </p>
                <p className="text-sm text-[color:var(--foreground)]/90">
                  Luxury Interiors, Execution, and Material Supply
                </p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[color:var(--muted)]">
              A premium frontend experience built for visual presentation, brand identity, and
              smooth conversion-focused storytelling.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Home", "About", "Services"],
              ["Projects", "Contact"],
              ["Instagram", "LinkedIn", "WhatsApp"],
            ].map((group, index) => (
              <div key={String(index)} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  {index === 2 ? "Social" : "Links"}
                </p>
                <div className="grid gap-2 text-sm text-[color:var(--foreground)]/88">
                  {group.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-left text-[color:var(--foreground)]/82 transition-colors hover:text-[color:var(--accent)]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
