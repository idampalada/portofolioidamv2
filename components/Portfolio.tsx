"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabType = "projects" | "services" | "tech";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Sneakersflash",
    category: "E-Commerce",
    desc: "Fashion e-commerce platform with focus on UX and application performance. End-to-end implementation from design to deployment.",
    media: "/sneakersflash.mp4",
    link: "https://sneakersflash.com/",
  },
  {
    id: 2,
    title: "KJM Logistic",
    category: "Company Profile",
    desc: "Company profile website for a logistics company, enhancing professional image and digital presence.",
    media: "/kjmlogisticc.mp4",
    link: "https://kjmlogistic.com/",
  },
  {
    id: 3,
    title: "COA Campaign",
    category: "Microsite",
    desc: "Redeem code microsite designed and launched for a digital marketing campaign.",
    media: "/coaa.mp4",
  },
  {
    id: 4,
    title: "Chemkit Multi Guna",
    category: "Company Profile",
    desc: "Laboratory company profile website design for PT Chemkit Multi Guna.",
    media: "/chemkit.mp4",
    link: "https://chemkitmultiguna.com/",
  },
  {
    id: 5,
    title: "Shortlink System",
    category: "Internal Tool",
    desc: "URL shortening application with integrated security monitoring and analytics.",
    media: "/shortlink.mp4",
  },
  {
    id: 6,
    title: "Asset Management",
    category: "Enterprise App",
    desc: "Asset management system with IoT device integration for the Ministry of Public Works.",
    media: "/mapu.mp4",
  },
  {
    id: 7,
    title: "Digital Transformation",
    category: "Gov Platform",
    desc: "Digital transformation management system for government internal operations.",
    media: "/transformasidigital.mp4",
  },
];

const services = [
  {
    icon: "◈",
    label: "Website Development",
    desc: "Company Profile, Landing Page, E-Commerce",
  },
  {
    icon: "⬡",
    label: "Fullstack Web Application",
    desc: "React, Next.js, Node.js, Laravel",
  },
  {
    icon: "◇",
    label: "UI/UX Design",
    desc: "Figma prototyping, design systems",
  },
  {
    icon: "◉",
    label: "SEO Optimization",
    desc: "Performance, meta, structured data",
  },
  {
    icon: "◈",
    label: "Maintenance & Deployment",
    desc: "CI/CD, VPS, cloud hosting",
  },
  {
    icon: "⬡",
    label: "REST API Development",
    desc: "Integration & documentation",
  },
  {
    icon: "◇",
    label: "Database Design",
    desc: "PostgreSQL, MySQL, schema optimization",
  },
  { icon: "◉", label: "Auth Systems", desc: "JWT, OAuth, role-based access" },
  {
    icon: "◈",
    label: "Admin Dashboard & CMS",
    desc: "Custom panels, content management",
  },
  {
    icon: "⬡",
    label: "Performance Optimization",
    desc: "Profiling, caching, code splitting",
  },
  {
    icon: "◇",
    label: "Responsive Development",
    desc: "Mobile-first, cross-browser",
  },
  {
    icon: "◉",
    label: "Third-Party Integrations",
    desc: "Payment gateways, maps, analytics",
  },
];

const techStack = [
  { src: "/html.svg", name: "HTML" },
  { src: "/css.svg", name: "CSS" },
  { src: "/javascript.svg", name: "JavaScript" },
  { src: "/reactjs.svg", name: "React" },
  { src: "/nodejs.svg", name: "Node.js" },
  { src: "/tailwind.svg", name: "Tailwind" },
  { src: "/vercel.svg", name: "Vercel" },
  { src: "/php.svg", name: "PHP" },
  { src: "/codeigniter.svg", name: "CodeIgniter" },
  { src: "/laravel.svg", name: "Laravel" },
  { src: "/postgre.svg", name: "PostgreSQL" },
  { src: "/typescript.svg", name: "TypeScript" },
];

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-6 py-2.5 text-sm font-semibold transition-colors duration-200 rounded-full"
      style={{ color: active ? "#fff" : "rgba(148,163,184,0.7)" }}
    >
      {active && (
        <motion.div
          layoutId="tab-pill"
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(109,40,217,0.7)",
            border: "1px solid rgba(168,85,247,0.4)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "rgba(168,85,247,0.4)" : "rgba(168,85,247,0.12)"}`,
        transition: "border-color 0.3s",
        boxShadow: hovered ? "0 20px 60px rgba(109,40,217,0.2)" : "none",
      }}
    >
      {/* Video */}
      <div className="relative h-[380px] overflow-hidden bg-[#0a0514]">
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <video
            src={project.media}
            className="w-full h-full object-cover opacity-90"
            muted
            loop
            autoPlay
            playsInline
          />
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(12,5,18,0.75)",
              border: "1px solid rgba(168,85,247,0.3)",
              color: "#c084fc",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(12,5,18,0.55)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="flex gap-3">
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white"
                style={{
                  background: "rgba(109,40,217,0.8)",
                  border: "1px solid rgba(168,85,247,0.5)",
                }}
              >
                <ArrowUpRight size={13} />
                View Live
              </motion.a>
            )}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/project/${project.id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Details →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-bold text-white leading-tight"
            style={{ fontSize: 16, letterSpacing: "-0.01em" }}
          >
            {project.title}
          </h3>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight
              size={16}
              className="text-purple-500 flex-shrink-0 mt-0.5"
            />
          </motion.div>
        </div>
        <p className="text-gray-500 text-[13px] leading-relaxed">
          {project.desc}
        </p>
      </div>

      {/* Bottom progress line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(to right, #7c3aed, #c084fc)",
        }}
      />
    </motion.div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className="relative p-5 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: hovered
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "rgba(168,85,247,0.35)" : "rgba(168,85,247,0.12)"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Corner number */}
      <div
        className="absolute top-4 right-4 text-[10px] font-black tracking-wider tabular-nums transition-colors duration-300"
        style={{ color: hovered ? "#7c3aed" : "rgba(109,40,217,0.3)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Bottom bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px]"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "linear-gradient(to right, #7c3aed, #c084fc)" }}
      />

      {/* Corner glow */}
      <div
        className="absolute top-0 left-0 w-20 h-20 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%)",
          opacity: hovered ? 1 : 0,
          transform: "translate(-30%, -30%)",
        }}
      />

      <div
        className="text-xl mb-3 transition-colors duration-300"
        style={{ color: hovered ? "#c084fc" : "#7c3aed" }}
      >
        {service.icon}
      </div>
      <h4
        className="font-bold text-white mb-1 leading-snug"
        style={{ fontSize: 14, letterSpacing: "-0.01em" }}
      >
        {service.label}
      </h4>
      <p
        className="text-[12px] leading-relaxed"
        style={{ color: "rgba(148,163,184,0.65)" }}
      >
        {service.desc}
      </p>
    </motion.div>
  );
}

// ─── Tech Card ────────────────────────────────────────────────────────────────

function TechCard({
  tech,
  index,
}: {
  tech: (typeof techStack)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl cursor-default group"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(168,85,247,0.12)",
        aspectRatio: "1",
        minHeight: 110,
      }}
      whileHover={{
        background: "rgba(109,40,217,0.08)",
        borderColor: "rgba(168,85,247,0.35)",
        y: -6,
        scale: 1.05,
        boxShadow: "0 16px 40px rgba(109,40,217,0.2)",
      }}
    >
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image
          src={tech.src}
          alt={tech.name}
          fill
          className="object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <p
        className="text-[11px] font-medium text-center leading-tight"
        style={{ color: "rgba(148,163,184,0.7)" }}
      >
        {tech.name}
      </p>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const sectionRef = useRef<HTMLElement>(null);

  const tabVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-36"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0C0512]" />
        <div
          className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(109,40,217,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a855f7 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-16">
        {/* ── SECTION LABEL ── */}
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
            Work
          </motion.span>
        </div>

        {/* ── HEADING ── */}
        <div className="mb-14 overflow-hidden">
          <motion.h2
            initial={{ y: "105%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(40px,8vw,100px)] font-black leading-[0.9] tracking-tight"
          >
            <span className="text-white">Selected </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px rgba(168,85,247,0.45)" }}
            >
              Projects
            </span>
          </motion.h2>
        </div>

        {/* ── TABS ── */}
        <div className="flex justify-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-1 p-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(168,85,247,0.15)",
            }}
          >
            {[
              { key: "projects", label: "Projects" },
              { key: "services", label: "Services" },
              { key: "tech", label: "Tech Stack" },
            ].map((tab) => (
              <TabBtn
                key={tab.key}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key as TabType)}
              >
                {tab.label}
              </TabBtn>
            ))}
          </motion.div>
        </div>

        {/* ── CONTENT ── */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              key="services"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, i) => (
                  <ServiceCard key={i} service={service} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div
              key="tech"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {techStack.map((tech, i) => (
                  <TechCard key={tech.name} tech={tech} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
