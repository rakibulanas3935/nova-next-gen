// Realistic member projects, shown when the API has none (see seed-events.js
// for the same pattern). Links point at the real tools/data each project uses.

const at = (y, m, d) => new Date(y, m - 1, d, 12).toISOString();
const html = (...ps) => ps.map((p) => `<p>${p}</p>`).join("");

export const SEED_PROJECTS = [
  {
    _id: "seed-exoplanet-transit-classifier",
    slug: "exoplanet-transit-classifier",
    title: "Exoplanet Transit Classifier",
    tags: ["python", "machine-learning", "kepler"],
    projectImage: "/video/projects.jpg",
    createdBy: { name: "Carlos", userName: "carlos" },
    isFeatured: true,
    createdAt: at(2026, 6, 14),
    liveLink: "https://exoplanetarchive.ipac.caltech.edu/",
    excerpt: "A machine-learning model that spots planet transits in Kepler and TESS light curves — the workshop project that started our AI track.",
    description: html(
      "When a planet crosses its star the brightness dips by a fraction of a percent. Kepler and TESS recorded millions of these light curves; most dips are noise, eclipsing binaries or instrument glitches.",
      "We pull light curves with <code>lightkurve</code>, flatten and fold them on the candidate period, and train a gradient-boosted classifier on features like depth, duration and shape symmetry. On the held-out set it reaches ~94% precision on confirmed planets.",
      "Everything runs in a hosted notebook so anyone in the club can reproduce it. This is the project we teach in the AI Exoplanet Hunt workshop."
    ),
  },
  {
    _id: "seed-dobsonian-build",
    slug: "diy-6-inch-dobsonian-telescope",
    title: "DIY 6-inch Dobsonian Telescope",
    tags: ["hardware", "optics", "woodwork"],
    projectImage: "/video/events.jpg",
    createdBy: { name: "Maya R.", userName: "maya" },
    isFeatured: true,
    createdAt: at(2026, 4, 20),
    liveLink: "https://stellafane.org/tm/dob/index.html",
    excerpt: "A 150 mm f/8 Newtonian on a plywood Dobsonian mount, built over one term for under the price of a phone.",
    description: html(
      "The classic first telescope you can build yourself. We bought a 150 mm parabolic mirror and secondary, and made everything else: the tube from a concrete form, the focuser from PVC, the rocker box from 12 mm plywood with Teflon bearings.",
      "First light was the Moon and Saturn from the rooftop. It now lives in the observatory cupboard and comes to every telescope night.",
      "Total cost, mirror included, was about a third of an equivalent commercial scope. Build notes and the cut list are in the members area."
    ),
  },
  {
    _id: "seed-allsky-meteor-camera",
    slug: "all-sky-meteor-camera",
    title: "All-Sky Meteor Camera",
    tags: ["raspberry-pi", "meteors", "citizen-science"],
    projectImage: "/video/gallery.jpg",
    createdBy: { name: "Tariq H.", userName: "tariq" },
    isFeatured: true,
    createdAt: at(2026, 8, 3),
    liveLink: "https://globalmeteornetwork.org/",
    excerpt: "A Raspberry Pi and a wide-angle camera on the school roof, contributing meteor detections to the Global Meteor Network every clear night.",
    description: html(
      "The Global Meteor Network runs hundreds of cheap cameras worldwide and triangulates meteors between stations to compute orbits. We built a station to add our sky to the network.",
      "Hardware: Raspberry Pi 4, an IMX291 low-light camera with a 4 mm lens, a weatherproof housing and a heater to keep dew off the window. Software is the open-source RMS package; it detects meteors automatically and uploads them overnight.",
      "During the Perseids it logged 140 meteors in one night. The data feeds straight into published orbit catalogues."
    ),
  },
  {
    _id: "seed-light-pollution-map",
    slug: "campus-light-pollution-survey",
    title: "Campus Light Pollution Survey",
    tags: ["citizen-science", "data", "environment"],
    projectImage: "/video/about.jpg",
    createdBy: { name: "Lena K.", userName: "lena" },
    createdAt: at(2026, 3, 11),
    liveLink: "https://globeatnight.org/",
    excerpt: "Sky-brightness measurements across campus and the neighbourhood, submitted to Globe at Night and turned into a map for the facilities team.",
    description: html(
      "We measured naked-eye limiting magnitude at 40 points using the Globe at Night method, plus a Sky Quality Meter for numbers. The darkest corner of the sports field is a full magnitude better than the main quad.",
      "The map convinced facilities to switch two floodlights to motion sensors. That's where we hold meteor nights now."
    ),
  },
  {
    _id: "seed-sky-tonight-widget",
    slug: "sky-tonight-widget",
    title: "Sky Tonight Widget",
    tags: ["javascript", "web", "open-source"],
    projectImage: "/video/learn.jpg",
    createdBy: { name: "Deep Sky Society", userName: "deepsky" },
    createdAt: at(2026, 9, 1),
    liveLink: "/sky-tonight",
    excerpt: "The Moon phase, meteor shower and seasonal sky guide on this website — computed in the browser with no API, so it never goes down.",
    description: html(
      "Moon age and illumination come from a reference new moon and the synodic month; meteor shower peaks are a small table; the seasonal guide keys off the month. Everything is a few hundred lines of plain JavaScript.",
      "It's also a nice first contribution for members who want to learn web development — the code is in the site repository."
    ),
  },
  {
    _id: "seed-galaxy-zoo-classifier",
    slug: "galaxy-morphology-classifier",
    title: "Galaxy Morphology Classifier",
    tags: ["deep-learning", "python", "galaxy-zoo"],
    projectImage: "/video/blog.jpg",
    createdBy: { name: "Arjun P.", userName: "arjun" },
    createdAt: at(2026, 7, 22),
    liveLink: "https://www.zooniverse.org/projects/zookeeper/galaxy-zoo",
    excerpt: "A small convolutional network trained on Galaxy Zoo labels to tell spirals from ellipticals — and a look at where it gets confused.",
    description: html(
      "Galaxy Zoo volunteers have classified hundreds of thousands of SDSS galaxies. We used a subset of those labels to train a compact CNN on 64×64 cutouts.",
      "It reaches about 90% agreement with volunteers on clear spirals and ellipticals; the interesting part is the failure cases — edge-on discs and mergers — which is exactly where astronomers argue too."
    ),
  },
  {
    _id: "seed-solar-projection-rig",
    slug: "safe-solar-projection-rig",
    title: "Safe Solar Projection Rig",
    tags: ["hardware", "solar", "outreach"],
    projectImage: "/video/home.jpg",
    createdBy: { name: "Maya R.", userName: "maya" },
    createdAt: at(2026, 5, 9),
    excerpt: "A projection box for a small refractor so a whole class can watch sunspots and eclipses without anyone looking through an eyepiece.",
    description: html(
      "Direct solar viewing is dangerous; projection is the classic safe alternative. We built a shaded box that mounts behind a 70 mm refractor and projects a 15 cm solar image onto a white card.",
      "Sunspots and faculae are obvious, and during partial eclipses the whole class can watch the Moon's edge creep across. It'll be the centrepiece of our 2027 eclipse watch party."
    ),
  },
  {
    _id: "seed-radio-meteor-sdr",
    slug: "radio-meteor-detection-with-an-sdr",
    title: "Radio Meteor Detection with an SDR",
    tags: ["radio", "sdr", "meteors"],
    projectImage: "/video/contact.jpg",
    createdBy: { name: "Tariq H.", userName: "tariq" },
    createdAt: at(2026, 2, 27),
    liveLink: "https://www.rmob.org/",
    excerpt: "Counting meteors in daylight and cloud by listening for radio reflections off their ionised trails with a $30 software-defined radio.",
    description: html(
      "Meteors leave ionised trails that briefly reflect distant radio transmitters. Point a simple antenna at a far-away FM or radar transmitter, tune an RTL-SDR to it, and each meteor shows up as a short ping.",
      "We log pings automatically and submit hourly counts to the Radio Meteor Observing Bulletin. It works through cloud and in daytime — showers like the Daytime Arietids are only observable this way."
    ),
  },
  {
    _id: "seed-variable-star-photometry",
    slug: "variable-star-photometry",
    title: "Variable Star Photometry",
    tags: ["photometry", "aavso", "observing"],
    projectImage: "/video/gallery.jpg",
    createdBy: { name: "Lena K.", userName: "lena" },
    createdAt: at(2026, 1, 18),
    liveLink: "https://www.aavso.org/",
    excerpt: "Measuring the brightness of Algol and Delta Cephei over weeks and submitting the light curves to the AAVSO database.",
    description: html(
      "Some stars change brightness on schedules you can measure with a DSLR and a tripod. We imaged Algol (an eclipsing binary) and Delta Cephei (the original Cepheid) every clear night for two months.",
      "Comparison-star photometry in free software gives magnitudes good to about 0.05. Our data now sits in the AAVSO International Database alongside professional observations."
    ),
  },
  {
    _id: "seed-stacking-pipeline",
    slug: "astrophotography-stacking-pipeline",
    title: "Astrophotography Stacking Pipeline",
    tags: ["astrophotography", "siril", "image-processing"],
    projectImage: "/video/blog.jpg",
    createdBy: { name: "Arjun P.", userName: "arjun" },
    createdAt: at(2026, 8, 28),
    liveLink: "https://siril.org/",
    excerpt: "A scripted Siril workflow that turns a folder of raw phone or DSLR frames into a calibrated, stacked deep-sky image in one click.",
    description: html(
      "Stacking many short exposures averages out noise; calibration frames remove sensor artefacts. Doing it by hand is tedious, so we wrote a Siril script that handles darks, flats, registration and stacking automatically.",
      "Members drop their frames in a folder and get back a stretched TIFF. Most of the gallery's deep-sky shots went through it."
    ),
  },
].map((p) => ({ ...p, isApproved: true, isAdminProject: false, seed: true, updatedAt: p.createdAt }));

export const findSeedProject = (idOrSlug) => SEED_PROJECTS.find((p) => p.slug === idOrSlug || p._id === idOrSlug) || null;

/** Merge API projects with seeds (no duplicates by slug); featured first, then newest. */
export function withSeedProjects(projects = []) {
  const seen = new Set(projects.map((p) => p.slug));
  return [...projects, ...SEED_PROJECTS.filter((p) => !seen.has(p.slug))].sort(
    (a, b) => (b.isFeatured === true) - (a.isFeatured === true) || new Date(b.createdAt) - new Date(a.createdAt)
  );
}
