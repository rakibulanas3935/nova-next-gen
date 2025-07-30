"use client";
import React from "react";
import { motion } from "framer-motion";

const pastEvents = [
  {
    title: "Stargazing Night – March 2025",
    media: "https://via.placeholder.com/400x250?text=Stargazing+Night",
    type: "image",
    summary: "An unforgettable night under the stars. Students got to view Saturn's rings and the Orion Nebula using our club telescope.",
  },
  {
    title: "Guest Webinar: Space AI",
    media: "https://www.youtube.com/embed/zr0ciJ8z1TM", // Replace with actual video URL
    type: "video",
    summary: "Prof. A. Rahman shared insights on how AI is transforming planetary exploration and autonomous spacecraft.",
  },
  {
    title: "Planetarium Visit – Feb 2025",
    media: "https://via.placeholder.com/400x250?text=Planetarium+Visit",
    type: "image",
    summary: "A guided journey through galaxies at the Dhaka Planetarium. Students explored cosmic structures and virtual spacewalks.",
  },
];

const PastEventsGallery = () => {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold text-white mb-6">📚 Past Event Highlights</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {pastEvents.map((event, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-md backdrop-blur-sm"
          >
            {event.type === "image" ? (
              <img
                src={event.media}
                alt={event.title}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={event.media}
                  title={event.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg text-white font-semibold mb-1">{event.title}</h3>
              <p className="text-sm text-gray-300">{event.summary}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PastEventsGallery;
