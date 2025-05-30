"use client";
import { motion } from "framer-motion";

const joinData = [
  {
    title: "Who Can Join?",
    description:
      "NovaNextGen welcomes all space enthusiasts! Ideal for ages 13+, especially those curious about astronomy, physics, or technology.",
  },
  {
    title: "Meeting Times & Locations",
    description:
      "We meet every Saturday at 7PM online via Zoom, and monthly at the local planetarium. Hybrid options are available for remote members.",
  },
  {
    title: "Benefits of Joining",
    description:
      "• Access to telescope sessions\n• Join real space projects\n• Learn from experts\n• Get featured in our blog\n• Participate in astrophotography, movie nights, and webinars!",
  },
];

const JoinPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 px-6 sm:px-10 bg-black text-white"
    >
      <div className="max-w-5xl mx-auto space-y-14">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
        >
          Join NovaNextGen Club
        </motion.h1>

        {joinData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
          >
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
              {item.title}
            </h2>
            <p className="mt-2 whitespace-pre-line text-gray-300">{item.description}</p>
          </motion.div>
        ))}

        {/* Membership Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
        >
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
            Membership Form
          </h2>
          <p className="mt-2 text-gray-300 mb-4">
            Fill out this form to officially join our community.
          </p>

          {/* Replace the src URL with your actual Google Form embed URL */}
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-white/10">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeYourFormLinkHere/viewform?embedded=true"
              width="100%"
              height="100%"
              frameBorder="0"
              className="w-full h-full"
              loading="lazy"
              title="Membership Form"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JoinPage;
