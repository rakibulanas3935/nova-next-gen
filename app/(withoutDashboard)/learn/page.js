"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLearnContext } from "@/app/context/learnContext";

const learnSections = [
  {
    title: "Astronomy Basics for Beginners",
    description:
      "Get started with the fundamentals—what are stars, planets, galaxies, and how do telescopes work?",
  },
  {
    title: "Recommended Apps & Tools",
    description:
      "Explore top stargazing tools like Stellarium, Sky Guide, and Star Walk to elevate your experience.",
  },
  {
    title: "Books & YouTube Recommendations",
    description:
      "Curated list of beginner-friendly books, science channels, and documentaries to learn at your pace.",
    expandable: true,
    content: (
      <ul className="mt-2 list-disc list-inside text-sm text-gray-300 space-y-1">
        <li>
          📘{" "}
          <a
            href="https://www.goodreads.com/book/show/25700616-astronomy-for-dummies"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Astronomy for Dummies
          </a>
        </li>
        <li>
          🎥{" "}
          <a
            href="https://www.youtube.com/@PBS.SpaceTime"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            PBS SpaceTime
          </a>
        </li>
        <li>
          🎥{" "}
          <a
            href="https://www.youtube.com/@DrBecky"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Dr. Becky
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "DIY Telescope Instructions",
    description:
      "Want to build your own telescope? We provide step-by-step instructions with diagrams and materials.",
    expandable: true,
    content: (
      <div className="mt-2 text-sm text-gray-300">
        Download PDF instructions:{" "}
        <a
          href="/files/diy-telescope-guide.pdf"
          className="underline text-blue-400"
          download
        >
          DIY Telescope Guide
        </a>
      </div>
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
  {
    question: "Which planet has the most moons?",
    options: ["Earth", "Saturn", "Mars", "Neptune"],
    answer: "Saturn",
  },
  {
    question: "What is a light-year a measure of?",
    options: ["Time", "Brightness", "Distance", "Speed"],
    answer: "Distance",
  },
  {
    question: "Which is the closest star to Earth?",
    options: ["Proxima Centauri", "Sirius", "Vega", "Polaris"],
    answer: "Proxima Centauri",
  },
];


const funFacts = [
  "Neutron stars can spin 600 times per second.",
  "The Sun makes up 99.8% of our solar system's mass.",
  "A day on Venus is longer than its year.",
];

const LearnPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const {learn}=useLearnContext()
  const toggleSection = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleAnswer = (index, option) => {
    setQuizAnswers({ ...quizAnswers, [index]: option });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  return (

    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen !overflow-hidden py-20 px-4 sm:px-10 bg-[#0A0F1C]  bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.1),transparent)] text-white "
    >
      <motion.div
        className="absolute w-32 h-32 rounded-full opacity-20"
        animate={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * -0.03,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(79,70,229,0) 70%)',
          bottom: '20%',
          left: '20%',
        }}
      />
       {/* Soft background light effect */}
            <div className="absolute top-0 left-0 w-full h-auto bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.1),transparent)] pointer-events-none" />
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i + 1}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto space-y-16">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Learn 
        </h1>

        {/* Learn Sections */}
        {learn?.data?.learns?.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
          >
            <div
              className={`flex justify-between items-center`}
             
            >
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                {item.title}
              </h2>
              
            </div>
            <p className="mt-2 text-sm text-gray-300"
            dangerouslySetInnerHTML={{ __html: item.description }}/>
            
          </motion.div>
        ))}

        {/* Interactive Quiz */}
        {/* <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">🚀 Interactive Quiz</h2>
          {quizQuestions.map((q, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-2"
            >
              <p className="font-medium">{q.question}</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {q.options.map((option) => {
                  const isSelected = quizAnswers[i] === option;
                  const isCorrect = option === q.answer;
                  const showState = showResults && isSelected;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(i, option)}
                      disabled={showResults}
                      className={`px-4 py-2 rounded-lg border text-sm transition ${showState
                        ? isCorrect
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
        </div> */}

        {/* Fun Facts */}
        {/* <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🌟 Fun Facts</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
            {funFacts.map((fact, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {fact}
              </motion.li>
            ))}
          </ul>
        </div> */}
      </div>
    </motion.section>
  );
};

export default LearnPage;
