"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // scrollerProxy wajib dipasang PERTAMA sebelum ScrollTrigger apapun
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value as number, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // PERBAIKAN: "fixed" untuk HP (lebih ringan), "transform" untuk Desktop (lebih smooth)
      pinType: window.innerWidth < 768 ? "fixed" : "transform",
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    const onResize = () => ScrollTrigger.refresh(true);
    window.addEventListener("resize", onResize);

    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    (window as any).__lenisReady = true;
    window.dispatchEvent(new Event("lenis-ready"));

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tickerFn);
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as any);
      ScrollTrigger.killAll();
      lenis.destroy();
      (window as any).__lenisReady = false;
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
