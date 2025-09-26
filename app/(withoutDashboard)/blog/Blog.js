"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useBlogContext } from "@/app/context/blogContext";
import Image from "next/image";
import { Clock3 } from "lucide-react";
import Link from "next/link";
import CommonLoader from "@/app/components/common/CommonLoader";
import { useUserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/app/components/common/ConfirmModal";

const BlogCard = ({
    id,
    title,
    subtitle,
    date,
    image,
    handleClick
}) => (
    <button onClick={() => handleClick(id)}>
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
    </button>
);

const BlogNews = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { blogs, blogsLoading } = useBlogContext()
   
    const { user } = useUserContext()
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const handleClick = (id) => {
        if (!user) {
            setShowModal(true);
        } else {
            router.push(`/blog/${id}`)
        }
    };
     if (blogsLoading) {
        return <CommonLoader />
    }
    return (
        <section
            className="relative  !overflow-hidden z-20 py-24 px-4 sm:px-6 lg:px-8  text-white"
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
                                key={i + 1}
                                title={post?.title}
                                id={post?._id}
                                handleClick={handleClick}
                                // subtitle={post.excerpt}
                                date={post?.dateTime||post?.createdAt}
                                image={post?.blogImage}
                            />
                        ))}
                    </div>
                </div>

                <ConfirmModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => router.push("/join")}

                />
            </div>
        </section>
    );
};

export default BlogNews;
