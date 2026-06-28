"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useScrollPanel(totalPanels: number) {
  const [activePanel, setActivePanel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: horizontal scroll tracking (rAF debounced)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isDesktop) return;

    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const panel = Math.round(container.scrollLeft / container.clientWidth);
        setActivePanel(panel);
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [totalPanels, isDesktop]);

  // Mobile: rAF-debounced IntersectionObserver
  useEffect(() => {
    if (isDesktop) return;

    let raf = 0;
    const activeRef = { current: 0 };

    const observers: IntersectionObserver[] = [];
    for (let i = 0; i < totalPanels; i++) {
      const el = document.getElementById(`panel-${i}`);
      if (!el) continue;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              activeRef.current = i;
              cancelAnimationFrame(raf);
              raf = requestAnimationFrame(() => setActivePanel(activeRef.current));
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => {
      observers.forEach((o) => o.disconnect());
      cancelAnimationFrame(raf);
    };
  }, [isDesktop, totalPanels]);

  const scrollTo = useCallback(
    (index: number) => {
      if (isDesktop) {
        containerRef.current?.scrollTo({
          left: index * (containerRef.current?.clientWidth ?? window.innerWidth),
          behavior: "smooth",
        });
      } else {
        document.getElementById(`panel-${index}`)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [isDesktop]
  );

  return { activePanel, containerRef, scrollTo, isDesktop };
}
