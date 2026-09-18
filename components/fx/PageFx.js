import clsx from "clsx";
import TwinkleField from "./TwinkleField";
import Constellation from "./Constellation";

/* CSS-only pieces ---------------------------------------------------------- */

function Nebula({ tone = "violet" }) {
  const tones = {
    violet: ["rgba(147,51,234,0.35)", "rgba(59,130,246,0.25)", "rgba(168,85,247,0.18)"],
    gold: ["rgba(168,85,247,0.3)", "rgba(224,122,95,0.2)", "rgba(147,51,234,0.2)"],
    teal: ["rgba(59,130,246,0.3)", "rgba(159,227,232,0.2)", "rgba(147,51,234,0.18)"],
  }[tone];
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <span className="fx-blob absolute -left-[10%] top-[5%] h-[36rem] w-[36rem] rounded-full" style={{ background: tones[0], animationDuration: "26s" }} />
      <span className="fx-blob absolute right-[-8%] top-[15%] h-[30rem] w-[30rem] rounded-full" style={{ background: tones[1], animationDuration: "32s", animationDelay: "-8s" }} />
      <span className="fx-blob absolute left-[35%] top-[45%] h-[24rem] w-[24rem] rounded-full" style={{ background: tones[2], animationDuration: "40s", animationDelay: "-16s" }} />
    </div>
  );
}

function GalaxySpiral() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="fx-galaxy absolute left-1/2 top-[-10rem] h-[60rem] w-[60rem] -translate-x-1/2 rounded-full opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_50%_10%,rgba(216,180,254,0.25),transparent)]" />
    </div>
  );
}

function OrbitRings() {
  const rings = [18, 26, 34, 42];
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute right-[-12rem] top-[-6rem] h-[52rem] w-[52rem] sm:right-[-8rem] lg:right-[-4rem]">
        {rings.map((r, i) => (
          <div
            key={r}
            className="absolute left-1/2 top-1/2 rounded-full border border-line-strong/60"
            style={{
              width: `${r}rem`, height: `${r}rem`, marginLeft: `-${r / 2}rem`, marginTop: `-${r / 2}rem`,
              borderStyle: i % 2 ? "dashed" : "solid",
              animation: `orbit ${40 + i * 25}s linear infinite ${i % 2 ? "reverse" : ""}`,
            }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full" style={{ background: ["#a855f7", "#3b82f6", "#818cf8", "#f472b6"][i], boxShadow: `0 0 12px ${["#a855f7", "#3b82f6", "#818cf8", "#f472b6"][i]}` }} />
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff3c4,rgba(168,85,247,0.4)_55%,transparent_70%)]" />
      </div>
    </div>
  );
}

function Planet() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="fx-planet absolute right-[-6rem] top-[2rem] h-[26rem] w-[26rem] rounded-full sm:right-[-2rem] lg:right-[6%]" />
      <div className="fx-ring absolute right-[-11rem] top-[9rem] h-[12rem] w-[36rem] rounded-[100%] border-[6px] border-star-300/25 sm:right-[-7rem] lg:right-[calc(6%-5rem)]" />
    </div>
  );
}

/* Switch --------------------------------------------------------------------- */

const VARIANTS = {
  twinkle: () => <TwinkleField className="absolute inset-0 h-full w-full" tint="gold" />,
  meteors: () => <TwinkleField className="absolute inset-0 h-full w-full" tint="blue" density={0.8} shooting />,
  constellation: () => <Constellation className="absolute inset-0 h-full w-full opacity-80" />,
  nebula: () => <Nebula tone="violet" />,
  "nebula-gold": () => <Nebula tone="gold" />,
  "nebula-teal": () => <Nebula tone="teal" />,
  galaxy: () => <GalaxySpiral />,
  orbits: () => <OrbitRings />,
  planet: () => <Planet />,
};

/**
 * Decorative astronomy background for a page hero. Different variants keep
 * each page feeling distinct while staying in the same universe.
 */
export default function PageFx({ variant = "twinkle", className }) {
  const Fx = VARIANTS[variant] || VARIANTS.twinkle;
  return (
    <div className={clsx("pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] overflow-hidden", className)} aria-hidden>
      <Fx />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-space-950" />
    </div>
  );
}
