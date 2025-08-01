"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useBlogContext } from "@/app/context/blogContext";
import Image from "next/image";
import { Clock3 } from "lucide-react";
import Link from "next/link";

// Blog data with images
const blogPosts = [
    {
        title: "Exploring the Moon’s Shadow: Lunar Eclipse Highlights",
        excerpt:
            "Catch the latest lunar eclipse recap and what it tells us about our moon's orbit.",
        date: "May 12, 2025",
        image: "/images/lunar-eclipse.jpg",
    },
    {
        title: "Top 5 Student Projects from Our Astronomy Club",
        excerpt:
            "We celebrate innovation with our club’s finest stargazing and astrophotography projects.",
        date: "May 22, 2025",
        image: "/images/student-projects.jpg",
    },
];

const skyEvents = [
    {
        event: "Perseid Meteor Shower",
        date: "August 12, 2025",
        description: "One of the brightest meteor showers of the year, visible globally.",
    },
    {
        event: "Total Solar Eclipse",
        date: "October 2, 2025",
        description: "Visible from South America. Use protection while viewing!",
    },
];

const spaceNews = [
    {
        title: "NASA Announces Europa Clipper Launch Schedule",
        source: "NASA",
        date: "May 25, 2025",
    },
    {
        title: "James Webb Captures Earliest Galaxies Yet",
        source: "Space.com",
        date: "May 18, 2025",
    },
];

const BlogCard = ({
    id,
    title,
    subtitle,
    date,
    image,
}) => (
    <Link href={`/blog/${id}`}>
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 cursor-pointer hover:bg-white/10 transition-all rounded-2xl border border-white/10 shadow-sm hover:shadow-lg overflow-hidden"
    >
        <div className="w-full h-48 overflow-hidden">
            <div className="relative w-full h-64 sm:h-96">
                <Image
                    src={image}
                    alt={title}
                    fill

                    placeholder="blur"
                    blurDataURL="/blur.jpg" // fallback blur
                    priority
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>



        </div>
        <div className="p-6">
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p className="text-xs flex text-gray-500 mt-4">
                <Clock3 className="w-4 h-4 mr-2" />
                {new Date(date).toLocaleString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                })}
            </p>
        </div>
    </motion.div>
    </Link>
);

const BlogNews = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { blogs } = useBlogContext()
    return (
        <section
            className="relative  !overflow-hidden z-20 py-24 px-4 sm:px-6 lg:px-8 bg-black text-white"
            onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
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
            <div className="absolute inset-0 z-0">
                {[...Array(50)].map((_, i) => (
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
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto space-y-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        Blog & Cosmic News
                    </h2>
                    <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
                        Stay updated with the latest club insights, sky events, and space missions.
                    </p>
                </motion.div>

                {/* Blog Posts */}
                <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">🌙 Recent Blog Posts</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {blogs?.data?.blogs?.map((post, i) => (
                            <BlogCard
                                key={i+1}
                                title={post?.title}
                                id={post?._id}
                                // subtitle={post.excerpt}
                                date={post?.createdAt}
                                image={post?.blogImage}
                            />
                        ))}
                    </div>
                </div>

                {/* Sky Events */}
                <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">🌌 Upcoming Sky Events</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {skyEvents.map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:shadow-md"
                            >
                                <h4 className="text-lg font-medium">{event.event}</h4>
                                <p className="text-sm text-gray-300 mt-2">{event.description}</p>
                                <p className="text-xs text-gray-500 mt-4">{event.date}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Space News */}
                <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">🚀 Space News Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {spaceNews.map((news, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:shadow-md"
                            >
                                <h4 className="text-lg font-medium">{news.title}</h4>
                                <p className="text-sm text-gray-400 mt-1">Source: {news.source}</p>
                                <p className="text-xs text-gray-500 mt-2">{news.date}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogNews;
