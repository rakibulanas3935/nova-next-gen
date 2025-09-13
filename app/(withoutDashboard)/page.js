"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Hero from "../components/home/Hero";
import Header from "../components/common/Header";


export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    // Smooth parallax transforms
    const headerY = useTransform(scrollYProgress, [0, 1], [0, 200]);


    return (
        <motion.main
            ref={containerRef}
            className="relative min-h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div style={{ y: headerY }}>
                <Hero title="Space Projects" description="See the cool astronomy projects we’re building to explore and understand the wonders of space."/>
            </motion.div>
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#05010e] via-[#0a041f] to-[#05010e]">
                {/* Nebula Glow */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at 70% 40%, rgba(236, 175, 21, 0.25), transparent 60%), radial-gradient(circle at 30% 70%, rgba(59,130,246,0.15), transparent 70%)",
                    }}
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />




                {/* Stars */}
                <div className="absolute inset-0">
                    {[...Array(100)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-[2px] h-[2px] bg-white rounded-full"
                            initial={{ opacity: 0.1, scale: 1 }}
                            animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.3, 1] }}
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

                {/* Content */}
                <Header />
            </div>



        </motion.main>
    );
}