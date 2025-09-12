"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const joinData = [
  {
    title: "Who Can Join?",
    description:
      "Deep Sky Society welcomes all space enthusiasts! Ideal for ages 13+, especially those curious about astronomy, physics, or technology.",
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
      className="relative min-h-screen py-20 px-6 sm:px-10 overflow-hidden text-white"
    >

           <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/nova_next_gen.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Space gradient background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#05010e] via-[#120851] to-[#05010e]" /> */}

      {/* Nebula glow layers */}
      {/* <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-700/30 rounded-full blur-[200px]"
        animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      /> */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[180px]"
        animate={{ x: [0, -20, 20, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[150px]"
        animate={{ x: [0, 15, -15, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
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
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto space-y-14">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
        >
          Join Deep Sky Society Club
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
            <p className="mt-2 whitespace-pre-line text-gray-300">
              {item.description}
            </p>
          </motion.div>
        ))}

        {/* Membership Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
            Membership Form
          </h2>
          <p className="mt-2 text-gray-300 mb-6">
            Fill out this form to officially join our community.
          </p>

          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfOUvKRlwcPl8G_T3n38n_hPnAI_66ICKhVjE4y9S9FZH9qaw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                   bg-gradient-to-r from-indigo-500 to-sky-500 
                   text-white font-medium shadow-md 
                   hover:shadow-lg hover:from-indigo-600 hover:to-sky-600 
                   transition-all duration-300"
          >
            Open Form
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JoinPage;
