"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGalleryContext } from "@/app/context/galleryContext";
import Image from "next/image";
import CommonLoader from "@/app/components/common/CommonLoader";

const Gallery = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const { gallery,galleryLoading } = useGalleryContext()
    if(galleryLoading){
        return <CommonLoader/>
    }
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-40 pt-20 pb-10 sm:pt-24 sm:pb-10"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"

                    >
                        Gallery
                    </motion.h2>


                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-center text-lg text-gray-300 max-w-2xl mx-auto"
                    >
                        Explore moments we've captured—from events to creative showcases.
                    </motion.p>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {gallery?.data?.images?.map((src, index) => (
                            <motion.div
                                key={index + 1}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="relative cursor-pointer overflow-hidden rounded-xl shadow-md border border-white/10 bg-white/5 backdrop-blur-sm"
                            >
                                <Image
                                    src={src}
                                    alt={`Gallery image ${index + 1}`}
                                    width={400}
                                    height={240}
                                    className="w-full h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </motion.div>
                        ))}

                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Gallery;
