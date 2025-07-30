"use client"
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import EventCountdown from './EventCountdown'
import Header from '../common/Header'

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    

    return (
        <div className="relative lg:h-[110vh] overflow-hidden bg-[#0A0F1C]">
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

            <motion.div
                className="absolute w-20 h-20 rounded-full opacity-20"
                animate={{
                    x: mousePosition.x * 0.05,
                    y: mousePosition.y * 0.05,
                }}
                style={{
                    background: 'radial-gradient(circle, rgba(147,51,234,1) 0%, rgba(79,70,229,0) 70%)',
                    top: '20%',
                    right: '20%',
                }}
            />
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

            {/* Scroll indicator */}
            <motion.div
                className="absolute hidden md:block cursor-pointer bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2" />
                </div>
            </motion.div>
            <motion.div
                className="absolute hidden md:block right-[10%] top-[15%] w-[270px] h-[270px] rounded-full"
                style={{
                    // y: moonY,
                    background: 'radial-gradient(circle at 70% 70%, #FFFFFF, #DFDFDF)',
                    boxShadow: 'inset -25px -25px 40px rgba(0,0,0,0.3)',
                }}
                 animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                {/* Moon craters */}
                <div className="absolute top-[30%] left-[20%] w-[40px] h-[40px] rounded-full bg-[rgba(0,0,0,0.1)]" />
                <div className="absolute top-[50%] left-[50%] w-[30px] h-[30px] rounded-full bg-[rgba(0,0,0,0.1)]" />
                <div className="absolute top-[20%] right-[30%] w-[25px] h-[25px] rounded-full bg-[rgba(0,0,0,0.1)]" />
            </motion.div>

            {/* Main content */}
            <div className="relative pt-[10vh] z-10 flex flex-col items-center justify-center min-h-screen px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        Explore the Cosmos
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join our community of stargazers and embark on a journey through the wonders of the universe.
                    </p>

                    <EventCountdown
                        eventDate="2024-04-08T18:00:00"
                        eventName="Next Solar Eclipse"
                    />

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8"
                    >
                        <Link href="/join" className="inline-block">
                            <button className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full overflow-hidden">
                                <span className="relative z-10">Start Your Journey</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

        </div>
    )
}

export default Hero