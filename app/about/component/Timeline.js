"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaFlagCheckered, FaRocket, FaUsers, FaUniversity } from "react-icons/fa";

const journey = [
  {
    year: "2023",
    title: "Club Founded",
    description: "A passionate group of students came together to build something impactful.",
    icon: <FaFlagCheckered />,
  },
  {
    year: "2023",
    title: "CodeSprint Debut",
    description: "Our first event with over 100 participants from different departments.",
    icon: <FaRocket />,
  },
  {
    year: "2024",
    title: "Community Growth",
    description: "30+ new members joined us to build projects, share ideas, and grow together.",
    icon: <FaUsers />,
  },
  {
    year: "2024",
    title: "Cross-Campus Reach",
    description: "We opened our doors to other universities to collaborate and innovate.",
    icon: <FaUniversity />,
  },
];

const Timeline = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
      >
        Our Journey
      </motion.h2>

      <div className="relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:h-full before:w-1 before:bg-white/10">
        {journey.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`mb-16 flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } group`}
          >
            {/* Icon Bubble */}
            <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg">
              {step.icon}
            </div>

            {/* Connector line */}
            <div className="absolute left-1/2 -translate-x-1/2  w-1 bg-gradient-to-b from-white/10 to-transparent z-0"></div>

            {/* Card */}
            <div
              className={`md:w-1/2 mt-6 md:mt-0 px-6 py-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md shadow-md transition-all hover:scale-[1.02] hover:shadow-purple-500/10 ${
                index % 2 === 0 ? "md:mr-auto md:pl-16" : "md:ml-auto md:pr-16"
              }`}
            >
              <p className="text-sm text-gray-400 mb-1">{step.year}</p>
              <h3 className="text-white font-semibold text-xl mb-1">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 text-center"
      >
        <a
          href="/join"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          Join Our Journey →
        </a>
      </motion.div>
    </section>
  );
};

export default Timeline;
