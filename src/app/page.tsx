"use client";

import { HeroPanel } from "@/components/panels/HeroPanel";
import { ObserverPanel } from "@/components/panels/ObserverPanel";
import { BuilderPanel } from "@/components/panels/BuilderPanel";
import { ResearcherPanel } from "@/components/panels/ResearcherPanel";
import { LeaderPanel } from "@/components/panels/LeaderPanel";
import { FuturePanel } from "@/components/panels/FuturePanel";
import { PixelProgress } from "@/components/ui/PixelProgress";
import { useScrollPanel } from "@/hooks/useScrollPanel";

const chapterLabels = ["hero", "observer", "builder", "researcher", "leader", "future"];

export default function Home() {
  const { activePanel, containerRef, scrollTo, isDesktop } = useScrollPanel(6);

  const panels = [
    <HeroPanel key="hero" />,
    <ObserverPanel key="observer" active={activePanel === 1} />,
    <BuilderPanel key="builder" active={activePanel === 2} />,
    <ResearcherPanel key="researcher" active={activePanel === 3} />,
    <LeaderPanel key="leader" active={activePanel === 4} />,
    <FuturePanel key="future" active={activePanel === 5} />,
  ];

  return (
    <main>
      {isDesktop ? (
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory h-screen scroll-smooth"
          style={{ willChange: "scroll-position", transform: "translateZ(0)" }}
        >
          {panels.map((panel, i) => (
            <div key={i} id={`panel-${i}`} className="snap-start min-w-[100vw] h-screen overflow-hidden">
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
        total={6}
        active={activePanel}
        labels={chapterLabels}
        onSelect={scrollTo}
      />
    </main>
  );
}
