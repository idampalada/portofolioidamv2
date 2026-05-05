"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Github, Linkedin, Instagram, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// 🔥 PERBAIKAN: Karantina Efek Ketik agar tidak me-render ulang seluruh halaman
function TypewriterEffect() {
  const roles = ["Fullstack Developer", "Backend Engineer", "UI/UX Designer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = roles[roleIdx];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = cur.slice(0, typed.length + 1);
        setTyped(next);
        if (next === cur) setTimeout(() => setDeleting(true), 1800);
      } else {
        const next = cur.slice(0, typed.length - 1);
        setTyped(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx, roles]);

  return (
    <span className="text-[clamp(18px,3vw,28px)] font-light tracking-wide bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
      {typed}
      <span className="text-purple-300 animate-pulse">|</span>
    </span>
  );
}

function SplitChars({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={{ ...style, display: "block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function MagneticButton({
  children,
  className,
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ display: "inline-block" }}
    >
      <motion.div style={{ x: springX, y: springY }}>
        <button className={className}>{children}</button>
      </motion.div>
    </div>
  );
}

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => setValue(Math.round(obj.val)),
          });
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

function NoiseTexture() {
  return (
    <svg
      // 🔥 PERBAIKAN: Matikan SVG beratkan di HP
      className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none hidden md:block"
      style={{ zIndex: 1 }}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const nameLineRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const heroDimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const chars =
          nameLineRef.current?.querySelectorAll(".split-char") ?? [];
        gsap.set(heroDimRef.current, { opacity: 0 });
        gsap.set(chars, { y: "100%", opacity: 0 });
        gsap.set(greetingRef.current, { opacity: 0, x: -30 });
        gsap.set(roleRef.current, { opacity: 0, y: 20 });
        gsap.set(descRef.current, { opacity: 0, y: 24 });
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        gsap.set(imgRef.current, { opacity: 0, scale: 0.85, rotateY: 20 });
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left" });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(greetingRef.current, { opacity: 1, x: 0, duration: 0.8 }, 0.2)
          .to(
            lineRef.current,
            { scaleX: 1, duration: 0.6, ease: "power4.out" },
            0.35,
          )
          .to(
            chars,
            { y: "0%", opacity: 1, stagger: 0.035, duration: 0.9 },
            0.5,
          )
          .to(roleRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.1)
          .to(descRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.3)
          .to(
            ctaRef.current,
            { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" },
            1.5,
          )
          .to(
            imgRef.current,
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 1.4,
              ease: "expo.out",
            },
            0.4,
          );

        gsap.to(orbitRef.current, {
          rotate: 360,
          duration: 28,
          ease: "none",
          repeat: -1,
        });

        gsap.to(imgRef.current, {
          y: -16,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
        });

        gsap.from(statsRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            scroller: document.documentElement,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          scroller: document.documentElement,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (heroDimRef.current)
              gsap.set(heroDimRef.current, { opacity: p * 0.7 });
            if (cardRef.current)
              gsap.set(cardRef.current, {
                scale: 1 - p * 0.06,
                transformOrigin: "center top",
              });
          },
        });

        // 🔥 PERBAIKAN: GSAP MatchMedia untuk Stacking Desktop saja
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "bottom bottom",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const imgSpringX = useSpring(imgX, { stiffness: 120, damping: 22 });
  const imgSpringY = useSpring(imgY, { stiffness: 120, damping: 22 });

  return (
    <div ref={containerRef} id="hero" className="relative z-10 bg-[#0C0512]">
      <section
        ref={sectionRef}
        className="relative overflow-hidden min-h-screen flex flex-col w-full"
      >
        <div
          ref={cardRef}
          className="relative w-full flex-1 flex flex-col min-h-screen"
        >
          <div className="absolute inset-0 -z-10 w-full h-full">
            <div className="absolute inset-0 bg-[#0C0512]" />
            {/* 🔥 PERBAIKAN: Blur raksasa disembunyikan di HP */}
            <div
              className="absolute top-[-10%] right-[5%] w-[700px] h-[700px] rounded-full opacity-20 hidden md:block"
              style={{
                background:
                  "radial-gradient(circle, #7B3FF2 0%, #4B1FA8 40%, transparent 70%)",
                filter: "blur(60px)",
                willChange: "transform, filter",
              }}
            />
            <div
              className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-10 hidden md:block"
              style={{
                background:
                  "radial-gradient(circle, #C084FC 0%, #7C3AED 50%, transparent 70%)",
                filter: "blur(80px)",
                willChange: "transform, filter",
              }}
            />
            <NoiseTexture />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <div className="max-w-[1320px] w-full mx-auto px-6 md:px-10 lg:px-16 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-12 gap-8 lg:gap-0 items-center flex-1 pt-28 pb-12 md:py-0">
              <div className="col-span-12 lg:col-span-6 z-10">
                <p
                  ref={greetingRef}
                  className="flex items-center gap-3 text-purple-400 text-sm font-medium tracking-[0.2em] uppercase mb-6"
                  style={{ opacity: 0 }}
                >
                  <span
                    ref={lineRef}
                    className="inline-block h-px w-10 bg-purple-500"
                    style={{ transformOrigin: "left" }}
                  />
                  Hi, I'm
                </p>

                <div
                  className="overflow-hidden mb-1"
                  style={{ clipPath: "inset(0 0 0 0)" }}
                >
                  <div ref={nameLineRef}>
                    <SplitChars
                      text="Idam Palada"
                      className="text-[clamp(52px,8vw,96px)] font-black leading-[0.92] tracking-tight text-white"
                    />
                  </div>
                </div>

                <div
                  ref={roleRef}
                  className="mb-8 mt-3 min-h-[3rem] flex items-center"
                  style={{ opacity: 0 }}
                >
                  <TypewriterEffect />
                </div>

                <p
                  ref={descRef}
                  className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[480px] mb-10"
                  style={{ opacity: 0 }}
                >
                  I architect scalable web systems with obsessive attention to
                  performance and user experience. Clean code, sharp design.
                </p>

                <div
                  ref={ctaRef}
                  className="flex items-center gap-4 flex-wrap"
                  style={{ opacity: 0 }}
                >
                  <MagneticButton
                    className="group relative px-8 py-4 rounded-full bg-purple-600 text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:bg-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                    strength={0.35}
                  >
                    <span className="relative z-10">Download CV</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </MagneticButton>

                  <MagneticButton
                    className="px-8 py-4 rounded-full border border-purple-500/40 text-purple-300 text-sm font-semibold hover:border-purple-400/70 hover:text-purple-200 hover:bg-purple-500/10 transition-all duration-300"
                    strength={0.3}
                  >
                    View Work
                  </MagneticButton>

                  {/* 🔥 PERBAIKAN: Ganti whileHover framer-motion dengan CSS class hover */}
                  <div className="flex items-center gap-2 ml-1 mt-4 sm:mt-0">
                    {[
                      { href: "https://github.com/idampalada", icon: Github },
                      {
                        href: "https://linkedin.com/in/idam-palada",
                        icon: Linkedin,
                      },
                      {
                        href: "https://instagram.com/idam.palada",
                        icon: Instagram,
                      },
                      { href: "https://wa.me/6281287809468", icon: Phone },
                    ].map(({ href, icon: Icon }, i) => (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-500/30 text-purple-400 hover:border-purple-400/60 hover:bg-purple-500/15 hover:text-purple-300 hover:-translate-y-1 hover:scale-110 transition-all duration-300"
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end z-10 mt-16 lg:mt-0 pb-12">
                <div
                  className="relative"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    imgX.set((e.clientX - (rect.left + rect.width / 2)) * 0.06);
                    imgY.set((e.clientY - (rect.top + rect.height / 2)) * 0.06);
                  }}
                  onMouseLeave={() => {
                    imgX.set(0);
                    imgY.set(0);
                  }}
                >
                  <div
                    ref={orbitRef}
                    className="absolute inset-[-30px] rounded-full border border-dashed border-purple-500/20 pointer-events-none"
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500"
                      style={{ boxShadow: "0 0 12px rgba(168,85,247,0.9)" }}
                    />
                    <div
                      className="absolute bottom-[15%] right-0 translate-x-1/2 w-2 h-2 rounded-full bg-fuchsia-400"
                      style={{ boxShadow: "0 0 8px rgba(232,121,249,0.8)" }}
                    />
                  </div>
                  <div
                    className="absolute inset-[-60px] rounded-full border border-purple-900/40 pointer-events-none"
                    style={{ animation: "spin-ccw 40s linear infinite" }}
                  />
                  <style>{`@keyframes spin-ccw { to { transform: rotate(-360deg); } }`}</style>

                  <motion.div
                    ref={imgRef as any}
                    style={{ x: imgSpringX, y: imgSpringY }}
                  >
                    <div
                      className="relative w-[280px] md:w-[360px] lg:w-[400px] h-[360px] md:h-[460px] lg:h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer"
                      style={{
                        border: "1px solid rgba(168,85,247,0.3)",
                        boxShadow:
                          "0 0 0 1px rgba(168,85,247,0.1), 0 40px 120px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                        transform: "rotate(3deg)",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.transform =
                          "rotate(0deg)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.transform =
                          "rotate(3deg)")
                      }
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0512]/60 via-transparent to-transparent z-10" />
                      <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(168,85,247,0.05) 100%)",
                        }}
                      />
                      <Image
                        src="/idampurple.jpg"
                        alt="Idam Palada"
                        fill
                        sizes="(max-width: 768px) 280px, (max-width: 1024px) 360px, 400px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-30 p-5">
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-purple-200 backdrop-blur-md"
                          style={{
                            background: "rgba(109,40,217,0.3)",
                            border: "1px solid rgba(168,85,247,0.3)",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-green-400"
                            style={{ boxShadow: "0 0 6px #4ade80" }}
                          />{" "}
                          Available for work
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-[10%] right-[-60px] hidden lg:block"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className="px-4 py-2 rounded-2xl text-xs text-purple-200 backdrop-blur-md whitespace-nowrap"
                      style={{
                        background: "rgba(30,10,60,0.7)",
                        border: "1px solid rgba(168,85,247,0.25)",
                        boxShadow: "0 8px 32px rgba(109,40,217,0.2)",
                      }}
                    >
                      ⚡ Next.js + TypeScript
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-[20%] left-[-60px] hidden lg:block"
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <div
                      className="px-4 py-2 rounded-2xl text-xs text-purple-200 backdrop-blur-md whitespace-nowrap"
                      style={{
                        background: "rgba(30,10,60,0.7)",
                        border: "1px solid rgba(168,85,247,0.25)",
                        boxShadow: "0 8px 32px rgba(109,40,217,0.2)",
                      }}
                    >
                      🛠 5+ Projects Shipped
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div
              ref={statsRef}
              className="pb-20 md:pb-14 mt-auto relative z-10 w-full"
            >
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-800/50 to-transparent mb-10" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
                {[
                  {
                    value: 2,
                    suffix: "+",
                    label: "Years Experience",
                    sub: "Full-stack development",
                  },
                  {
                    value: 99,
                    suffix: "%",
                    label: "Client Satisfaction",
                    sub: "Across all projects",
                  },
                  {
                    value: 5,
                    suffix: "+",
                    label: "Projects Shipped",
                    sub: "From concept to launch",
                  },
                ].map(({ value, suffix, label, sub }, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="text-5xl md:text-6xl font-black text-white mb-1 tabular-nums">
                      <AnimatedCounter target={value} suffix={suffix} />
                    </div>
                    <div className="text-purple-300 font-medium text-sm mb-0.5">
                      {label}
                    </div>
                    <div className="text-gray-600 text-xs">{sub}</div>
                  </div>
                ))}
                <div className="text-center md:text-right mt-6 md:mt-0">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">
                    Trusted by
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-end gap-2">
                    {["Sneakersflash", "COA", "KJM", "PUPR"].map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1 rounded-full text-xs text-purple-300 border border-purple-800/40 bg-purple-900/20"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 z-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase">
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-purple-700 to-transparent" />
          </motion.div>

          <div
            ref={heroDimRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,2,10,0.3) 0%, rgba(5,2,10,0.95) 100%)",
              zIndex: 11,
              opacity: 0,
            }}
          />
        </div>
      </section>
    </div>
  );
}
