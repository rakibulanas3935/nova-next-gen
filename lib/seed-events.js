// Realistic upcoming events, used when the API has none (and seeded into
// localStorage on first visit). Dates are real astronomical events for the
// 2026–27 season; times are local evening slots. Remove or edit freely.

const at = (y, m, d, h = 20, min = 0) => new Date(y, m - 1, d, h, min).toISOString();

const html = (...ps) => ps.map((p) => `<p>${p}</p>`).join("");

export const SEED_EVENTS = [
  {
    _id: "seed-saturn-opposition-2026",
    slug: "saturn-at-opposition-telescope-night",
    title: "Saturn at Opposition — Telescope Night",
    type: "stargazing",
    eventTime: at(2026, 10, 4, 20, 30),
    endTime: at(2026, 10, 4, 23, 0),
    location: "School observatory rooftop",
    poster: "/video/events.jpg",
    excerpt: "Saturn is closest and brightest for the year. Rings, Titan and maybe the Cassini Division through the 8-inch.",
    description: html(
      "Around opposition Saturn rises at sunset and is up all night, at its biggest and brightest for 2026. We'll have the 8-inch Dobsonian and two refractors set up from 8:30 pm.",
      "What you'll see: the rings (tilted nicely this year), the moon Titan, and — if the air is steady — the Cassini Division. Bring a jacket; it gets cold standing still.",
      "Beginners welcome. We'll show you how to focus and how to find Saturn yourself with binoculars."
    ),
  },
  {
    _id: "seed-draconids-2026",
    slug: "draconid-meteor-shower-watch",
    title: "Draconid Meteor Shower Watch",
    type: "stargazing",
    eventTime: at(2026, 10, 8, 19, 30),
    endTime: at(2026, 10, 8, 22, 0),
    location: "Sports field (dark corner)",
    poster: "/video/gallery.jpg",
    excerpt: "An early-evening shower — no need to stay up late. Blankets, hot chocolate, and a radiant near the Dragon's head.",
    description: html(
      "The Draconids are unusual: they peak in the evening rather than after midnight, which makes them perfect for a school-night session.",
      "Rates are modest (ZHR ~10) but the shower has produced outbursts before. We'll lie back on blankets, count meteors for the IMO, and learn the autumn constellations while we wait.",
      "Bring: a blanket or reclining chair, warm layers, a red torch. We'll supply the hot chocolate."
    ),
  },
  {
    _id: "seed-phone-astrophotography-2026",
    slug: "workshop-astrophotography-with-your-phone",
    title: "Workshop: Astrophotography with Your Phone",
    type: "workshop",
    eventTime: at(2026, 10, 17, 18, 0),
    endTime: at(2026, 10, 17, 20, 30),
    location: "Room 204, then the rooftop",
    poster: "/video/blog.jpg",
    excerpt: "Night mode, tripods, and the phone-at-the-eyepiece trick. Leave with your first Moon and Milky Way shots.",
    description: html(
      "You don't need a camera to start. Modern phones can capture the Moon's craters, Jupiter's moons and even the Milky Way from a dark site.",
      "Part 1 (indoors): exposure, ISO, night mode, why a tripod matters, free stacking apps. Part 2 (rooftop): hands-on — the Moon through the telescope with your phone at the eyepiece.",
      "Bring your phone (charged) and a small tripod if you have one. We have a few adapters to share."
    ),
  },
  {
    _id: "seed-orionids-2026",
    slug: "orionids-meteor-shower-night",
    title: "Orionids Meteor Shower Night",
    type: "stargazing",
    eventTime: at(2026, 10, 21, 22, 0),
    endTime: at(2026, 10, 22, 2, 0),
    location: "Dark-sky site (car pool from school)",
    poster: "/video/events.jpg",
    excerpt: "Dust from Halley's Comet, fast meteors with persistent trains, and Orion rising after midnight.",
    description: html(
      "The Orionids come from Halley's Comet and are fast — 66 km/s — so they often leave glowing trains. Best after midnight when Orion is high.",
      "This is a late one, so it's parent-permission for under-16s and a car pool from the school gate at 9:30 pm. We're back by 2:30 am.",
      "Members only for the car pool sign-up; the location is shared in the members area."
    ),
  },
  {
    _id: "seed-ai-exoplanets-2026",
    slug: "ai-exoplanet-hunt-machine-learning-on-nasa-light-curves",
    title: "AI Exoplanet Hunt: Machine Learning on NASA Light Curves",
    type: "webinar",
    eventTime: at(2026, 11, 7, 16, 0),
    endTime: at(2026, 11, 7, 18, 0),
    location: "Online",
    meetLink: "https://meet.google.com/deep-sky-society",
    poster: "/video/projects.jpg",
    excerpt: "Train a classifier to spot planet transits in real Kepler/TESS data. Python, no prior ML needed.",
    description: html(
      "Our flagship workshop. We load real light curves from the NASA Exoplanet Archive, look at what a transit actually does to a star's brightness, and train a simple model to tell planets from noise.",
      "You'll need a laptop with a browser — everything runs in a hosted notebook. We'll walk through it live; no prior machine-learning experience required.",
      "Recording and notebook shared with members afterwards."
    ),
  },
  {
    _id: "seed-leonids-2026",
    slug: "leonids-watch-party",
    title: "Leonids Watch Party",
    type: "stargazing",
    eventTime: at(2026, 11, 17, 23, 0),
    endTime: at(2026, 11, 18, 3, 0),
    location: "Dark-sky site (car pool from school)",
    poster: "/video/gallery.jpg",
    excerpt: "The shower famous for its storms. Pre-dawn is best — bring a sleeping bag and a thermos.",
    description: html(
      "The Leonids are usually modest (ZHR ~15) but historically produce the most dramatic meteor storms on record. The radiant in Leo rises around midnight, so the hours before dawn are best.",
      "We'll set up at the dark-sky site with mats and sleeping bags, and count meteors together. Members get the car-pool details."
    ),
  },
  {
    _id: "seed-beaver-moon-2026",
    slug: "beaver-moon-observing-and-lunar-sketching",
    title: "Beaver Moon: Observing & Lunar Sketching",
    type: "stargazing",
    eventTime: at(2026, 11, 24, 19, 0),
    endTime: at(2026, 11, 24, 21, 0),
    location: "School observatory rooftop",
    poster: "/video/learn.jpg",
    excerpt: "November's full Moon through the telescope, plus a relaxed sketching session — the classic way to learn to see.",
    description: html(
      "A bright Moon washes out faint stuff, so we lean into it: craters, maria, ray systems, and the terminator where shadows are longest.",
      "Then we sketch. Drawing what you see at the eyepiece trains your eye faster than any app. Pencils and clipboards provided; artistic talent not required."
    ),
  },
  {
    _id: "seed-geminids-2026",
    slug: "geminids-the-best-meteor-shower-of-the-year",
    title: "Geminids: The Best Meteor Shower of the Year",
    type: "stargazing",
    eventTime: at(2026, 12, 13, 21, 0),
    endTime: at(2026, 12, 14, 1, 0),
    location: "Dark-sky site (car pool from school)",
    poster: "/video/events.jpg",
    excerpt: "Up to 150 meteors an hour under a dark, moonless sky. Slow, bright, colourful — the one night not to miss.",
    description: html(
      "The Geminids are the strongest annual shower, and 2026 lines up beautifully: the Moon is new on 9 December, so the sky is properly dark at the peak.",
      "The radiant in Gemini is well up by 9 pm, so unlike most showers you don't have to wait for the small hours. Expect slow, bright meteors, often yellow or green.",
      "Dress for two hours colder than the forecast. Car pool leaves the school gate at 8:15 pm."
    ),
  },
  {
    _id: "seed-quadrantids-2027",
    slug: "quadrantids-dawn-session",
    title: "Quadrantids Dawn Session",
    type: "stargazing",
    eventTime: at(2027, 1, 3, 4, 30),
    endTime: at(2027, 1, 3, 7, 0),
    location: "Sports field (dark corner)",
    poster: "/video/gallery.jpg",
    excerpt: "A short, sharp peak of a few hours before dawn. Blue fireballs, then breakfast.",
    description: html(
      "The Quadrantids can match the Geminids for rate, but the peak is narrow — just a few hours — so timing matters. We meet at 4:30 am, observe until first light, then go for breakfast together.",
      "Layers, layers, layers. It's January."
    ),
  },
  {
    _id: "seed-talk-life-exoplanets-2027",
    slug: "guest-talk-the-search-for-life-on-exoplanets",
    title: "Guest Talk: The Search for Life on Exoplanets",
    type: "talk",
    eventTime: at(2027, 1, 23, 17, 0),
    endTime: at(2027, 1, 23, 18, 30),
    location: "Online",
    meetLink: "https://meet.google.com/deep-sky-society",
    poster: "/video/about.jpg",
    excerpt: "A working astrophysicist on biosignatures, JWST spectra, and what 'habitable' really means. Q&A included.",
    description: html(
      "How do you look for life on a planet you can't even see directly? We're joined by a researcher working on exoplanet atmospheres to talk through transmission spectroscopy, JWST results and the honest state of the biosignature hunt.",
      "Half talk, half Q&A — bring questions. Open to everyone; recording shared with members."
    ),
  },
  {
    _id: "seed-mars-opposition-2027",
    slug: "mars-at-opposition-red-planet-night",
    title: "Mars at Opposition — Red Planet Night",
    type: "stargazing",
    eventTime: at(2027, 2, 19, 20, 0),
    endTime: at(2027, 2, 19, 23, 0),
    location: "School observatory rooftop",
    poster: "/video/projects.jpg",
    excerpt: "Mars at its closest for two years: polar cap, dark markings and maybe a dust storm through the big scope.",
    description: html(
      "Mars only comes close every 26 months. At opposition it's a small but detailed disc: the bright polar cap, dark albedo features like Syrtis Major, and the changing colour of the deserts.",
      "We'll run the 8-inch at high power and take turns. Bring patience — planetary observing rewards long looks."
    ),
  },
  {
    _id: "seed-total-solar-eclipse-2027",
    slug: "total-solar-eclipse-2027-watch-party",
    title: "Total Solar Eclipse 2027 — Watch Party",
    type: "meetup",
    eventTime: at(2027, 8, 2, 10, 0),
    endTime: at(2027, 8, 2, 14, 0),
    location: "Main hall + rooftop (safe viewing)",
    poster: "/video/home.jpg",
    excerpt: "The eclipse of the decade — over six minutes of totality across Spain and North Africa. Live feed, eclipse glasses, and safe projection.",
    description: html(
      "On 2 August 2027 the Moon's shadow crosses southern Spain, Morocco, Algeria, Libya and Egypt, with totality lasting over six minutes near Luxor — the longest on land this century.",
      "If we're not travelling to the path, we'll watch the live feeds together on the big screen and follow the partial phases from the rooftop with certified eclipse glasses and a pinhole projector. Never look at the Sun without proper protection.",
      "Members planning a trip to the path: there's a thread in the members area."
    ),
  },
].map((e) => ({ ...e, membersOnly: false, seed: true, createdAt: e.eventTime, updatedAt: e.eventTime }));

export const findSeedEvent = (idOrSlug) => SEED_EVENTS.find((e) => e.slug === idOrSlug || e._id === idOrSlug) || null;

/** Merge API events with seeds (no duplicates by slug), sorted by date. */
export function withSeedEvents(events = [], { scope } = {}) {
  const seen = new Set(events.map((e) => e.slug));
  const now = Date.now();
  const merged = [...events, ...SEED_EVENTS.filter((e) => !seen.has(e.slug))];
  const filtered = merged.filter((e) => {
    const past = new Date(e.eventTime).getTime() < now;
    return scope === "past" ? past : scope === "upcoming" ? !past : true;
  });
  return filtered.sort((a, b) => (scope === "past" ? new Date(b.eventTime) - new Date(a.eventTime) : new Date(a.eventTime) - new Date(b.eventTime)));
}
