"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineEntry {
  period: string;
  title: string;
  place: string;
  desc: string;
  tag: string;
  active?: boolean;
}

interface TimelineItemProps {
  item: TimelineEntry;
  index: number;
  isExperience: boolean;
  isMobile: boolean;
}

interface ColumnProps {
  title: string;
  emoji: string;
  data: TimelineEntry[];
  isExperience: boolean;
  isMobile: boolean;
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

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Components ───────────────────────────────────────────────────────────────

function TimelineItem({ item, index, isExperience, isMobile }: TimelineItemProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const accentColor = isExperience ? "#a78bfa" : "#818cf8";
  const placeColor = isExperience ? "#c4b5fd" : "#a5b4fc";

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
      }}
    >
      {/* Dot + vertical line */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        width: "24px",
        marginRight: "16px",
      }}>
        <div style={{
          width: item.active ? "13px" : "9px",
          height: item.active ? "13px" : "9px",
          borderRadius: "50%",
          background: item.active
            ? `linear-gradient(135deg, ${accentColor}, #818cf8)`
            : "rgba(167,139,250,0.3)",
          border: item.active
            ? "2px solid rgba(167,139,250,0.6)"
            : "1.5px solid rgba(129,140,248,0.35)",
          marginTop: "4px",
          flexShrink: 0,
          boxShadow: item.active ? "0 0 10px rgba(167,139,250,0.45)" : "none",
          zIndex: 1,
        }} />
        <div style={{
          width: "1.5px",
          flex: 1,
          background: "linear-gradient(to bottom, rgba(129,140,248,0.25), transparent)",
          marginTop: "5px",
          minHeight: "32px",
        }} />
      </div>

      {/* Period + card */}
      <div style={{ flex: 1, paddingBottom: "24px", minWidth: 0 }}>
        <div style={{
          fontSize: "10.5px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: accentColor,
          marginBottom: "8px",
          lineHeight: 1,
        }}>
          {item.period}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: item.active
              ? "1px solid rgba(167,139,250,0.35)"
              : "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            padding: isMobile ? "14px" : "20px 22px",
            transition: "border-color 0.3s, background 0.3s",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(167,139,250,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
            (e.currentTarget as HTMLDivElement).style.borderColor = item.active
              ? "rgba(167,139,250,0.35)"
              : "rgba(255,255,255,0.07)";
          }}
        >
          {/* Corner glow */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "60px", height: "60px",
            background: `radial-gradient(circle at top right, ${accentColor}12, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* Tag */}
          <div style={{
            display: "inline-block",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: accentColor,
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}33`,
            borderRadius: "4px",
            padding: "2px 7px",
            marginBottom: "9px",
          }}>
            {item.tag}
          </div>

          <h4 style={{
            fontSize: isMobile ? "15px" : "16px",
            fontWeight: 700,
            color: "#f1f5f9",
            margin: "0 0 3px",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}>
            {item.title}
          </h4>

          <p style={{
            fontSize: "12.5px",
            color: placeColor,
            margin: "0 0 9px",
            fontWeight: 500,
          }}>
            {item.place}
          </p>

          <p style={{
            fontSize: "13px",
            color: "rgba(148,163,184,0.82)",
            margin: 0,
            lineHeight: 1.65,
          }}>
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function Column({ title, emoji, data, isExperience, isMobile }: ColumnProps) {
  return (
    <div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "28px",
      }}>
        <span style={{ fontSize: "20px" }}>{emoji}</span>
        <h3 style={{
          fontSize: isMobile ? "20px" : "22px",
          fontWeight: 800,
          color: "#f1f5f9",
          margin: 0,
          letterSpacing: "-0.02em",
        }}>
          {title}
        </h3>
      </div>

      <div>
        {data.map((item: TimelineEntry, i: number) => (
          <TimelineItem
            key={i}
            item={item}
            index={i}
            isExperience={isExperience}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Education() {
  const isMobile = useIsMobile();
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="education"
      className="relative scroll-mt-24 px-4 sm:px-6 pt-14 md:pt-24 pb-12 max-w-[1280px] mx-auto"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: "absolute", top: "5%", left: "-10%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "-10%",
          width: "350px", height: "350px",
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* ── HEADER — matches your original Tailwind style ── */}
      <div
        className="mb-14 md:mb-24 text-center relative z-10"
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? "none" : "translateY(-14px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h2 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">
          Education & Experience
        </h2>
        <p className="flex items-center justify-center gap-3 text-gray-400">
          <span className="text-purple-400">✦</span>
          Academic background & professional experience
          <span className="text-purple-400">✦</span>
        </p>
      </div>

      {/* Grid — 1 col mobile, 2 col desktop */}
      <div
        className="relative z-10"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? "48px" : "56px 64px",
        }}
      >
        <Column
          title="My Education"
          emoji="🎓"
          data={educationData}
          isExperience={false}
          isMobile={isMobile}
        />
        <Column
          title="My Experience"
          emoji="💼"
          data={experienceData}
          isExperience={true}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}