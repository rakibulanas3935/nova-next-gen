"use client";
import React from "react";
import { motion } from "framer-motion";
import GuestSpeakersSection from "./component/GuestSpeakersSection";
import PastEventsGallery from "./component/PastEventsGallery";

const upcomingEvents = [
    {
        title: "Stargazing Night",
        date: "June 10, 2025",
        description: "Join us for a guided night of stargazing with telescopes and snacks.",
    },
    {
        title: "Planetarium Visit",
        date: "June 20, 2025",
        description: "A fun and educational visit to the National Planetarium.",
    },
    {
        title: "Space Movie Night",
        date: "June 25, 2025",
        description: "Watch 'Interstellar' under the stars on a projector screen.",
    },
];

const pastEvents = [
    {
        title: "Astro Webinar with Dr. Jahan",
        date: "May 12, 2025",
        media: "https://via.placeholder.com/400x200?text=Webinar+Recap",
    },
    {
        title: "Meteor Shower Watch",
        date: "April 28, 2025",
        media: "https://via.placeholder.com/400x200?text=Meteor+Shower+Photos",
    },
    {
        title: "Women in Space Talk",
        date: "March 8, 2025",
        media: "https://via.placeholder.com/400x200?text=Event+Recap+Video",
    },
];

const EventsPage = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="px-4 pt-20 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center">
                Events & Activities
            </h1>

            <p className="text-center text-gray-300 mt-2">
                Explore what’s happening and what we’ve done.
            </p>

            {/* Upcoming Events */}
            <section className="mt-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Events</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {upcomingEvents.map((event, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 border border-white/10 rounded-lg p-5 shadow-sm backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                            <p className="text-sm text-purple-300 mt-1">{event.date}</p>
                            <p className="text-sm text-gray-300 mt-2">{event.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            <GuestSpeakersSection />
            {/* Past Events */}
            <section className="py-16">
                <h2 className="text-2xl font-semibold text-white mb-4">Past Highlights</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {pastEvents.map((event, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-sm"
                        >
                            <img src={event.media} alt={event.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h4 className="text-white font-semibold">{event.title}</h4>
                                <p className="text-xs text-gray-400">{event.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <section className="pb-16">
                <PastEventsGallery />
            </section>
        </motion.section>
    );
};

export default EventsPage;
