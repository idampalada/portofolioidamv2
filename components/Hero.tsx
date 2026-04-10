"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import { Github, Linkedin, Instagram, Phone } from "lucide-react";

export default function Hero() {
  const texts = ["Fullstack Developer", "Backend Engineer", "UI/UX Design"];

  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 1500;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // NGETIK
        setDisplayedText(currentText.substring(0, displayedText.length + 1));

        if (displayedText === currentText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // MENGHAPUS
        setDisplayedText(currentText.substring(0, displayedText.length - 1));

        if (displayedText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  return (
    <section id="hero" className="relative md:min-h-screen overflow-hidden">
      {/* BACKGROUND GRADIENT - Sama seperti referensi */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#16082b] to-[#14062B]" />
        {/* Purple radial glow di tengah-kanan */}
        <div
          className="hidden md:block absolute top-1/2 right-[20%] -translate-y-1/2 
w-[1000px] h-[1000px] bg-purple-600/15 rounded-full blur-[150px]"
        />

        {/* Purple glow tambahan di kiri bawah */}
        <div
          className="hidden md:block absolute bottom-0 left-0 
w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"
        />
      </div>

      {/* TRANSPARENT "HI" BACKGROUND TEXT - Responsive size */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none overflow-hidden">
        <span
          className="text-[200px] md:text-[280px] lg:text-[380px] font-bold tracking-tighter select-none leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.03)",
          }}
        >
          HI
        </span>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 w-full">
        <div
          className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-64px)] pt-8 md:pt-0
"
        >
          {/* LEFT CONTENT */}
          <div className="col-span-12 lg:col-span-6 z-10 text-center lg:text-left">
            <p className="text-purple-400 mb-3 md:mb-4 text-sm font-medium tracking-wide">
              Hi, I'm
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-2 md:mb-3 text-white">
              Idam Palada
            </h1>

            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 mb-6 md:mb-8">
              {displayedText}
              <span className="md:animate-pulse text-purple-300">|</span>
            </h2>

            <p className="text-gray-400 max-w-[520px] mx-auto lg:mx-0 text-sm md:text-base leading-relaxed mb-8 md:mb-10 px-4 md:px-0">
              I build scalable, high-performance web applications with clean
              architecture and great user experience.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6 flex-wrap">
              {/* DOWNLOAD CV */}
              <button
                className="
                  px-6 md:px-8 py-3 md:py-3.5 rounded-full
                  border-2 border-[#9D80C8]/40
                  text-[#9D80C8] text-sm font-semibold
                  hover:bg-[#9D80C8]/10
                  hover:border-[#9D80C8]/60
                  transition-all duration-300
                "
              >
                Download CV
              </button>

              {/* SOCIAL MEDIA */}
              <div className="flex items-center gap-2 md:gap-3">
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
                  {
                    href: "https://wa.me/6281287809468",
                    icon: Phone,
                  },
                ].map(({ href, icon: Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-10 md:w-11 h-10 md:h-11 flex items-center justify-center
                      rounded-full
                      border border-[#9D80C8]/40
                      text-[#9D80C8]
                      hover:bg-[#9D80C8]/15
                      hover:border-[#9D80C8]/60
                      transition
                    "
                  >
                    <Icon size={18} className="text-[#9D80C8]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0">
            <div
              className="
                relative
                w-[280px] md:w-[340px] lg:w-[380px]
                h-[360px] md:h-[440px] lg:h-[480px]
                rounded-[30px] md:rounded-[40px]
                overflow-hidden
                border-2 border-[#9D80C8]/40
                shadow-lg md:shadow-[0_20px_100px_rgba(157,128,200,0.35)]
 md:shadow-[0_20px_100px_rgba(157,128,200,0.35)]
                transform
                md:rotate-[6deg]
md:skew-y-[1deg]

                transition-transform duration-500
                hover:rotate-[2deg]
                hover:skew-y-0
              "
            >
              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent z-10" />

              <Image
                src="/idampurple.jpg"
                alt="Idam Palada"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* BOTTOM INFO */}
        <div className="mt-6 md:mt-2 max-w-[1100px] mx-auto pb-4 md:pb-0">
          {/* INTRO TEXT */}
          <p className="mt-8 md:mt-12 mb-8 md:mb-10 text-center lg:text-left lg:ml-0 text-gray-300 text-sm md:text-base px-4 md:px-0">
            I help businesses or individuals build reliable web solutions. Here
            are some of our recent projects.
          </p>

          {/* STATS */}
          <div className="flex items-center justify-center lg:justify-between flex-wrap gap-8 md:gap-12 px-4 md:px-0">
            {/* EXPERIENCE */}
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-4xl md:text-5xl font-bold text-white">
                2+
              </span>
              <div className="leading-tight">
                <p className="text-xs md:text-sm text-gray-400">Years of</p>
                <p className="text-xs md:text-sm text-gray-400">Experience</p>
              </div>
            </div>

            {/* CLIENTS */}
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-4xl md:text-5xl font-bold text-white">
                99%
              </span>
              <div className="leading-tight">
                <p className="text-xs md:text-sm text-gray-400">
                  Client Satisfaction
                </p>
                <p className="text-xs md:text-sm text-gray-400">Rate</p>
              </div>
            </div>

            {/* PROJECT */}
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-4xl md:text-5xl font-bold text-white">
                5+
              </span>
              <div className="leading-tight">
                <p className="text-xs md:text-sm text-gray-400">Project</p>
                <p className="text-xs md:text-sm text-gray-400">Complete</p>
              </div>
            </div>
          </div>

          {/* HAPPY CLIENTS */}
          <div className="mt-6 md:mt-8 text-center lg:text-left px-4 md:px-0">
            <p className="mt-4 md:mt-6 lg:ml-0 text-xs md:text-sm text-gray-400">
              <span className="text-gray-300 font-medium">
                Our happy clients:
              </span>{" "}
              Sneakersflash, COA, KJM, PUPR, dll
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
