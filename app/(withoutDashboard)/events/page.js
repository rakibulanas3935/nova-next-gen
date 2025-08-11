"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useEventContext } from "@/app/context/eventContext";
import Link from "next/link";
import CommonLoader from "@/app/components/common/CommonLoader";

const EventsPage = () => {
    const { event, eventLoading,upcomingEvent,upComingEventEventLoading } = useEventContext();
    
    // useEffect(()=>{
    //     getAllUpComingEvent(`https://nova-next-gen-server.onrender.com/api/v1/events`)
    // },[])
    if (eventLoading || upComingEventEventLoading) {
        return <CommonLoader />;
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-30 pb-20 pt-24 px-4 sm:px-6 lg:px-8 !overflow-hidden bg-[#0A0F1C]"
        >
            {/* Space & Nebula Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#05010e] via-[#120851] to-[#05010e]" />
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-700/30 rounded-full blur-[200px]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[180px]" />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[150px]" />

            <div className="max-w-5xl mx-auto space-y-14 relative z-10">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center">
                    Events & Activities
                </h1>

                <p className="text-center text-gray-300">
                    Explore what’s happening and what we’ve done.
                </p>

                {/* Upcoming Events */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Events</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {upcomingEvent?.data?.events?.map((ev, idx) => (
                            <Link href={`/events/${ev?._id}`} key={idx + 1}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white/5 h-[130px] border border-white/10 rounded-xl shadow-md overflow-hidden backdrop-blur-sm cursor-pointer"
                                >
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-white">{ev.title}</h3>
                                        <p className="text-sm text-purple-300 mt-1">
                                            {new Date(ev?.eventTime).toLocaleString("en-US", {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                            })}
                                        </p>

                                        {/* <div
                                            className="prose prose-sm prose-invert mt-3 text-gray-300 max-w-none"
                                            dangerouslySetInnerHTML={{ __html: ev.description }}
                                        /> */}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">All Events</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {event?.data?.events?.map((ev, idx) => (
                            <Link href={`/events/${ev?._id}`} key={idx + 1}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white/5 border  h-[130px]  border-white/10 rounded-xl shadow-md overflow-hidden backdrop-blur-sm cursor-pointer"
                                >
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-white">{ev.title}</h3>
                                        <p className="text-sm text-purple-300 mt-1">
                                            {new Date(ev?.eventTime).toLocaleString("en-US", {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                            })}
                                        </p>

                                        {/* <div
                                            className="prose prose-sm prose-invert mt-3 text-gray-300 max-w-none"
                                            dangerouslySetInnerHTML={{ __html: ev.description }}
                                        /> */}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </motion.section>
    );
};

export default EventsPage;
