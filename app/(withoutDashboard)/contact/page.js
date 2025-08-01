"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Twitter, Linkedin, Facebook } from "lucide-react";

const Contact = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    return (
        <div className=" min-h-screen overflow-hidden bg-[#0A0F1C]">
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

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-40 pt-20 pb-10 sm:pt-24 sm:pb-10"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                        {/* Background Animation */}
                        <motion.div
                            className="absolute inset-0 opacity-30"
                            animate={{
                                background: [
                                    "radial-gradient(circle at 0% 0%, #9333ea, transparent)",
                                    "radial-gradient(circle at 100% 100%, #3b82f6, transparent)",
                                    "radial-gradient(circle at 0% 0%, #9333ea, transparent)",
                                ],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />

                        <div className="relative px-6 py-8 sm:px-8 sm:py-12">
                            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                                {/* Form Section */}
                                <div className="flex flex-col justify-center space-y-6">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                                    >
                                        Get in Touch
                                    </motion.h2>
                                    <form className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none"
                                        />
                                        <textarea
                                            placeholder="Your Message"
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25"
                                        >
                                            Send Message
                                        </motion.button>
                                    </form>
                                </div>

                                {/* Contact Info + Socials */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-xl font-semibold text-white">Connect with us</h3>
                                    <div className="space-y-2 text-gray-300">
                                        <p className="flex items-center gap-2">
                                            <Mail size={18} /> support@example.com
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Mail size={18} /> feedback@example.com
                                        </p>
                                    </div>

                                    <div className="flex gap-4 mt-4">
                                        {[
                                            { icon: Twitter, href: "https://twitter.com" },
                                            { icon: Facebook, href: "https://facebook.com" },
                                            { icon: Linkedin, href: "https://linkedin.com" },
                                        ].map(({ icon: Icon, href }, index) => (
                                            <motion.a
                                                key={index}
                                                whileHover={{ scale: 1.2 }}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white hover:text-purple-400 transition"
                                            >
                                                <Icon size={24} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Contact;
