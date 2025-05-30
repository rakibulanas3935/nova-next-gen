// app/projects/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const projectSections = [
  {
    title: "Current Projects",
    items: [
      "Constellation Mapping",
      "Moon Diary / Observing Logs",
      "Building a Telescope",
      "Astrophotography Challenge"
    ]
  },
  {
    title: "Member Projects",
    description:
      "Explore amazing creations by our members — from articles and journals to sketches, models, and photography."
  }
];

const ProjectsPage = () => {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
        >
          Projects
        </motion.h1>

        {/* Sections */}
        {projectSections.map((section, index) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {section.title}
            </h2>
            {section.items && (
              <ul className="grid sm:grid-cols-2 gap-4 list-disc list-inside text-gray-300">
                {section.items.map((item, idx) => (
                  <li key={idx} className="hover:text-white transition">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.description && (
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                {section.description}
              </p>
            )}

            {/* Share Work CTA */}
            {section.title === "Member Projects" && (
              <div className="mt-6">
                <Link
                  href="/submit-project"
                  className="inline-block bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-xl text-sm font-medium"
                >
                  Share Your Work
                </Link>
              </div>
            )}
          </motion.section>
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;
