"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TabType = "projects" | "services" | "tech";

// 🔥 PERBAIKAN 2: Ubah '.mp4' menjadi '.jpg' atau '.png'
// Menghindari load 7 tag <video> sekaligus yang memakan RAM sangat besar
const projects = [
  {
    id: 1,
    title: "Sneakersflash",
    category: "E-Commerce",
    desc: "Fashion e-commerce platform with focus on UX and application performance. End-to-end implementation from design to deployment.",
    image: "/sneakersflash.jpg", // <--- Pastikan file gambar ini ada di folder public
    link: "https://sneakersflash.com/",
  },
  {
    id: 2,
    title: "KJM Logistic",
    category: "Company Profile",
    desc: "Company profile website for a logistics company, enhancing professional image and digital presence.",
    image: "/kjmlogisticc.jpg",
    link: "https://kjmlogistic.com/",
  },
  {
    id: 3,
    title: "COA Campaign",
    category: "Microsite",
    desc: "Redeem code microsite designed and launched for a digital marketing campaign.",
    image: "/coaa.jpg",
  },
  {
    id: 4,
    title: "Chemkit Multi Guna",
    category: "Company Profile",
    desc: "Laboratory company profile website design for PT Chemkit Multi Guna.",
    image: "/chemkit.jpg",
    link: "https://chemkitmultiguna.com/",
  },
  {
    id: 5,
    title: "Shortlink System",
    category: "Internal Tool",
    desc: "URL shortening application with integrated security monitoring and analytics.",
    image: "/shortlink.jpg",
  },
  {
    id: 6,
    title: "Asset Management",
    category: "Enterprise App",
    desc: "Asset management system with IoT device integration for the Ministry of Public Works.",
    image: "/mapu.jpg",
  },
  {
    id: 7,
    title: "Digital Transformation",
    category: "Gov Platform",
    desc: "Digital transformation management system for government internal operations.",
    image: "/transformasidigital.jpg",
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
      className="relative px-6 py-2.5 text-sm font-semibold transition-colors duration-200 rounded-full cursor-pointer"
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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // 🔥 PERBAIKAN 3: Disederhanakan karena <video> dihapus
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
      // Mengandalkan pure CSS/Tailwind untuk hover (lebih enteng dari framer-motion)
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[rgba(255,255,255,0.025)] border border-[rgba(168,85,247,0.12)] hover:border-[rgba(168,85,247,0.4)] hover:shadow-[0_20px_60px_rgba(109,40,217,0.2)] transition-all duration-300 w-full"
    >
      <div className="relative h-[280px] md:h-[380px] overflow-hidden bg-[#0a0514]">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
          />
        </div>
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-black/70 border border-purple-500/30 text-purple-300 backdrop-blur-md">
            {project.category}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs font-bold bg-purple-700/80 border border-purple-400 text-white flex items-center gap-2 hover:bg-purple-600 transition-colors"
              >
                <ArrowUpRight size={14} /> View Live
              </a>
            )}
            <Link
              href={`/project/${project.id}`}
              className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2">
          {project.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔥 PERBAIKAN 4: Karantina efek PIN hanya untuk Desktop (>768px)
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: () => "+=" + window.innerHeight,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative z-40 bg-[#0C0512] min-h-screen py-24 overflow-hidden w-full"
      style={{
        borderTop: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none" />

      {/* Sembunyikan Blur Background raksasa ini di Mobile */}
      <div className="absolute inset-0 -z-10 pointer-events-none w-full h-full hidden md:block">
        <div
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(109,40,217,0.06) 0%, transparent 70%)",
            filter: "blur(100px)",
            willChange: "transform, filter",
          }}
        />
      </div>

      <div className="max-w-[1320px] w-full mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-purple-500" />
          <span className="text-purple-400 text-xs tracking-[0.25em] uppercase font-medium">
            Work
          </span>
        </div>

        <div className="mb-14 w-full">
          <h2 className="text-[clamp(40px,8vw,100px)] font-black leading-[0.9] tracking-tight">
            <span className="text-white">Selected </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px rgba(168,85,247,0.4)" }}
            >
              Projects
            </span>
          </h2>
        </div>

        <div className="flex justify-center mb-16 w-full">
          <div className="flex gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-x-auto max-w-full no-scrollbar">
            {(["projects", "services", "tech"] as const).map((key) => (
              <TabBtn
                key={key}
                active={activeTab === key}
                onClick={() => setActiveTab(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TabBtn>
            ))}
          </div>
        </div>

        <div className="relative min-h-[600px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {activeTab === "projects" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              )}

              {activeTab === "services" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {services.map((service, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all w-full"
                    >
                      <div className="text-2xl mb-4 text-purple-500">
                        {service.icon}
                      </div>
                      <h4 className="text-white font-bold mb-2">
                        {service.label}
                      </h4>
                      <p className="text-gray-500 text-sm">{service.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "tech" && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full">
                  {techStack.map((tech, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 aspect-square hover:bg-purple-500/5 transition-all group w-full"
                    >
                      <div className="w-12 h-12 relative mb-3 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <Image
                          src={tech.src}
                          alt={tech.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
