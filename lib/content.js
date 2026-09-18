// Static site copy and curated astronomy content. Lives in the bundle so the
// site always has something meaningful to show even when the API is asleep.

export const SITE = {
  name: "Deep Sky Society",
  tagline: "Exploring space. Empowering minds. We are the next generation of cosmic thinkers.",
  mission:
    "Deep Sky Society inspires curiosity and exploration of the universe by bringing people together for stargazing, workshops, and educational programs that make astronomy accessible and engaging for all.",
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
  "Hello, I’m Carlos — and I was starstruck. Literally.",
  "It all started when I met Buzz Aldrin in 2019, at the 50th anniversary of the Moon landing. I was 11, wide-eyed and overwhelmed. But it wasn't just about shaking hands with a hero of space history — it was about realizing how much more was out there, waiting to be explored.",
  "Even before that, I had already begun falling in love with the universe. I spent countless hours devouring books by Stephen Hawking — A Brief History of Time, The Universe in a Nutshell, The Grand Design. Hawking didn’t just explain space; he made it feel personal.",
  "Since then, I’ve been on a mission — not to the Moon (yet), but to understand the cosmos. But I didn’t want to explore the universe alone. That’s why I created Deep Sky Society.",
  "Over the summer 2024, I attended an advanced astronomy course at Stanford University, where I studied stellar evolution, planetary formation, and the large-scale structure of the universe, guided by top faculty and surrounded by brilliant peers from across the globe.",
  "Later that year, I was selected for the Inspirit AI Scholars program, taught by Stanford and MIT researchers. My capstone project focused on using machine learning to detect exoplanets — training an AI to recognize how a planet dims a star’s light as it passes in front of it. That experience opened my eyes to how artificial intelligence is transforming the frontiers of space science.",
  "In the summer 2025, I continued that journey by working under the mentorship of Professor Romain Teyssier, a leading expert in computational astrophysics at Princeton University. The main objective was to develop a clean and reusable Python-based workflow for analyzing galaxy simulation data produced by his famous RAMSES code.",
];

export const ABOUT_DSS = {
  intro: [
    "We believe the next generation of scientists, engineers, and innovators is already here — they just need the spark.",
    "At Deep Sky Society, we create that spark through hands-on learning, collaboration, and exposure to real-world science. Our community includes both complete beginners and experienced student researchers, all united by curiosity and the thrill of discovery.",
  ],
  listTitle: "Here’s what we do:",
  list: [
    "🔭 Host telescope nights and skywatching events",
    "🌌 Explore deep space topics like black holes, exoplanets, and cosmology",
    "🤖 Run AI-based astrophysics workshops, including projects using NASA data to detect exoplanets via machine learning — like the one I developed through Inspirit AI",
    "🪐 Invite scientists, researchers, and space entrepreneurs to speak and mentor",
    "🌍 Build partnerships and friendships across schools, countries, and backgrounds",
  ],
  outro: [
    "Deep Sky Society is about more than learning — it's about participating. We’re not waiting to be inspired.",
    "Whether you're dreaming of Mars, simulating wormholes, coding AI models, or just learning what a nebula is — you belong at Deep Sky Society.",
  ],
};

export const VALUES = {
  intro: [
    "At Deep Sky Society, we believe science is for everyone — and that the future of exploration must reflect the diversity, imagination, and drive of the next generation.",
    "These are the values that guide everything we do:",
  ],
  items: [
    ["🌐 Open Access to Knowledge", "We break down barriers to science. Every student deserves access to advanced learning — whether they're analyzing light curves, writing code, or just beginning to ask big questions."],
    ["🤝 Support Innovation and Collaboration", "We celebrate experimentation and bold ideas. From AI labs to group stargazing, we create hands-on spaces where students build, code, explore, and discover together."],
    ["🌍 Promote Diversity, Equity & Inclusion", "Deep Sky Society welcomes students of all identities, backgrounds, and perspectives. Because the universe is vast — and so are the viewpoints we need to understand it."],
    ["💡 Give Back Through Meaningful Work", "We believe knowledge should serve a greater good. Whether by mentoring others, sharing resources, or working on public science projects, we aim to make an impact beyond ourselves."],
    ["🚀 Lead with Curiosity and Courage", "Leadership starts by asking questions — especially the difficult ones. We empower students to take initiative, challenge ideas, and lead with purpose, not perfection."],
  ],
};

export const WHAT_WE_DO = [
  { icon: "telescope", title: "Telescope nights", text: "Regular skywatching sessions — Moon, planets, nebulae and galaxies through real optics." },
  { icon: "orbit", title: "Deep-space topics", text: "Black holes, exoplanets, cosmology — explained from first principles, no prerequisites." },
  { icon: "cpu", title: "AI astrophysics", text: "Workshops using real NASA data to detect exoplanets with machine learning." },
  { icon: "mic", title: "Talks & mentors", text: "Scientists, researchers and space entrepreneurs speak with and mentor members." },
  { icon: "globe", title: "Global community", text: "Partnerships and friendships across schools, countries and backgrounds." },
  { icon: "camera", title: "Astrophotography", text: "Learn to capture the night sky and get featured in our gallery." },
];

export const TIMELINE = [
  { year: "2023", title: "Club Founded", text: "A passionate group of students came together to build something impactful." },
  { year: "2023", title: "CodeSprint Debut", text: "Our first event with over 100 participants from different departments." },
  { year: "2024", title: "Community Growth", text: "30+ new members joined us to build projects, share ideas, and grow together." },
  { year: "2024", title: "Cross-Campus Reach", text: "We opened our doors to other universities to collaborate and innovate." },
];

export const JOIN_WHO = "Deep Sky Society welcomes all space enthusiasts! Ideal for ages 13+, especially those curious about astronomy, physics, or technology.";

export const JOIN_BENEFITS = [
  "Access to telescope sessions",
  "Join real space projects",
  "Learn from experts",
  "Get featured in our blog",
  "Participate in astrophotography, movie nights, and webinars!",
  "Stay updated with our latest events and activities",
  "Explore astronomy insights in our blog section",
];

export const STATS = [
  { value: "1200+", label: "Members" },
  { value: "50+", label: "Events" },
  { value: "30+", label: "Projects" },
  { value: "40+", label: "Blogs" },
];

export const LEARN_TRACKS = [
  {
    slug: "basics",
    emoji: "🌌",
    title: "Astronomy Basics",
    level: "beginner",
    summary: "Learn what stars, planets, galaxies, and constellations are — the building blocks of the universe.",
    body: [
      "Astronomy is the study of everything beyond Earth’s atmosphere. From how stars are born, to why galaxies form, to how black holes bend space-time — it’s the science of the cosmos.",
      "Start by learning the sky itself. Find the Big Dipper, follow its handle to Arcturus, its bowl to Polaris. Once you can navigate, every other object becomes reachable.",
      "Distances are the hardest idea. Light from the Sun takes 8 minutes to reach you; from the nearest star, 4 years; from Andromeda, 2.5 million years. When you look up, you look back in time.",
    ],
  },
  {
    slug: "tools",
    emoji: "📱",
    title: "Apps & Tools",
    level: "beginner",
    summary: "Boost your stargazing with modern apps and tools that guide you through the night sky.",
    links: [
      { label: "Stellarium", href: "https://stellarium.org/", text: "A free planetarium software that shows a realistic night sky." },
      { label: "Stellarium Web", href: "https://stellarium-web.org/", text: "Same engine, runs in the browser — no install." },
      { label: "Sky & Telescope Chart", href: "https://skyandtelescope.org/interactive-sky-chart/", text: "Explore constellations interactively." },
      { label: "Heavens-Above", href: "https://www.heavens-above.com/", text: "ISS passes and satellite predictions for your location." },
      { label: "NASA Exoplanet Archive", href: "https://exoplanetarchive.ipac.caltech.edu/", text: "The data behind our machine-learning workshops." },
    ],
  },
  {
    slug: "books",
    emoji: "📚",
    title: "Books & Videos",
    level: "beginner",
    summary: "Recommended resources for self-learning astronomy at your own pace.",
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
  { q: "Which constellation looks like a hunter with a belt of 3 stars?", options: ["Ursa Major", "Orion", "Cassiopeia", "Leo"], a: 1 },
  { q: "What galaxy is Earth located in?", options: ["Andromeda", "Whirlpool", "Milky Way", "Cartwheel"], a: 2 },
  { q: "How long does sunlight take to reach Earth?", options: ["8 seconds", "8 minutes", "8 hours", "8 days"], a: 1 },
  { q: "What is the closest star to Earth after the Sun?", options: ["Sirius", "Betelgeuse", "Proxima Centauri", "Vega"], a: 2 },
  { q: "Which of these is a method used to detect exoplanets?", options: ["Transit photometry", "Carbon dating", "Seismic imaging", "Spectral welding"], a: 0 },
  { q: "The Perseid meteor shower peaks in which month?", options: ["March", "August", "November", "December"], a: 1 },
];

export const FUN_FACTS = [
  "✨ Neutron stars can spin 600 times per second!",
  "☀️ The Sun makes up 99.8% of our solar system’s mass.",
  "🌍 A day on Venus is longer than its year.",
  "🌌 There are more stars in the universe than grains of sand on Earth.",
  "Light from the Andromeda galaxy left it 2.5 million years ago.",
  "Jupiter's Great Red Spot is a storm larger than Earth that has raged for centuries.",
  "The footprints on the Moon will last for millions of years — there's no wind to erase them.",
];
