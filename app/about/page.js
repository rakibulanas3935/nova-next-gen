"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Timeline from "./component/Timeline";

const facts = [
    "Founded in 2023 with 10 members.",
    "Cross-disciplinary collaboration encouraged.",
    "Over 30 successful events hosted.",
    "Open to students from other universities.",
];

const AboutUs = () => {
    const [factIndex, setFactIndex] = useState(0);
     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const interval = setInterval(() => {
            setFactIndex((prev) => (prev + 1) % facts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-30 pt-24 px-4 sm:px-6 lg:px-8"
        >
            {/* Soft background light effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.1),transparent)] pointer-events-none" />

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
            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
                {/* Section Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto w-fit bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full shadow-md backdrop-blur"
                >
                    Empowering Student Innovators 🚀
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                >
                    About Us
                </motion.h1>

                {/* Subtitle */}
                <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto">
                    Learn more about our mission, goals, and story.
                </p>

                {/* Rotating Fact */}
                <div className="flex justify-center">
                    <motion.div
                        key={factIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/10 text-white text-sm px-4 py-2 rounded-full backdrop-blur-lg border border-white/10 shadow-sm"
                    >
                        💡 {facts[factIndex]}
                    </motion.div>
                </div>

                {/* About Cards */}
                <div className="grid gap-8 md:grid-cols-2">
                    {[
                        {
                            title: "Who We Are",
                            content:
                                "A group of students united by creativity, innovation, and a passion for learning. We work on real-world projects and empower each other through collaboration.",
                        },
                        {
                            title: "Why We Started",
                            content:
                                "We saw the need for a space to share ideas, work on passion projects, and create community beyond the classroom. That vision became our club.",
                        },
                        {
                            title: "Goals & Values",
                            content: (
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                    <li>Open access to knowledge</li>
                                    <li>Support innovation and collaboration</li>
                                    <li>Promote diversity and equity</li>
                                    <li>Give back through meaningful work</li>
                                </ul>
                            ),
                        },
                        {
                            title: "About Our School",
                            content:
                                "Based at Daffodil International University, we welcome students from all departments—and even from other institutions. Learning has no walls here.",
                        },
                    ].map((section, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-md backdrop-blur-md"
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {section.title}
                            </h2>
                            <div className="text-gray-300 text-sm">{section.content}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Timeline Section */}
                <Timeline />
            </div>
        </motion.section>
    );
};

export default AboutUs;
