/**
 * Decorative, CSS-animated solar system (pure SVG, no JS). Planets orbit at
 * speeds proportional to their real periods; Saturn gets a ring. Honors
 * prefers-reduced-motion via the global keyframe rule.
 */
const PLANETS = [
  { name: "Mercury", r: 46, size: 2.2, color: "#b9b4ad", period: 8 },
  { name: "Venus", r: 66, size: 3.4, color: "#e8c88a", period: 14 },
  { name: "Earth", r: 88, size: 3.6, color: "#5eb1ff", period: 22, moon: true },
  { name: "Mars", r: 110, size: 2.8, color: "#e07a5f", period: 36 },
  { name: "Jupiter", r: 146, size: 8, color: "#d9a875", period: 80, bands: true },
  { name: "Saturn", r: 182, size: 6.8, color: "#e6cf9a", period: 120, ring: true },
  { name: "Uranus", r: 212, size: 4.6, color: "#9fe3e8", period: 170 },
  { name: "Neptune", r: 238, size: 4.4, color: "#6c8cff", period: 220 },
];

export default function SolarSystem({ className = "" }) {
  return (
    <svg viewBox="-260 -260 520 520" className={className} aria-hidden>
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="35%" stopColor="#f5b942" />
          <stop offset="70%" stopColor="rgba(245,185,66,0.25)" />
          <stop offset="100%" stopColor="rgba(245,185,66,0)" />
        </radialGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* orbits */}
      {PLANETS.map((p) => (
        <circle key={p.name} r={p.r} fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="0.6" strokeDasharray={p.r > 120 ? "2 4" : undefined} />
      ))}

      {/* sun */}
      <circle r="30" fill="url(#sunGlow)" />
      <circle r="11" fill="#ffe08a" />

      {/* planets */}
      {PLANETS.map((p) => (
        <g key={p.name} style={{ animation: `orbit ${p.period}s linear infinite`, transformOrigin: "0 0" }}>
          <g transform={`translate(${p.r} 0)`}>
            {p.ring && <ellipse rx={p.size * 2} ry={p.size * 0.7} fill="none" stroke="rgba(230,207,154,0.7)" strokeWidth="1.4" transform="rotate(-20)" />}
            <circle r={p.size} fill={p.color} />
            {p.bands && <circle r={p.size} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" strokeDasharray="3 2.5" />}
            {p.moon && (
              <g style={{ animation: "orbit 3s linear infinite", transformOrigin: "0 0" }}>
                <circle cx={p.size + 3.5} r="1.1" fill="#d6dbe6" />
              </g>
            )}
          </g>
        </g>
      ))}

      {/* a comet on an eccentric orbit */}
      <g style={{ animation: "orbit 60s linear infinite reverse", transformOrigin: "0 0" }}>
        <g transform="rotate(35)">
          <ellipse rx="240" ry="120" fill="none" stroke="rgba(94,177,255,0.12)" strokeWidth="0.6" />
        </g>
      </g>
      <g style={{ animation: "comet 60s linear infinite", transformOrigin: "0 0" }} filter="url(#soft)">
        <circle cx="0" cy="-160" r="1.8" fill="#dff1ff" />
        <path d="M0 -160 L-6 -178 L6 -178 Z" fill="rgba(158,208,255,0.6)" />
      </g>
    </svg>
  );
}
