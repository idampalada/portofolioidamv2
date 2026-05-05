"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function SkillTag({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block px-4 py-2 rounded-full text-xs text-purple-300 cursor-default select-none whitespace-nowrap hover:scale-105 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
      style={{
        background: "rgba(109,40,217,0.12)",
        border: "1px solid rgba(168,85,247,0.2)",
      }}
    >
      {label}
    </motion.span>
  );
}

function RevealLine({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </div>
  );
}

function StatCard({
  number,
  label,
  delay = 0,
}: {
  number: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-4 lg:p-5 rounded-2xl cursor-default group w-full hover:-translate-y-1 transition-transform duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(168,85,247,0.12)",
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.1), transparent 70%)",
        }}
      />
      <div className="text-xl md:text-2xl font-black text-white mb-1">
        {number}
      </div>
      <div className="text-[10px] md:text-xs text-gray-500 leading-tight break-words">
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  // 🔥 TAMBAHAN: Sama seperti Hero, pakai 3 lapis referensi
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);

  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkLayout = () => setIsDesktop(window.innerWidth >= 768);
    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  const skills = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Docker",
    "Tailwind CSS",
    "Python",
    "Machine Learning",
    "Figma",
    "REST APIs",
  ];

  const bioLines = [
    "Informatics Engineering graduate from Al-Azhar Indonesia University. Active in campus organizations — built leadership and team management chops early on.",
    "Focused on Frontend & Backend Development, Product Design, IT Infrastructure, and dipping into Data Science & Machine Learning.",
    "Shipped e-commerce platforms, asset management systems, and internal tools. I work fast independently or in a team. Strong learning bias.",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "#about-inner-wrapper",
          { borderRadius: "2rem 2rem 0 0" },
          {
            borderRadius: "0rem 0rem 0 0",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: document.documentElement,
              start: "top 90%",
              end: "top 0%",
              scrub: true,
            },
          },
        );

        // 🔥 ILMU RAHASIA STACKING DILEPAS: Berlaku untuk semua layar (Mobile & Desktop)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom bottom", // Baru mengunci layar saat elemen paling bawah tersentuh
          end: () => "+=" + window.innerHeight,
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            const p = self.progress;
            if (aboutContentRef.current) {
              gsap.set(aboutContentRef.current, {
                scale: 1 - p * 0.08, // Mengecil otomatis
                opacity: 1 - p * 0.8, // Memudar saat ditimpa
              });
            }
          },
        });
      }, wrapperRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <section
        ref={sectionRef}
        id="about"
        className="relative z-20 w-full min-h-screen bg-[#0C0512] overflow-hidden flex flex-col"
      >
        {/* Content Ref yang akan di-scale oleh GSAP */}
        <div
          ref={aboutContentRef}
          className="w-full flex-1 flex flex-col origin-top"
        >
          <div
            id="about-inner-wrapper"
            className="relative w-full overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24"
            style={{
              background: "#0C0512",
              borderRadius: "2rem 2rem 0 0",
              boxShadow:
                "0 -40px 120px rgba(0,0,0,0.9), 0 -1px 0 rgba(168,85,247,0.15)",
            }}
          >
            <div className="absolute inset-0 -z-10 w-full overflow-hidden">
              <motion.div
                style={isDesktop ? { y: glowY } : {}}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none hidden md:block"
                animate={
                  isDesktop
                    ? {}
                    : {
                        filter: "blur(80px)",
                        background:
                          "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
                      }
                }
              />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #a855f7 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(168,85,247,0.6), transparent)",
              }}
            />

            <div className="max-w-[1320px] w-full mx-auto px-6 md:px-10 lg:px-16">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px w-12 bg-purple-500 origin-left"
                />
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-purple-400 text-xs tracking-[0.25em] uppercase font-medium whitespace-nowrap"
                >
                  About me
                </motion.span>
              </div>

              <div className="mb-6 md:mb-8 w-full">
                <RevealLine className="text-[clamp(38px,10vw,120px)] font-black leading-[0.88] tracking-tight text-white break-words">
                  Who I
                </RevealLine>
                <RevealLine
                  delay={0.1}
                  className="text-[clamp(38px,10vw,120px)] font-black leading-[0.88] tracking-tight text-transparent break-words"
                  style={
                    {
                      WebkitTextStroke: "1px rgba(168,85,247,0.5)",
                    } as React.CSSProperties
                  }
                >
                  Really Am
                </RevealLine>
              </div>

              <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start w-full">
                <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-start w-full">
                  <motion.div
                    ref={imageRef}
                    style={isDesktop ? { scale: imageScale, y: imageY } : {}}
                    className="relative"
                  >
                    <div
                      className="absolute inset-[-2px] rounded-[2rem] pointer-events-none z-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(109,40,217,0.1), rgba(232,121,249,0.3))",
                      }}
                    />
                    <motion.div
                      initial={isDesktop ? { rotate: -3 } : { rotate: 0 }}
                      className="relative w-[260px] sm:w-[280px] md:w-[360px] h-[360px] sm:h-[380px] md:h-[460px] rounded-[2rem] overflow-hidden mx-auto hover:rotate-0 hover:scale-[1.02] transition-transform duration-500"
                      style={{
                        border: "1px solid rgba(168,85,247,0.25)",
                        boxShadow:
                          "0 0 0 1px rgba(168,85,247,0.08), 0 60px 160px rgba(109,40,217,0.45)",
                      }}
                    >
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(12,5,18,0.5) 0%, transparent 50%, rgba(109,40,217,0.1) 100%)",
                        }}
                      />
                      <div
                        className="absolute inset-0 z-20 pointer-events-none -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out hidden md:block"
                        style={{
                          background:
                            "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
                        }}
                      />
                      <Image
                        src="/idambatik.png"
                        alt="Idam Palada"
                        fill
                        className="object-cover object-[50%_15%]"
                        priority
                      />
                    </motion.div>

                    <motion.div
                      className="absolute bottom-[-16px] right-[0px] md:right-[-20px] lg:right-[-40px] max-w-[180px] md:max-w-[200px] z-20 hover:scale-105 transition-transform duration-300"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      animate={{ y: [0, -6, 0] }}
                    >
                      <div
                        className="p-3 md:p-4 rounded-2xl"
                        style={{
                          background: "rgba(20,10,40,0.85)",
                          border: "1px solid rgba(168,85,247,0.25)",
                          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                        }}
                      >
                        <p className="text-[11px] md:text-xs text-purple-300 italic leading-relaxed break-words">
                          "Learning fast. Building faster."
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex-shrink-0" />
                          <span className="text-[9px] md:text-[10px] text-gray-500 whitespace-nowrap">
                            Idam Palada
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="col-span-12 lg:col-span-7 min-w-0 w-full mt-6 md:mt-0">
                  <RevealLine
                    delay={0.15}
                    className="text-purple-400 text-lg mb-2 font-light"
                  >
                    Hello, I'm
                  </RevealLine>
                  <RevealLine
                    delay={0.25}
                    className="text-4xl lg:text-5xl font-black text-white mb-10"
                  >
                    Idam Palada
                  </RevealLine>

                  <div className="space-y-6 mb-12 w-full">
                    {bioLines.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.7,
                          delay: 0.1 * i,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="text-gray-400 leading-relaxed text-base break-words"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-px mb-10 origin-left"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(168,85,247,0.4), transparent)",
                    }}
                  />

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10 w-full">
                    <StatCard number="2+" label="Years Experience" delay={0} />
                    <StatCard
                      number="5+"
                      label="Projects Shipped"
                      delay={0.1}
                    />
                    <div className="col-span-2 md:col-span-1">
                      <StatCard
                        number="99%"
                        label="Client Satisfaction"
                        delay={0.2}
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-xs text-gray-600 uppercase tracking-widest mb-4"
                    >
                      Tech Stack
                    </motion.p>
                    <div className="flex flex-wrap gap-2 w-full">
                      {skills.map((s, i) => (
                        <SkillTag key={s} label={s} delay={i * 0.04} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 md:mt-28 w-full overflow-hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="w-full"
                >
                  <div className="w-full h-px mb-6 md:mb-10 bg-gradient-to-r from-transparent via-purple-800/40 to-transparent" />
                  <div className="w-full flex items-center gap-10 overflow-hidden whitespace-nowrap">
                    <motion.div
                      className="flex items-center gap-10 text-sm tracking-widest uppercase font-medium"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 22,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                      style={{ willChange: "transform" }}
                    >
                      {[
                        "Fullstack Development",
                        "•",
                        "Backend Engineering",
                        "•",
                        "UI/UX Design",
                        "•",
                        "Machine Learning",
                        "•",
                        "IT Infrastructure",
                        "•",
                        "Fullstack Development",
                        "•",
                        "Backend Engineering",
                        "•",
                        "UI/UX Design",
                        "•",
                        "Machine Learning",
                        "•",
                        "IT Infrastructure",
                        "•",
                      ].map((item, i) => (
                        <span
                          key={i}
                          className={
                            item === "•" ? "text-purple-700" : "text-gray-600"
                          }
                        >
                          {item}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                  <div className="w-full h-px mt-6 md:mt-10 bg-gradient-to-r from-transparent via-purple-800/40 to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
