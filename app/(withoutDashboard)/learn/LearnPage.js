"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Gamepad2 } from "lucide-react";
import CommonLoader from "@/app/components/common/CommonLoader";
import { useLearnContext } from "@/app/context/learnContext";

const Links = ({ items }) => (
  <ul className="mt-2 list-disc list-inside text-sm text-gray-300 space-y-1">
    {items.map(([label, href, text]) => (
      <li key={href}>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{label}</a>{" "}– {text}
      </li>
    ))}
  </ul>
);
const Paras = ({ items }) => (
  <div className="mt-2 space-y-2 text-sm text-gray-300">{items.map((t, i) => <p key={i}>{t}</p>)}</div>
);

const learnSections = [
  {
    title: "🌌 Astronomy Basics",
    description: "Learn what stars, planets, galaxies, and constellations are — the building blocks of the universe.",
    expandable: true,
    content: (
      <Paras items={[
        "Astronomy is the study of everything beyond Earth’s atmosphere. From how stars are born, to why galaxies form, to how black holes bend space-time — it’s the science of the cosmos.",
        "Start by learning the sky itself. Find the Big Dipper, follow its handle to Arcturus, its bowl to Polaris. Once you can navigate, every other object becomes reachable.",
        "Distances are the hardest idea. Light from the Sun takes 8 minutes to reach you; from the nearest star, 4 years; from Andromeda, 2.5 million years. When you look up, you look back in time.",
      ]} />
    ),
  },
  {
    title: "📱 Apps & Tools",
    description: "Boost your stargazing with modern apps and tools that guide you through the night sky.",
    expandable: true,
    content: (
      <Links items={[
        ["Stellarium", "https://stellarium.org/", "A free planetarium software that shows a realistic night sky."],
        ["Stellarium Web", "https://stellarium-web.org/", "Same engine, runs in the browser — no install."],
        ["Sky & Telescope Chart", "https://skyandtelescope.org/interactive-sky-chart/", "Explore constellations interactively."],
        ["Heavens-Above", "https://www.heavens-above.com/", "ISS passes and satellite predictions for your location."],
        ["NASA Exoplanet Archive", "https://exoplanetarchive.ipac.caltech.edu/", "The data behind our machine-learning workshops."],
      ]} />
    ),
  },
  {
    title: "📚 Books & Videos",
    description: "Recommended resources for self-learning astronomy at your own pace.",
    expandable: true,
    content: (
      <Links items={[
        ["A Brief History of Time — Stephen Hawking", "https://www.goodreads.com/book/show/3869.A_Brief_History_of_Time", "The book that started it for many of us."],
        ["Turn Left at Orion", "https://www.goodreads.com/book/show/10981.Turn_Left_at_Orion", "The best guide to what a small telescope can actually show."],
        ["Astronomy for Dummies", "https://www.goodreads.com/book/show/25700616-astronomy-for-dummies", "Gentle, practical start."],
        ["PBS Space Time", "https://www.youtube.com/@pbsspacetime", "Serious physics, beautifully explained."],
        ["Dr. Becky", "https://www.youtube.com/@DrBecky", "An astrophysicist on the latest research, weekly."],
      ]} />
    ),
  },
  {
    title: "🔭 Choosing a Telescope",
    description: "Aperture, mounts and why binoculars might be your best first buy.",
    expandable: true,
    content: (
      <Paras items={[
        "Aperture (the diameter of the main lens or mirror) matters more than magnification. More aperture = more light = fainter objects.",
        "A 6–8 inch Dobsonian reflector is the classic first scope: huge aperture per dollar, simple to use. Avoid anything advertising ‘500x magnification’.",
        "Good 10x50 binoculars show the Moon’s craters, Jupiter’s moons, the Pleiades and the Andromeda galaxy — and you’ll use them for life.",
      ]} />
    ),
  },
  {
    title: "📷 Astrophotography 101",
    description: "From phone-on-a-tripod to stacked deep-sky images.",
    expandable: true,
    content: (
      <Paras items={[
        "Start with your phone: night mode, a tripod, 10–30 second exposures. The Milky Way is reachable from a dark site.",
        "The two enemies are light pollution and tracking. A star tracker lets a DSLR expose for minutes without star trails.",
        "Stack many short exposures with free tools like Siril or DeepSkyStacker — noise averages out, signal adds up.",
      ]} />
    ),
  },
  {
    title: "🤖 AI in Astrophysics",
    description: "How machine learning finds exoplanets — the project we run in workshops.",
    expandable: true,
    content: (
      <Paras items={[
        "When a planet crosses its star, the star dims by a fraction of a percent. Kepler and TESS recorded millions of these light curves.",
        "A classifier trained on labelled transits learns to separate real planets from stellar noise and eclipsing binaries.",
        "Our workshop walks through loading NASA light curves, engineering features and training a model in Python. No prior ML experience needed.",
      ]} />
    ),
  },
];

const glossary = [
  ["Aperture", "Diameter of a telescope’s main lens or mirror; determines how much light it gathers."],
  ["Astronomical unit (AU)", "Average Earth–Sun distance, about 150 million km."],
  ["Deep-sky object", "Anything beyond the solar system that isn’t a single star: nebulae, clusters, galaxies."],
  ["Exoplanet", "A planet orbiting a star other than the Sun. Over 5,000 confirmed."],
  ["Light-year", "Distance light travels in one year: about 9.46 trillion km."],
  ["Magnitude", "Brightness scale where smaller is brighter. The Sun is −27, Sirius −1.5, the faintest naked-eye stars about +6."],
  ["Messier object", "One of 110 bright deep-sky objects catalogued by Charles Messier (M1–M110)."],
  ["Nebula", "A cloud of gas and dust; stellar nurseries or the remains of dead stars."],
  ["Redshift", "Stretching of light to longer wavelengths as the universe expands; a proxy for distance."],
  ["Transit", "When a planet passes in front of its star as seen from Earth, dimming it slightly."],
  ["Zenith", "The point directly overhead."],
  ["ZHR", "Zenithal Hourly Rate: meteors per hour a shower would produce under ideal skies."],
];

const quizQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What galaxy is Earth located in?",
    options: ["Andromeda", "Whirlpool", "Milky Way", "Cartwheel"],
    answer: "Milky Way",
  },
  {
    question: "Which celestial body has the strongest gravity?",
    options: ["Sun", "Black Hole", "Jupiter", "Neutron Star"],
    answer: "Black Hole",
  },
  { question: "How long does sunlight take to reach Earth?", options: ["8 seconds", "8 minutes", "8 hours", "8 days"], answer: "8 minutes" },
  { question: "What is the closest star to Earth after the Sun?", options: ["Sirius", "Betelgeuse", "Proxima Centauri", "Vega"], answer: "Proxima Centauri" },
  { question: "Which of these is a method used to detect exoplanets?", options: ["Transit photometry", "Carbon dating", "Seismic imaging", "Spectral welding"], answer: "Transit photometry" },
  { question: "The Perseid meteor shower peaks in which month?", options: ["March", "August", "November", "December"], answer: "August" },
];

const funFacts = [
  "✨ Neutron stars can spin 600 times per second!",
  "☀️ The Sun makes up 99.8% of our solar system’s mass.",
  "🌍 A day on Venus is longer than its year.",
  "🌌 There are more stars in the universe than grains of sand on Earth.",
  "🔭 Light from the Andromeda galaxy left it 2.5 million years ago.",
  "🪐 Jupiter’s Great Red Spot is a storm larger than Earth that has raged for centuries.",
  "👣 The footprints on the Moon will last for millions of years — there’s no wind to erase them.",
];

const miniGameQuestions = [
  {
    question: "Which constellation looks like a hunter with a belt of 3 stars?",
    answer: "Orion",
  },
];

export default function LearnPage() {
  const { learn, learnLoading } = useLearnContext();
  const [expanded, setExpanded] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [gameAnswer, setGameAnswer] = useState("");
  const [gameResult, setGameResult] = useState("");

  if (learnLoading) return <CommonLoader />;

  const toggleSection = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleAnswer = (qIndex, option) => {
    setQuizAnswers({ ...quizAnswers, [qIndex]: option });
  };

  const checkAnswers = () => setShowResults(true);

  const handleGameSubmit = () => {
    const currentQ = miniGameQuestions[0];
    setGameResult(
      gameAnswer.toLowerCase() === currentQ.answer.toLowerCase()
        ? "✅ Correct!"
        : `❌ Wrong! It was ${currentQ.answer}`
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-4 sm:px-10  text-white relative"
    >


      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          🚀 Learn Astronomy
        </h1>

        {/* Sections */}
        {learnSections.map((sec, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(i)}
            >
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                {sec.title}
              </h2>
              {sec.expandable &&
                (expanded === i ? (
                  <ChevronUp className="w-5 h-5 text-gray-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-300" />
                ))}
            </div>
            <p className="mt-2 text-sm text-gray-300">{sec.description}</p>
            {expanded === i && sec.content}
          </motion.div>
        ))}

        {/* Quiz */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">🧩 Quiz Time</h2>
          {quizQuestions.map((q, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-2"
            >
              <p className="font-medium">{q.question}</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {q.options.map((option) => {
                  const selected = quizAnswers[i] === option;
                  const correct = option === q.answer;
                  const show = showResults && selected;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(i, option)}
                      disabled={showResults}
                      className={`px-4 py-2 rounded-lg cursor-pointer border text-sm transition ${showResults
                          ? option === q.answer
                            ? "bg-green-500/20 border-green-500"
                            : quizAnswers[i] === option
                              ? "bg-red-500/20 border-red-500"
                              : "border-white/20"
                          : quizAnswers[i] === option
                            ? "bg-blue-500/20 border-blue-500" // highlight selected option
                            : "border-white/20 hover:bg-white/10"
                        }`}
                    >
                      {option}
                    </button>

                  );
                })}
              </div>
              {showResults && (
                <p className="text-sm mt-2 text-gray-400">
                  Correct Answer:{" "}
                  <span className="text-green-400">{q.answer}</span>
                </p>
              )}
            </div>
          ))}
          {!showResults && (
            <button
              onClick={checkAnswers}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
            >
              Submit Quiz
            </button>
          )}
        </div>

        {/* Fun Facts Carousel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🌟 Fun Facts</h2>
          <motion.div
            key={factIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-white/5 border border-white/10 rounded-lg text-center"
          >
            {funFacts[factIndex]}
          </motion.div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() =>
                setFactIndex((factIndex - 1 + funFacts.length) % funFacts.length)
              }
              className="px-3 py-1 bg-white/10 rounded-md"
            >
              Prev
            </button>
            <button
              onClick={() => setFactIndex((factIndex + 1) % funFacts.length)}
              className="px-3 py-1 bg-white/10 rounded-md"
            >
              Next
            </button>
          </div>
        </div>

        {/* Glossary */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">📖 Glossary</h2>
          <p className="text-gray-300">Words you’ll hear on observing nights.</p>
          <dl className="grid gap-4 sm:grid-cols-2">
            {glossary.map(([term, def]) => (
              <div key={term} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <dt className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">{term}</dt>
                <dd className="mt-1 text-sm text-gray-300">{def}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Mini Game */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-blue-400" /> Play & Learn
          </h2>
          <p className="text-gray-300">
            Guess the answer to this astronomy riddle:
          </p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
            <p>{miniGameQuestions[0].question}</p>
            <input
              type="text"
              value={gameAnswer}
              onChange={(e) => setGameAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
            />
            <button
              onClick={handleGameSubmit}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
            >
              Submit Answer
            </button>
            {gameResult && (
              <p
                className={`mt-2 font-medium ${gameResult.includes("✅")
                    ? "text-green-400"
                    : "text-red-400"
                  }`}
              >
                {gameResult}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
