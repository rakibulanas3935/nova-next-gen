"use client";
import React from "react";
import { motion } from "framer-motion";

const guestSpeakers = [
  {
    name: "Dr. Sofia Rahman",
    title: "Astrophysicist at NASA",
    date: "July 10, 2025",
    topic: "The Search for Life on Exoplanets",
    description:
      "Join us for a live session with Dr. Rahman as she explores recent discoveries about habitable planets beyond our solar system.",
    image: "https://via.placeholder.com/400x250?text=Dr.+Sofia+Rahman",
    recording: "#", // or null if live-only
  },
  {
    name: "Professor Karim Zayed",
    title: "Space Robotics Specialist",
    date: "August 3, 2025",
    topic: "AI in Martian Rovers",
    description:
      "A deep dive into the AI systems used in Mars missions, featuring behind-the-scenes of rover engineering.",
    image: "https://via.placeholder.com/400x250?text=Karim+Zayed",
    register: "#", // replace with registration link
  },
];

const GuestSpeakersSection = () => {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold text-white mb-4">🎙️ Guest Speakers & Webinars</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {guestSpeakers.map((speaker, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-sm"
          >
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl text-white font-bold">{speaker.topic}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {speaker.name} – <span className="italic">{speaker.title}</span>
              </p>
              <p className="text-xs text-purple-300 mb-3">{speaker.date}</p>
              <p className="text-sm text-gray-300 mb-4">{speaker.description}</p>

              {speaker.recording && (
                <a
                  href={speaker.recording}
                  target="_blank"
                  className="inline-block text-sm font-medium text-blue-400 hover:underline"
                >
                  ▶ Watch Recording
                </a>
              )}
              {speaker.register && (
                <a
                  href={speaker.register}
                  target="_blank"
                  className="inline-block text-sm font-medium text-green-400 hover:underline"
                >
                  🔗 Register Now
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GuestSpeakersSection;
