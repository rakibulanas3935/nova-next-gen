"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Gamepad2 } from "lucide-react";
import CommonLoader from "@/app/components/common/CommonLoader";
import { useLearnContext } from "@/app/context/learnContext";

const learnSections = [
  {
    title: "🌌 Astronomy Basics",
    description:
      "Learn what stars, planets, galaxies, and constellations are — the building blocks of the universe.",
    expandable: true,
    content: (
      <p className="mt-2 text-sm text-gray-300">
        Astronomy is the study of everything beyond Earth’s atmosphere. From how
        stars are born, to why galaxies form, to how black holes bend space-time
        — it’s the science of the cosmos.
      </p>
    ),
  },
  {
    title: "📱 Apps & Tools",
    description:
      "Boost your stargazing with modern apps and tools that guide you through the night sky.",
    expandable: true,
    content: (
      <ul className="mt-2 list-disc list-inside text-sm text-gray-300 space-y-1">
        <li>
          <a
            href="https://stellarium.org/"
            target="_blank"
            className="text-blue-400 underline"
          >
            Stellarium
          </a>{" "}
          – A free planetarium software that shows a realistic night sky.
        </li>
        <li>
          <a
            href="https://skyandtelescope.org/interactive-sky-chart/"
            target="_blank"
            className="text-blue-400 underline"
          >
            Sky & Telescope Chart
          </a>{" "}
          – Explore constellations interactively.
        </li>
      </ul>
    ),
  },
  {
    title: "📚 Books & Videos",
    description:
      "Recommended resources for self-learning astronomy at your own pace.",
    expandable: true,
    content: (
      <ul className="mt-2 list-disc list-inside text-sm text-gray-300 space-y-1">
        <li>
          📘{" "}
          <a
            href="https://www.goodreads.com/book/show/25700616-astronomy-for-dummies"
            target="_blank"
            className="underline text-blue-400"
          >
            Astronomy for Dummies
          </a>
        </li>
        <li>
          🎥{" "}
          <a
            href="https://www.youtube.com/@PBS.SpaceTime"
            target="_blank"
            className="underline text-blue-400"
          >
            PBS SpaceTime
          </a>
        </li>
        <li>
          🎥{" "}
          <a
            href="https://www.youtube.com/@DrBecky"
            target="_blank"
            className="underline text-blue-400"
          >
            Dr. Becky
          </a>
        </li>
      </ul>
    ),
  },
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
];

const funFacts = [
  "✨ Neutron stars can spin 600 times per second!",
  "☀️ The Sun makes up 99.8% of our solar system’s mass.",
  "🌍 A day on Venus is longer than its year.",
  "🌌 There are more stars in the universe than grains of sand on Earth.",
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
      className="min-h-screen py-20 px-4 sm:px-10 bg-[#0A0F1C] text-white relative"
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
                      className={`px-4 py-2 rounded-lg border text-sm transition ${
                        show
                          ? correct
                            ? "bg-green-500/20 border-green-500"
                            : "bg-red-500/20 border-red-500"
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
                className={`mt-2 font-medium ${
                  gameResult.includes("✅")
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
