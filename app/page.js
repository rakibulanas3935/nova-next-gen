"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Header from "./components/common/Header";
import Hero from "./components/home/Hero";

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    // Smooth parallax transforms
    const headerY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <motion.main
            ref={containerRef}
            className="relative min-h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div style={{ y: headerY, opacity }}>
                <Hero />
            </motion.div>

            <div className="py-20 relative min-h-screen overflow-hidden bg-[#0A0F1C]">
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
                        key={i+1}
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
                <Header />
            </div>



            {/* <motion.section 
                className="py-20 px-4 bg-gradient-to-b from-transparent to-black/40"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    style={{
                        scale: useTransform(scrollYProgress, [0, 0.5], [0.8, 1]),
                        opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 1])
                    }}
                >
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                        animate={{
                            backgroundPosition: ["0%", "100%", "0%"],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        Welcome to the Astronomy Club!
                    </motion.h2>
                    <motion.p 
                        className="text-xl md:text-2xl text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Join us in exploring the wonders of the universe.
                    </motion.p>
                </motion.div>
            </motion.section> */}
        </motion.main>
    );
}