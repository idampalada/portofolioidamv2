"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineEntry {
  period: string;
  title: string;
  place: string;
  desc: string;
  tag: string;
  active?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const educationData: TimelineEntry[] = [
  {
    period: "2021 – 2025",
    title: "Bachelor of Informatics",
    place: "Universitas Al Azhar Indonesia",
    desc: "Web development, software engineering, and system design. Structured programming, problem-solving, and scalable applications.",
    tag: "S.Kom",
  },
  {
    period: "2017 – 2020",
    title: "Vocational Diploma",
    place: "SMK Bina Informatika",
    desc: "Computer networks, LAN configuration, troubleshooting, server fundamentals. Cisco tools, Debian servers, VirtualBox.",
    tag: "TKJ",
  },
  {
    period: "2014 – 2017",
    title: "Junior High School",
    place: "SMP Muhammadiyah 8 Jakarta",
    desc: "Strong foundation in general studies and early exposure to technology.",
    tag: "SMP",
  },
];

const experienceData: TimelineEntry[] = [
  {
    period: "Jan 2025 – Present",
    title: "Web Developer",
    place: "Ministry of Public Works",
    desc: "Web-based systems for internal government operations — system optimization, data management, and application performance.",
    tag: "FULL-TIME",
    active: true,
  },
  {
    period: "Aug – Dec 2023",
    title: "Product Development",
    place: "PT. Uswah Salam Alazhar",
    desc: "Requirement analysis, feature implementation, collaboration with cross-functional teams for user-focused digital products.",
    tag: "INTERNSHIP",
  },
  {
    period: "Sep – Dec 2023",
    title: "IT Infrastructure",
    place: "PT. Perusahaan Perdagangan Indonesia",
    desc: "Network monitoring, hardware troubleshooting, and system maintenance for reliable and secure business operations.",
    tag: "INTERNSHIP",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function TimelineCard({ item, index }: { item: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center flex-shrink-0 w-5">
        <motion.div
          animate={item.active ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex-shrink-0 mt-1"
          style={{ zIndex: 1 }}
        >
          <div
            className="rounded-full"
            style={{
              width: item.active ? 13 : 9,
              height: item.active ? 13 : 9,
              background: item.active
                ? "linear-gradient(135deg, #a78bfa, #c084fc)"
                : "#7c3aed",
              boxShadow: item.active
                ? "0 0 0 3px rgba(167,139,250,0.2), 0 0 16px rgba(167,139,250,0.5)"
                : "none",
            }}
          />
          {item.active && (
            <motion.div
              className="absolute inset-[-4px] rounded-full border border-purple-400/30"
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
        </motion.div>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
          className="flex-1 w-px origin-top mt-2"
          style={{
            background:
              "linear-gradient(to bottom, rgba(167,139,250,0.3), transparent)",
            minHeight: 32,
          }}
        />
      </div>

      <div className="flex-1 pb-8 min-w-0">
        <p
          className="text-[10.5px] font-bold tracking-[0.12em] uppercase mb-2"
          style={{ color: "#a78bfa" }}
        >
          {item.period}
        </p>
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -3 }}
          className="relative rounded-2xl p-5 overflow-hidden cursor-default"
          style={{
            background: hovered
              ? "rgba(255,255,255,0.055)"
              : "rgba(255,255,255,0.025)",
            border: `1px solid ${hovered ? "rgba(167,139,250,0.45)" : "rgba(167,139,250,0.18)"}`,
            transition: "background 0.3s, border-color 0.3s",
          }}
        >
          <div
            className="absolute top-0 left-0 w-24 h-24 rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle, rgba(167,139,250,0.12), transparent 70%)",
              opacity: hovered ? 1 : 0,
              transform: "translate(-30%, -30%)",
            }}
          />
          <span
            className="inline-block text-[9px] font-bold tracking-[0.14em] uppercase rounded-md px-2 py-1 mb-3"
            style={{
              color: item.active ? "#c084fc" : "#a78bfa",
              background: item.active
                ? "rgba(192,132,252,0.12)"
                : "rgba(167,139,250,0.1)",
              border: `1px solid ${item.active ? "rgba(192,132,252,0.25)" : "rgba(167,139,250,0.2)"}`,
            }}
          >
            {item.tag}
          </span>
          <h4
            className="font-bold mb-1 leading-snug text-white"
            style={{ fontSize: 15 }}
          >
            {item.title}
          </h4>
          <p className="text-[12.5px] font-medium mb-3 text-purple-300/80">
            {item.place}
          </p>
          <p className="text-[13px] leading-relaxed text-slate-400/80">
            {item.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ColumnHeader({
  label,
  title,
  delay = 0,
}: {
  label: string;
  title: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="mb-10">
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-500 mb-2 flex items-center gap-2"
      >
        <span className="inline-block w-6 h-px bg-purple-600" />
        {label}
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.65,
          delay: delay + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-2xl md:text-3xl font-black text-white tracking-tight"
      >
        {title}
      </motion.h3>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const innerWrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          innerWrapperRef.current,
          { borderRadius: "2.5rem 2.5rem 0 0" },
          {
            borderRadius: "0rem 0rem 0 0",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "top 0%",
              scrub: true,
            },
          },
        );

        // Karantina fitur PIN hanya untuk Desktop/Tablet (>768px)
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

  return (
    <div
      ref={containerRef}
      id="education"
      className="relative z-30 bg-[#0C0512]"
    >
      <section ref={sectionRef} className="relative">
        <div
          ref={innerWrapperRef}
          className="relative overflow-hidden py-24 md:py-32"
          style={{
            background: "#0C0512",
            boxShadow: "0 -40px 120px rgba(0,0,0,0.9)",
            willChange: "border-radius",
          }}
        >
          {/* Glowing top edge line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(168,85,247,0.6), transparent)",
            }}
          />

          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              style={{
                y: glowY,
                background:
                  "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
                filter: "blur(80px)",
                willChange: "transform, filter",
              }}
              className="absolute right-[-10%] top-[20%] w-[600px] h-[600px] rounded-full pointer-events-none"
            />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-16 w-full">
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-6">
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
                Background
              </motion.span>
            </div>

            {/* Heading */}
            <div className="mb-16 md:mb-20 overflow-hidden">
              <motion.h2
                initial={{ y: "105%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(40px,8vw,90px)] font-black leading-[0.9] tracking-tight"
              >
                <span className="text-white">Education </span>
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(168,85,247,0.45)" }}
                >
                  & Work
                </span>
              </motion.h2>
            </div>

            {/* Two Column Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
              <div>
                <ColumnHeader label="Academic" title="My Education" delay={0} />
                <div className="space-y-2">
                  {educationData.map((item, i) => (
                    <TimelineCard key={i} item={item} index={i} />
                  ))}
                </div>
              </div>

              <div>
                <ColumnHeader
                  label="Professional"
                  title="My Experience"
                  delay={0.15}
                />
                <div className="space-y-2">
                  {experienceData.map((item, i) => (
                    <TimelineCard key={i} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Marquee */}
            <div className="mt-24 overflow-hidden">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-800/40 to-transparent mb-10" />
              <motion.div
                className="flex gap-10 text-sm tracking-widest uppercase font-medium whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              >
                {[
                  "Informatics Engineering",
                  "•",
                  "Web Development",
                  "•",
                  "IT Infrastructure",
                  "•",
                  "Product Management",
                  "•",
                  "System Design",
                  "•",
                ]
                  .concat([
                    "Informatics Engineering",
                    "•",
                    "Web Development",
                    "•",
                    "IT Infrastructure",
                    "•",
                    "Product Management",
                    "•",
                    "System Design",
                    "•",
                  ])
                  .map((item, i) => (
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
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-800/40 to-transparent mt-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
