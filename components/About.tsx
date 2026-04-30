"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ─── SKILL TAG ──────────────────────────────────────── */
function SkillTag({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.06,
        backgroundColor: "rgba(139,92,246,0.2)",
        borderColor: "rgba(168,85,247,0.5)",
        transition: { duration: 0.2 },
      }}
      className="inline-block px-4 py-2 rounded-full text-xs text-purple-300 cursor-default select-none"
      style={{
        background: "rgba(109,40,217,0.12)",
        border: "1px solid rgba(168,85,247,0.2)",
      }}
    >
      {label}
    </motion.span>
  );
}

/* ─── REVEAL LINE ─────────────────────────────────────── */
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
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── STAT CARD ──────────────────────────────────────── */
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
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="relative p-5 rounded-2xl cursor-default group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(168,85,247,0.12)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.1), transparent 70%)",
        }}
      />
      <div className="text-2xl font-black text-white mb-1">{number}</div>
      <div className="text-xs text-gray-500 leading-tight">{label}</div>
    </motion.div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax transforms */
  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden pt-6 pb-16 md:pt-8 md:pb-20"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0C0512]" />

        <motion.div
          style={{
            y: glowY,
            background:
              "radial-gradient(circle, #7C3AED 0%, #4C1D95 40%, transparent 70%)",
            filter: "blur(100px)",
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dot matrix */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a855f7 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-16">
        {/* ── SECTION LABEL ── */}
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
            className="text-purple-400 text-xs tracking-[0.25em] uppercase font-medium"
          >
            About me
          </motion.span>
        </div>

        {/* ── LARGE HEADING ── */}
        <div className="mb-6 md:mb-8">
          <RevealLine className="text-[clamp(48px,10vw,120px)] font-black leading-[0.88] tracking-tight text-white">
            Who I
          </RevealLine>
          <RevealLine
            delay={0.1}
            className="text-[clamp(48px,10vw,120px)] font-black leading-[0.88] tracking-tight text-transparent"
            style={
              {
                WebkitTextStroke: "1px rgba(168,85,247,0.5)",
              } as React.CSSProperties
            }
          >
            Really Am
          </RevealLine>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="grid grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT — Image */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              ref={imageRef}
              style={{ scale: imageScale, y: imageY }}
              className="relative"
            >
              {/* Outer glow ring */}
              <div
                className="absolute inset-[-2px] rounded-[2rem] pointer-events-none z-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(109,40,217,0.1), rgba(232,121,249,0.3))",
                  filter: "blur(1px)",
                }}
              />

              {/* Main image card */}
              <motion.div
                whileHover={{ rotate: 0, scale: 1.02 }}
                initial={{ rotate: -3 }}
                className="relative w-[280px] md:w-[360px] h-[380px] md:h-[460px] rounded-[2rem] overflow-hidden"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  border: "1px solid rgba(168,85,247,0.25)",
                  boxShadow:
                    "0 0 0 1px rgba(168,85,247,0.08), 0 60px 160px rgba(109,40,217,0.45)",
                }}
              >
                {/* Image overlay */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(12,5,18,0.5) 0%, transparent 50%, rgba(109,40,217,0.1) 100%)",
                  }}
                />

                {/* Shimmer on hover */}
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
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

              {/* Floating quote card */}
              <motion.div
                className="absolute bottom-[-20px] right-[-20px] lg:right-[-40px] max-w-[200px] z-20"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                animate={{ y: [0, -6, 0] }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: "rgba(20, 10, 40, 0.85)",
                    border: "1px solid rgba(168,85,247,0.25)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  <p className="text-xs text-purple-300 italic leading-relaxed">
                    "Learning fast. Building faster."
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600" />
                    <span className="text-[10px] text-gray-500">
                      Idam Palada
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — Text */}
          <div className="col-span-12 lg:col-span-7">
            {/* Greeting */}
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

            {/* Bio paragraphs */}
            <div className="space-y-6 mb-12">
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
                  className="text-gray-400 leading-relaxed text-base"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Divider */}
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

            {/* Mini stat cards */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              <StatCard number="2+" label="Years Experience" delay={0} />
              <StatCard number="5+" label="Projects Shipped" delay={0.1} />
              <StatCard number="99%" label="Client Satisfaction" delay={0.2} />
            </div>

            {/* Skills */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs text-gray-600 uppercase tracking-widest mb-4"
              >
                Tech Stack
              </motion.p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <SkillTag key={s} label={s} delay={i * 0.04} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── HORIZONTAL MARQUEE ── */}
        <div className="mt-28 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-px mb-10 bg-gradient-to-r from-transparent via-purple-800/40 to-transparent" />
            <div className="flex items-center gap-10 overflow-hidden whitespace-nowrap">
              <motion.div
                className="flex items-center gap-10 text-gray-800 text-sm tracking-widest uppercase font-medium"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity }}
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
            <div className="w-full h-px mt-10 bg-gradient-to-r from-transparent via-purple-800/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
