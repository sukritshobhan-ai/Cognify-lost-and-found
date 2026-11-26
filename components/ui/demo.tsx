"use client";

import Hero from "@/components/ui/animated-shader-hero";
import { AquariumPrompt } from "@/components/ui/aquarium-prompt";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { LiveOrb } from "@/components/ui/live-orb";
import { Skiper31 } from "@/components/ui/text-scroll-animation";

export default function DemoOne() {
  return (
    <div className="w-full space-y-12">
      <Hero
        headerAccessory={
          <div className="mb-4 flex flex-col items-center gap-2">
            <LiveOrb size={108} variant="webgl" colors={["#33B8C8", "#9CE5EC", "#F8C12C"]} eyeColor="#0b4757" />
            <span className="text-xl font-bold tracking-tight text-white">Cognify</span>
            <span className="text-xs text-[#FAF9F7]/80">AI-Powered Campus Lost &amp; Found Intelligence</span>
          </div>
        }
        trustBadge={{
          text: "Campus Item Recovery Network",
          icons: ["✦"],
        }}
        headline={{
          line1: "Find What Matters",
          line2: "Across Every Zone",
        }}
        subtitle="Smart campus lost and found powered by visual AI matching, privacy-shielded verification, and instant handover PINs."
        buttons={{
          primary: { text: "Open Aquarium Search", onClick: () => {} },
          secondary: { text: "Browse Live Radar", onClick: () => {} },
        }}
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4">
        <AquariumPrompt />
        <div className="flex items-center gap-4">
          <LiquidMetalButton label="I Lost Something" />
          <LiquidMetalButton label="I Found Something" />
        </div>
      </div>
      <Skiper31 />
    </div>
  );
}
