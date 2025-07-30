"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Timeline from "./component/Timeline";

const facts = [
    "Founded by Carlos Sarkis in 2019 after meeting Buzz Aldrin.",
    "AI meets astronomy: from exoplanets to wormholes.",
    "Expanding beyond Franklin to global student explorers.",
    "Skywatching, coding, and space science for all.",
];

const AboutUs = () => {
    const [factIndex, setFactIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
            className="relative z-30 pb-20 pt-24 px-4 sm:px-6 lg:px-8 !overflow-hidden bg-[#0A0F1C]"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.1),transparent)] pointer-events-none" />

            <motion.div
                className="absolute w-32 h-32 !overflow-x-hidden rounded-full opacity-20"
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
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto w-fit bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full shadow-md backdrop-blur"
                >
                    Empowering Student Innovators 🚀
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                >
                    About Us
                </motion.h1>

                <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto">
                    Learn more about our mission, goals, and story.
                </p>

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

                <div className="grid gap-8 md:grid-cols-1">
                    {[
                        {
                            title: "About Carlos Sarkis",
                            content:
                                (
                                    <p>
                                        Hello, I’m Carlos Sarkis — and I was starstruck. Literally. <br /> <br />
                                        It all started when I met Buzz Aldrin in 2019, at the 50th anniversary of the Moon landing. I was 11, wide-eyed and overwhelmed. But it wasn't just about shaking hands with a hero of space history — it was about realizing how much more was out there, waiting to be explored. <br /><br />
                                        Even before that, I had already begun falling in love with the universe. I spent countless hours devouring books by Stephen Hawking — A Brief History of Time, The Universe in a Nutshell, The Grand Design. Hawking didn’t just explain space; he made it feel personal. <br /><br />
                                        Since then, I’ve been on a mission — not to the Moon (yet), but to understand the cosmos. <br /><br />
                                        In summer 2024, I attended an advanced astronomy course at Stanford University, where I studied stellar evolution, planetary formation, and the large-scale structure of the universe, guided by top faculty and surrounded by brilliant peers from across the globe. <br /><br />
                                        Later that year, I was selected for the Inspirit AI Scholars program, taught by Stanford and MIT researchers. My capstone project focused on using machine learning to detect exoplanets — training an AI to recognize how a planet dims a star’s light as it passes in front of it. That experience opened my eyes to how artificial intelligence is transforming the frontiers of space science. <br /><br />
                                        This summer, I’ll continue that journey by working under the mentorship of Professor Romain Teyssier, a leading expert in computational astrophysics at Princeton University. <br />
                                        But somewhere along the way, I realized something important:
                                        I didn’t want to explore the universe alone. <br />
                                        That’s why I founded NovaNextGen.
                                    </p>
                                )
                        },
                        {
                            title: "Why I Started the Club",
                            content:
                                (
                                    <p>
                                        As my fascination with astronomy grew, I started noticing something surprising: many of my friends were just as curious — but didn’t know where to start. They hadn’t read Hawking, or watched rocket launches, or stayed up late wondering how black holes bend time. Not because they didn’t care — but because no one had ever invited them into that world. <br /><br />
                                        There were no clubs where we could talk about space, no real access to advanced science, no one to help connect questions to real research. <br /><br />
                                        So I built what I wished had existed: a community. <br />
                                        NovaNextGen began as a small group of classmates at Saint Louis de Gonzague – Franklin, gathering to ask big questions and explore the cosmos together. We hosted talks, trivia nights, telescope sessions, and speaker events. We welcomed anyone who had ever looked up at the stars and wondered.
                                        And it worked. <br /><br />
                                        What began as a school initiative soon grew into something much larger — a platform now connecting students across schools, cities, and countries. We all share one belief: <br />
                                        that the universe belongs to anyone bold enough to ask questions.
                                        This isn’t just a club. <br />
                                        It’s a launchpad.

                                    </p>
                                ),
                        },
                        {
                            title: "About NovaNextGen",
                            content:
                                (
                                    <p>
                                        NovaNextGen was born in the halls of Saint Louis de Gonzague – Franklin, but it quickly grew beyond them. What started as a small group of students gazing up at the night sky has become a fast-growing platform for young people passionate about space, science, and shaping the future of exploration.
                                        <br /> <br />
                                        We believe the next generation of scientists, engineers, and innovators is already here — they just need the spark.
                                        <br /> <br />
                                        At NovaNextGen, we create that spark through hands-on learning, collaboration, and exposure to real-world science. Our community includes both complete beginners and experienced student researchers, all united by curiosity and the thrill of discovery.
                                        <br />
                                        Here’s what we do:
                                        <br /><br />
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            <li>🔭Host telescope nights and skywatching events</li>
                                            <li>🌌 Explore deep space topics like black holes, exoplanets, and cosmology</li>
                                            <li>🤖 Run AI-based astrophysics workshops, including projects using NASA data to detect exoplanets via machine learning — like the one I developed through Inspirit AI</li>
                                            <li>🪐 Invite scientists, researchers, and space entrepreneurs to speak and mentor</li>
                                            <li>🌍 Build partnerships and friendships across schools, countries, and backgrounds</li>
                                        </ul>
                                        <br /><br />
                                        NovaNextGen is about more than learning — it's about participating.
                                        We’re not waiting to be inspired.
                                        <br /> <br />
                                        We’re becoming the explorers, coders, and creators of the future — right now.
                                        <br /> <br />
                                        Whether you're dreaming of Mars, simulating wormholes, coding AI models, or just learning what a nebula is — you belong at NovaNextGen.
                                    </p>
                                )

                        },
                        {
                            title: "About Our School",
                            content:
                                (
                                    <p>
                                        Saint Louis de Gonzague – Franklin is one of France’s most prestigious secondary schools, renowned for academic excellence, Jesuit values, and a strong culture of leadership and service. Located in Paris, it challenges students to think beyond themselves and act for the common good.
                                        <br /> <br />
                                        As a student at Franklin, I’ve been fortunate to learn in an environment that rewards curiosity, values integrity, and encourages bold thinking. It’s where I first imagined what NovaNextGen could be — and where I found the support to bring it to life.
                                        <br /> <br />
                                        With the help of friends, mentors, and teachers, we turned our curiosity into action.
                                        But the wonder of the cosmos can’t be contained by any one school.
                                        <br /> <br />Today, NovaNextGen is expanding well beyond Franklin, welcoming students from many other schools and regions. While we remain proud of our roots, we’re even prouder of how far we’ve come — and how far we still aim to go.
                                    </p>
                                )
                        },
                        {
                            title: "Our Goals & Values",
                            content: (
                                <p>
                                    At NovaNextGen, we believe science is for everyone — and that the future of exploration must reflect the diversity, imagination, and drive of the next generation.
                                    <br />

                                    These are the values that guide everything we do:
                                    <br />
                                    <br />
                                    🌐 Open Access to Knowledge <br />
                                    We break down barriers to science. Every student deserves access to advanced learning — whether they're analyzing light curves, writing code, or just beginning to ask big questions.
                                    <br />
                                    🤝 Support Innovation and Collaboration
                                    <br />
                                    We celebrate experimentation and bold ideas. From AI labs to group stargazing, we create hands-on spaces where students build, code, explore, and discover together.
                                    <br />
                                    🌍 Promote Diversity, Equity & Inclusion
                                    <br />
                                    NovaNextGen welcomes students of all identities, backgrounds, and perspectives. Because the universe is vast — and so are the viewpoints we need to understand it.
                                    <br />
                                    💡 Give Back Through Meaningful Work <br />
                                    We believe knowledge should serve a greater good. Whether by mentoring others, sharing resources, or working on public science projects, we aim to make an impact beyond ourselves.
                                    <br />
                                    🚀 Lead with Curiosity and Courage <br /> <br />
                                    Leadership starts by asking questions — especially the difficult ones. We empower students to take initiative, challenge ideas, and lead with purpose, not perfection.


                                </p>
                            ),
                        },
                    ].map((section, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-white/5 border border-white/10 cursor-pointer rounded-xl p-6 shadow-md backdrop-blur-md"
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {section.title}
                            </h2>
                            <div className="text-gray-300 text-sm">{section.content}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default AboutUs;
