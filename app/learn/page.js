"use client";
import { motion } from "framer-motion";

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
  },
  {
    title: "DIY Telescope Instructions",
    description:
      "Want to build your own telescope? We provide step-by-step instructions with diagrams and materials.",
  },
  {
    title: "Quizzes & Fun Facts",
    description:
      "Challenge yourself with astronomy quizzes and discover mind-blowing facts about the universe!",
  },
];

const LearnPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-6 sm:px-10 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Learn Astronomy
        </h1>

        {learnSections.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:shadow-xl transition-all"
          >
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default LearnPage;
