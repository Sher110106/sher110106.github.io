"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollPanel(totalPanels: number) {
  const [activePanel, setActivePanel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const panelWidth = container.clientWidth;
      const panel = Math.round(scrollLeft / panelWidth);
      setActivePanel(Math.min(panel, totalPanels - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalPanels, isMobile]);

  const scrollTo = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      if (isMobile) {
        document.getElementById(`panel-${index}`)?.scrollIntoView({ behavior: "smooth" });
      } else {
        container.scrollTo({
          left: index * container.clientWidth,
          behavior: "smooth",
        });
      }
    },
    [isMobile]
  );

  return { activePanel, containerRef, scrollTo, isMobile };
}
