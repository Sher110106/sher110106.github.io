"use client";

import { HeroPanel } from "@/components/panels/HeroPanel";
import { ObserverPanel } from "@/components/panels/ObserverPanel";
import { BuilderPanel } from "@/components/panels/BuilderPanel";
import { ResearcherPanel } from "@/components/panels/ResearcherPanel";
import { FuturePanel } from "@/components/panels/FuturePanel";
import { PixelProgress } from "@/components/ui/PixelProgress";
import { useScrollPanel } from "@/hooks/useScrollPanel";

const chapterLabels = ["hero", "observer", "builder", "researcher", "future"];

export default function Home() {
  const { activePanel, containerRef, scrollTo, isDesktop } = useScrollPanel(5);

  const panels = [
    <HeroPanel key="hero" />,
    <ObserverPanel key="observer" active={activePanel === 1} />,
    <BuilderPanel key="builder" active={activePanel === 2} />,
    <ResearcherPanel key="researcher" active={activePanel === 3} />,
    <FuturePanel key="future" active={activePanel === 4} />,
  ];

  return (
    <main id="main-content">
      {isDesktop ? (
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory h-dvh scroll-smooth"
          style={{ willChange: "scroll-position", transform: "translateZ(0)" }}
        >
          {panels.map((panel, i) => (
            <div key={i} id={`panel-${i}`} className="snap-start min-w-[100vw] h-dvh overflow-hidden">
              {panel}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {panels.map((panel, i) => (
            <div key={i} id={`panel-${i}`}>
              {panel}
            </div>
          ))}
        </div>
      )}

      <PixelProgress
        total={5}
        active={activePanel}
        labels={chapterLabels}
        onSelect={scrollTo}
      />
    </main>
  );
}
