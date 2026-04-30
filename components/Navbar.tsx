"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const MENU = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────

function NavLink({
  item,
  active,
}: {
  item: (typeof MENU)[0];
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={item.href}
        className="relative text-sm font-medium transition-colors duration-200 py-1"
        style={{ color: active ? "#e2d9f3" : "rgba(148,163,184,0.75)" }}
      >
        {item.label}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute bottom-0 left-0 right-0 h-px rounded-full"
            style={{ background: "#a78bfa" }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
      </Link>
    </li>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();

  // Scroll-aware background
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  // Active section tracker
  useEffect(() => {
    const ids = MENU.map((m) => m.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 z-[9999] w-full"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: scrolled ? "rgba(12,5,18,0.85)" : "rgba(12,5,18,0)",
            backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
            borderBottom: scrolled
              ? "1px solid rgba(167,139,250,0.12)"
              : "1px solid transparent",
          }}
          transition={{ duration: 0.35 }}
        />

        {/* ── DESKTOP ── */}
        <nav className="hidden md:grid grid-cols-3 items-center h-20 px-8 lg:px-16 relative">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-3 group w-fit">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/logoidam.svg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </motion.div>
            <span className="text-sm font-bold text-white tracking-tight"></span>
          </Link>

          {/* Menu */}
          <ul className="flex justify-center items-center gap-8 list-none">
            {MENU.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                active={activeSection === item.href.replace("#", "")}
              />
            ))}
          </ul>

          {/* CTA */}
          <div className="flex justify-end">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#contact"
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden group"
                style={{
                  background: "rgba(109,40,217,0.5)",
                  border: "1px solid rgba(167,139,250,0.35)",
                }}
              >
                {/* Shine */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}
                />
                Hire me
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* ── MOBILE ── */}
        <nav className="md:hidden flex items-center justify-between h-16 px-6 relative">
          <Link href="#hero" className="flex items-center gap-2.5">
            <Image src="/logoidam.svg" alt="Logo" width={26} height={26} />
            <span className="text-sm font-bold text-white"></span>
          </Link>

          {/* Hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.92 }}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={
                isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
          </motion.button>
        </nav>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9998] md:hidden flex flex-col"
            style={{
              background: "rgba(10,4,20,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Top spacer */}
            <div className="h-16" />

            {/* Glow */}
            <div
              className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(109,40,217,0.15), transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            <div className="flex-1 flex flex-col px-8 pt-10 pb-10 relative">
              {/* Nav items */}
              <nav className="flex-1">
                <ul className="space-y-1">
                  {MENU.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between py-4 group"
                        style={{
                          borderBottom: "1px solid rgba(167,139,250,0.08)",
                        }}
                      >
                        <span
                          className="text-2xl font-black tracking-tight transition-colors duration-200 group-hover:text-purple-300"
                          style={{
                            color:
                              activeSection === item.href.replace("#", "")
                                ? "#a78bfa"
                                : "rgba(255,255,255,0.85)",
                          }}
                        >
                          {item.label}
                        </span>
                        <motion.span
                          animate={{
                            x: 0,
                            opacity:
                              activeSection === item.href.replace("#", "")
                                ? 1
                                : 0,
                          }}
                          className="text-purple-500 text-sm"
                        >
                          ●
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="space-y-5"
              >
                <p className="text-gray-600 text-xs leading-relaxed">
                  Building scalable web solutions with clean architecture and
                  great UX.
                </p>

                <div className="flex gap-3">
                  <Link
                    href="#portfolio"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 rounded-full text-center text-xs font-semibold text-purple-300 transition-all duration-200"
                    style={{
                      background: "rgba(109,40,217,0.15)",
                      border: "1px solid rgba(167,139,250,0.25)",
                    }}
                  >
                    View Work
                  </Link>
                  <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 rounded-full text-center text-xs font-semibold text-white transition-all duration-200"
                    style={{
                      background: "rgba(109,40,217,0.6)",
                      border: "1px solid rgba(167,139,250,0.4)",
                    }}
                  >
                    Hire me
                  </Link>
                </div>

                {/* Socials */}
                <div className="flex gap-3 justify-center pt-2">
                  {[
                    { label: "GH", href: "https://github.com/idampalada" },
                    {
                      label: "LI",
                      href: "https://linkedin.com/in/idam-palada",
                    },
                    { label: "IG", href: "https://instagram.com/idam.palada" },
                    { label: "WA", href: "https://wa.me/6281287809468" },
                  ].map(({ label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.93 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black text-purple-400"
                      style={{
                        background: "rgba(109,40,217,0.12)",
                        border: "1px solid rgba(167,139,250,0.2)",
                      }}
                    >
                      {label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
