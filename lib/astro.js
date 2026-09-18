// Small, dependency-free astronomy helpers for the "Sky Tonight" features.
// Accuracy is fine for a club website (moon phase ±1 day, shower dates ±1 day).

const SYNODIC_MONTH = 29.530588853;
// Reference new moon: 2000-01-06 18:14 UTC
const REF_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

export function moonPhase(date = new Date()) {
  const days = (date.getTime() - REF_NEW_MOON) / 86400000;
  const age = ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const fraction = age / SYNODIC_MONTH; // 0 = new, 0.5 = full
  const illumination = Math.round((1 - Math.cos(fraction * 2 * Math.PI)) / 2 * 100);

  const phases = [
    ["New Moon", "🌑"], ["Waxing Crescent", "🌒"], ["First Quarter", "🌓"], ["Waxing Gibbous", "🌔"],
    ["Full Moon", "🌕"], ["Waning Gibbous", "🌖"], ["Last Quarter", "🌗"], ["Waning Crescent", "🌘"],
  ];
  const idx = Math.round(fraction * 8) % 8;
  const [name, emoji] = phases[idx];

  const daysToFull = ((0.5 - fraction + 1) % 1) * SYNODIC_MONTH;
  const daysToNew = ((1 - fraction) % 1) * SYNODIC_MONTH;

  return {
    name,
    emoji,
    age: Math.round(age * 10) / 10,
    illumination,
    fraction,
    nextFull: new Date(date.getTime() + daysToFull * 86400000),
    nextNew: new Date(date.getTime() + daysToNew * 86400000),
    // Dark skies (good for deep-sky observing) when the moon is mostly dark
    darkSky: illumination < 30,
  };
}

// Annual meteor showers: peak month/day (approximate, stable year to year).
export const METEOR_SHOWERS = [
  { name: "Quadrantids", month: 1, day: 3, zhr: 120, parent: "Asteroid 2003 EH1", note: "Short, sharp peak of a few hours." },
  { name: "Lyrids", month: 4, day: 22, zhr: 18, parent: "Comet Thatcher", note: "Occasional bright fireballs." },
  { name: "Eta Aquariids", month: 5, day: 6, zhr: 50, parent: "Halley's Comet", note: "Best from the southern hemisphere, pre-dawn." },
  { name: "Delta Aquariids", month: 7, day: 30, zhr: 25, parent: "Comet 96P/Machholz", note: "Faint, steady meteors for weeks." },
  { name: "Perseids", month: 8, day: 12, zhr: 100, parent: "Comet Swift–Tuttle", note: "The summer favourite — warm nights, fast bright meteors." },
  { name: "Draconids", month: 10, day: 8, zhr: 10, parent: "Comet 21P/Giacobini–Zinner", note: "Best in the evening rather than after midnight." },
  { name: "Orionids", month: 10, day: 21, zhr: 20, parent: "Halley's Comet", note: "Fast meteors, some leaving persistent trains." },
  { name: "Leonids", month: 11, day: 17, zhr: 15, parent: "Comet Tempel–Tuttle", note: "Famous for storms every ~33 years." },
  { name: "Geminids", month: 12, day: 14, zhr: 150, parent: "Asteroid 3200 Phaethon", note: "The strongest shower of the year. Slow, bright, colourful." },
  { name: "Ursids", month: 12, day: 22, zhr: 10, parent: "Comet 8P/Tuttle", note: "A quiet shower near the winter solstice." },
];

export function upcomingShowers(date = new Date(), count = 3) {
  const year = date.getFullYear();
  const list = [];
  for (const y of [year, year + 1]) {
    for (const s of METEOR_SHOWERS) {
      const peak = new Date(y, s.month - 1, s.day);
      if (peak >= new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)) {
        list.push({ ...s, peak });
      }
    }
  }
  return list.sort((a, b) => a.peak - b.peak).slice(0, count);
}

// What's well placed in the evening sky, by northern-hemisphere season.
export const SEASONAL_SKY = {
  winter: {
    months: [12, 1, 2],
    constellations: ["Orion", "Taurus", "Gemini", "Canis Major", "Auriga"],
    highlights: ["Orion Nebula (M42)", "Pleiades (M45)", "Sirius, the brightest star", "Betelgeuse & Rigel"],
    tip: "Cold, dry air gives the steadiest, clearest skies of the year. Dress warmer than you think.",
  },
  spring: {
    months: [3, 4, 5],
    constellations: ["Leo", "Virgo", "Boötes", "Ursa Major", "Cancer"],
    highlights: ["Beehive Cluster (M44)", "Leo Triplet galaxies", "Virgo galaxy cluster", "Arcturus"],
    tip: "Galaxy season — the Milky Way is out of the way, so distant galaxies are easy to reach.",
  },
  summer: {
    months: [6, 7, 8],
    constellations: ["Cygnus", "Lyra", "Aquila", "Scorpius", "Sagittarius"],
    highlights: ["Milky Way core", "Ring Nebula (M57)", "Lagoon Nebula (M8)", "Summer Triangle"],
    tip: "The galactic centre rises in the south — find a dark site and let your eyes adapt for 20 minutes.",
  },
  autumn: {
    months: [9, 10, 11],
    constellations: ["Pegasus", "Andromeda", "Cassiopeia", "Perseus", "Pisces"],
    highlights: ["Andromeda Galaxy (M31)", "Double Cluster", "Great Square of Pegasus", "Fomalhaut"],
    tip: "Andromeda is naked-eye visible from a dark site — the farthest thing you can see unaided.",
  },
};

export function currentSeason(date = new Date()) {
  const m = date.getMonth() + 1;
  const key = Object.keys(SEASONAL_SKY).find((k) => SEASONAL_SKY[k].months.includes(m)) || "winter";
  return { key, ...SEASONAL_SKY[key] };
}
