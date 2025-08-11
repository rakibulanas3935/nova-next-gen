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
                <Hero />
            </motion.div>

            <div className="py-20 relative min-h-screen overflow-hidden bg-gradient-to-b from-[#05010e] via-[#120851] to-[#05010e]">
                
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
                <Header />
            </div>

        </motion.main>
    );
}