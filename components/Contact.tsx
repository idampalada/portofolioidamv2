"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";

// ─── Floating Label Input ─────────────────────────────────────────────────────

function FloatingInput({
  label,
  type = "text",
  name,
}: {
  label: string;
  type?: string;
  name: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: active ? -22 : 0,
          scale: active ? 0.78 : 1,
          color: active ? "#a78bfa" : "rgba(100,116,139,0.8)",
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-4 top-4 text-sm font-medium pointer-events-none origin-left"
        style={{ transformOrigin: "left center" }}
      >
        {label}
      </motion.label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl px-4 pt-6 pb-3 text-white text-sm outline-none transition-all duration-300"
        style={{
          background: focused
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.15)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(167,139,250,0.08)" : "none",
        }}
      />
    </div>
  );
}

function FloatingTextarea({ label, name }: { label: string; name: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: active ? -22 : 0,
          scale: active ? 0.78 : 1,
          color: active ? "#a78bfa" : "rgba(100,116,139,0.8)",
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-4 top-4 text-sm font-medium pointer-events-none origin-left"
        style={{ transformOrigin: "left center" }}
      >
        {label}
      </motion.label>
      <textarea
        name={name}
        rows={5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl px-4 pt-6 pb-3 text-white text-sm outline-none resize-none transition-all duration-300"
        style={{
          background: focused
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.15)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(167,139,250,0.08)" : "none",
        }}
      />
    </div>
  );
}

// ─── Contact Info Row ─────────────────────────────────────────────────────────

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  const inner = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: 4 }}
      className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300"
      style={{
        background: hovered
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "rgba(167,139,250,0.3)" : "rgba(167,139,250,0.1)"}`,
        cursor: href ? "pointer" : "default",
      }}
    >
      {/* Icon */}
      <motion.div
        animate={{ rotate: hovered ? 10 : 0, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl"
        style={{
          background: hovered
            ? "rgba(109,40,217,0.3)"
            : "rgba(109,40,217,0.15)",
          border: "1px solid rgba(167,139,250,0.2)",
        }}
      >
        <Icon size={18} className="text-purple-400" />
      </motion.div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-purple-500 mb-0.5">
          {label}
        </p>
        <p className="text-white text-sm font-semibold truncate">{value}</p>
      </div>

      {href && (
        <motion.div
          animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight size={15} className="text-purple-600 flex-shrink-0" />
        </motion.div>
      )}
    </motion.div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }, 1400);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-12"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0C0512]" />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
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
            Contact
          </motion.span>
        </div>

        {/* ── HEADING ── */}
        <div ref={headingRef} className="mb-16 md:mb-24 overflow-hidden">
          <motion.h2
            initial={{ y: "105%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(40px,8vw,100px)] font-black leading-[0.9] tracking-tight"
          >
            <span className="text-white">Let's </span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px rgba(168,85,247,0.45)" }}
            >
              Connect
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-base mt-4 max-w-md"
          >
            Have a project in mind? Let's talk. I'll get back to you within 24
            hours.
          </motion.p>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative rounded-3xl p-7 md:p-10"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(167,139,250,0.15)",
              boxShadow:
                "0 0 80px rgba(109,40,217,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
            />

            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                Send a message
              </h3>
              <p className="text-gray-500 text-sm">
                I design and build things I love. Let's make something together.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput label="First name" name="firstName" />
                <FloatingInput label="Last name" name="lastName" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput
                  label="Email address"
                  type="email"
                  name="email"
                />
                <FloatingInput label="Phone number" type="tel" name="phone" />
              </div>
              <FloatingTextarea label="Your message" name="message" />

              <motion.button
                type="submit"
                disabled={sending || sent}
                whileHover={{ scale: sending || sent ? 1 : 1.02 }}
                whileTap={{ scale: sending || sent ? 1 : 0.98 }}
                className="w-full py-4 rounded-full font-semibold text-sm text-white relative overflow-hidden transition-all duration-300"
                style={{
                  background: sent
                    ? "rgba(34,197,94,0.2)"
                    : "linear-gradient(135deg, #7c3aed, #a855f7)",
                  border: sent
                    ? "1px solid rgba(34,197,94,0.4)"
                    : "1px solid rgba(168,85,247,0.4)",
                  boxShadow: sent ? "none" : "0 8px 32px rgba(109,40,217,0.35)",
                }}
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-green-400"
                    >
                      <CheckCircle size={16} />
                      Message sent!
                    </motion.span>
                  ) : sending ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Send size={15} />
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT — INFO */}
          <div className="lg:col-span-5 space-y-4 lg:pt-4">
            <ContactRow
              icon={Phone}
              label="Phone"
              value="0812 8780 9468"
              href="https://wa.me/6281287809468"
              delay={0}
            />
            <ContactRow
              icon={Mail}
              label="Email"
              value="idampalada08@gmail.com"
              href="mailto:idampalada08@gmail.com"
              delay={0.1}
            />
            <ContactRow
              icon={MapPin}
              label="Location"
              value="Kebayoran Lama, Jakarta Selatan"
              delay={0.2}
            />

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 p-5 rounded-2xl"
              style={{
                background: "rgba(34,197,94,0.05)",
                border: "1px solid rgba(34,197,94,0.15)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ boxShadow: "0 0 8px rgba(74,222,128,0.8)" }}
                />
                <span className="text-green-400 text-xs font-bold tracking-[0.12em] uppercase">
                  Available for work
                </span>
              </div>
              <p className="text-gray-500 text-[12px] leading-relaxed">
                Currently open to freelance projects and full-time
                opportunities. Response time typically within 24 hours.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-3 pt-2"
            >
              {[
                { label: "GitHub", href: "https://github.com/idampalada" },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/idam-palada",
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com/idam.palada",
                },
              ].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 py-2.5 rounded-xl text-center text-[11px] font-semibold text-purple-400 transition-colors duration-200"
                  style={{
                    background: "rgba(109,40,217,0.1)",
                    border: "1px solid rgba(167,139,250,0.18)",
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
