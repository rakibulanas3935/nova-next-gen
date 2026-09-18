// Static site copy and curated astronomy content. Lives in the bundle so the
// site always has something meaningful to show even when the API is asleep.

export const SITE = {
  name: "Deep Sky Society",
  tagline: "A student-led astronomy club exploring the cosmos together.",
  description:
    "Deep Sky Society is a vibrant astronomy club bringing together space enthusiasts, stargazers and curious minds to explore the universe through telescope nights, workshops, AI-astrophysics projects and talks.",
  email: "deepskysociety@gmail.com",
  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
};

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/learn", label: "Learn" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sky-tonight", label: "Sky Tonight" },
];

export const FOUNDER_STORY = [
  "Hello, I'm Carlos — and I was starstruck. Literally.",
  "It all started when I met Buzz Aldrin in 2019, at the 50th anniversary of the Moon landing. I was 11, wide-eyed and overwhelmed. It wasn't just about shaking hands with a hero of space history — it was realising how much more was out there, waiting to be explored.",
  "Even before that, I had already begun falling in love with the universe. I spent countless hours devouring books by Stephen Hawking — A Brief History of Time, The Universe in a Nutshell, The Grand Design. Hawking didn't just explain space; he made it feel personal.",
  "Since then I've been on a mission — not to the Moon (yet), but to understand the cosmos. I didn't want to explore the universe alone. That's why I created Deep Sky Society.",
  "In summer 2024 I attended an advanced astronomy course at Stanford University, studying stellar evolution, planetary formation and the large-scale structure of the universe. Later that year I was selected for the Inspirit AI Scholars program, where my capstone used machine learning to detect exoplanets from the way a planet dims its star's light.",
  "In summer 2025 I worked under the mentorship of Professor Romain Teyssier at Princeton, building a clean, reusable Python workflow for analysing galaxy simulation data from his RAMSES code.",
];

export const WHAT_WE_DO = [
  { icon: "telescope", title: "Telescope nights", text: "Regular skywatching sessions — Moon, planets, nebulae and galaxies through real optics." },
  { icon: "orbit", title: "Deep-space topics", text: "Black holes, exoplanets, cosmology — explained from first principles, no prerequisites." },
  { icon: "cpu", title: "AI astrophysics", text: "Workshops using real NASA data to detect exoplanets with machine learning." },
  { icon: "mic", title: "Talks & mentors", text: "Scientists, researchers and space entrepreneurs speak with and mentor members." },
  { icon: "globe", title: "Global community", text: "Partnerships and friendships across schools, countries and backgrounds." },
  { icon: "camera", title: "Astrophotography", text: "Learn to capture the night sky and get featured in our gallery." },
];

export const TIMELINE = [
  { year: "2019", title: "The spark", text: "Carlos meets Buzz Aldrin at the Apollo 11 50th anniversary." },
  { year: "2023", title: "Club founded", text: "A small group of students starts meeting to watch the sky and talk science." },
  { year: "2024", title: "Community growth", text: "30+ new members join; first AI-astrophysics workshop using NASA data." },
  { year: "2024", title: "Cross-campus reach", text: "We open our doors to other schools and universities." },
  { year: "2025", title: "Research mentorship", text: "Members begin contributing to real computational astrophysics workflows." },
];

export const JOIN_BENEFITS = [
  "Access to telescope sessions and observing nights",
  "Join real space and data-science projects",
  "Learn from researchers and guest speakers",
  "Get your writing and photos featured on the site",
  "Astrophotography, movie nights and webinars",
  "Members-only event links and resources",
];

export const STATS = [
  { value: "30+", label: "Active members" },
  { value: "12+", label: "Events a year" },
  { value: "5", label: "Countries" },
  { value: "∞", label: "Curiosity" },
];

export const LEARN_TRACKS = [
  {
    slug: "basics",
    emoji: "🌌",
    title: "Astronomy basics",
    level: "beginner",
    summary: "Stars, planets, galaxies and constellations — the building blocks of the universe.",
    body: [
      "Astronomy is the study of everything beyond Earth's atmosphere: how stars are born and die, why galaxies form, how black holes bend space-time.",
      "Start by learning the sky itself. Find the Big Dipper, follow its handle to Arcturus, its bowl to Polaris. Once you can navigate, every other object becomes reachable.",
      "Distances are the hardest idea. Light from the Sun takes 8 minutes to reach you; from the nearest star, 4 years; from Andromeda, 2.5 million years. When you look up, you look back in time.",
    ],
  },
  {
    slug: "tools",
    emoji: "📱",
    title: "Apps & tools",
    level: "beginner",
    summary: "Free software that turns your phone or laptop into a planetarium.",
    links: [
      { label: "Stellarium", href: "https://stellarium.org/", text: "Free desktop planetarium with a realistic sky for any time and place." },
      { label: "Stellarium Web", href: "https://stellarium-web.org/", text: "Same engine, runs in the browser — no install." },
      { label: "Sky & Telescope Interactive Sky Chart", href: "https://skyandtelescope.org/interactive-sky-chart/", text: "Print a chart for tonight." },
      { label: "Heavens-Above", href: "https://www.heavens-above.com/", text: "ISS passes and satellite predictions for your location." },
      { label: "NASA Exoplanet Archive", href: "https://exoplanetarchive.ipac.caltech.edu/", text: "The data behind our machine-learning workshops." },
    ],
  },
  {
    slug: "books",
    emoji: "📚",
    title: "Books & videos",
    level: "beginner",
    summary: "Self-paced resources our members recommend.",
    links: [
      { label: "A Brief History of Time — Stephen Hawking", href: "https://www.goodreads.com/book/show/3869.A_Brief_History_of_Time", text: "The book that started it for many of us." },
      { label: "Turn Left at Orion", href: "https://www.goodreads.com/book/show/10981.Turn_Left_at_Orion", text: "The best guide to what a small telescope can actually show." },
      { label: "Astronomy for Dummies", href: "https://www.goodreads.com/book/show/25700616-astronomy-for-dummies", text: "Gentle, practical start." },
      { label: "PBS Space Time", href: "https://www.youtube.com/@pbsspacetime", text: "Serious physics, beautifully explained." },
      { label: "Dr. Becky", href: "https://www.youtube.com/@DrBecky", text: "An astrophysicist on the latest research, weekly." },
    ],
  },
  {
    slug: "telescopes",
    emoji: "🔭",
    title: "Choosing a telescope",
    level: "intermediate",
    summary: "Aperture, mounts and why binoculars might be your best first buy.",
    body: [
      "Aperture (the diameter of the main lens or mirror) matters more than magnification. More aperture = more light = fainter objects.",
      "A 6–8 inch Dobsonian reflector is the classic first scope: huge aperture per dollar, simple to use. Avoid anything advertising '500x magnification'.",
      "Good 10x50 binoculars show the Moon's craters, Jupiter's moons, the Pleiades and the Andromeda galaxy — and you'll use them for life.",
    ],
  },
  {
    slug: "astrophotography",
    emoji: "📷",
    title: "Astrophotography 101",
    level: "intermediate",
    summary: "From phone-on-a-tripod to stacked deep-sky images.",
    body: [
      "Start with your phone: night mode, a tripod, 10–30 second exposures. The Milky Way is reachable from a dark site.",
      "The two enemies are light pollution and tracking. A star tracker lets a DSLR expose for minutes without star trails.",
      "Stack many short exposures with free tools like Siril or DeepSkyStacker — noise averages out, signal adds up.",
    ],
  },
  {
    slug: "ai",
    emoji: "🤖",
    title: "AI in astrophysics",
    level: "advanced",
    summary: "How machine learning finds exoplanets — the project we run in workshops.",
    body: [
      "When a planet crosses its star, the star dims by a fraction of a percent. Kepler and TESS recorded millions of these light curves.",
      "A classifier trained on labelled transits learns to separate real planets from stellar noise and eclipsing binaries.",
      "Our workshop walks through loading NASA light curves, engineering features and training a model in Python. No prior ML experience needed.",
    ],
  },
];

export const GLOSSARY = [
  ["Aperture", "Diameter of a telescope's main lens or mirror; determines how much light it gathers."],
  ["Astronomical unit (AU)", "Average Earth–Sun distance, about 150 million km."],
  ["Deep-sky object", "Anything beyond the solar system that isn't a single star: nebulae, clusters, galaxies."],
  ["Exoplanet", "A planet orbiting a star other than the Sun. Over 5,000 confirmed."],
  ["Light-year", "Distance light travels in one year: about 9.46 trillion km."],
  ["Magnitude", "Brightness scale where smaller is brighter. The Sun is −27, Sirius −1.5, the faintest naked-eye stars about +6."],
  ["Messier object", "One of 110 bright deep-sky objects catalogued by Charles Messier (M1–M110)."],
  ["Nebula", "A cloud of gas and dust; stellar nurseries (emission) or the remains of dead stars (planetary, supernova remnants)."],
  ["Redshift", "Stretching of light to longer wavelengths as the universe expands; a proxy for distance."],
  ["Transit", "When a planet passes in front of its star as seen from Earth, dimming it slightly."],
  ["Zenith", "The point directly overhead."],
  ["ZHR", "Zenithal Hourly Rate: meteors per hour a shower would produce under ideal skies."],
];

export const QUIZ = [
  { q: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], a: 1 },
  { q: "What galaxy is Earth located in?", options: ["Andromeda", "Whirlpool", "Milky Way", "Cartwheel"], a: 2 },
  { q: "How long does sunlight take to reach Earth?", options: ["8 seconds", "8 minutes", "8 hours", "8 days"], a: 1 },
  { q: "What is the closest star to Earth after the Sun?", options: ["Sirius", "Betelgeuse", "Proxima Centauri", "Vega"], a: 2 },
  { q: "Which of these is a method used to detect exoplanets?", options: ["Transit photometry", "Carbon dating", "Seismic imaging", "Spectral welding"], a: 0 },
  { q: "The Perseid meteor shower peaks in which month?", options: ["March", "August", "November", "December"], a: 1 },
];

export const FUN_FACTS = [
  "Neutron stars can spin over 600 times per second.",
  "The Sun contains 99.8% of the mass of the solar system.",
  "A day on Venus is longer than its year.",
  "There are more stars in the universe than grains of sand on Earth's beaches.",
  "Light from the Andromeda galaxy left it 2.5 million years ago.",
  "Jupiter's Great Red Spot is a storm larger than Earth that has raged for centuries.",
  "The footprints on the Moon will last for millions of years — there's no wind to erase them.",
];
