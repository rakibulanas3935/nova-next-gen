"use client";
import React from "react";
import { motion } from "framer-motion";
import GuestSpeakersSection from "./component/GuestSpeakersSection";
import PastEventsGallery from "./component/PastEventsGallery";
import { useEventContext } from "@/app/context/eventContext";
import Image from "next/image";
import Link from "next/link";
import CommonLoader from "@/app/components/common/CommonLoader";

const pastEvents = [
    {
        title: "Astro Webinar with Dr. Jahan",
        date: "May 12, 2025",
        media: "https://via.placeholder.com/400x200?text=Webinar+Recap",
    },
    {
        title: "Meteor Shower Watch",
        date: "April 28, 2025",
        media: "https://via.placeholder.com/400x200?text=Meteor+Shower+Photos",
    },
    {
        title: "Women in Space Talk",
        date: "March 8, 2025",
        media: "https://via.placeholder.com/400x200?text=Event+Recap+Video",
    },
];

const EventsPage = () => {
    const { event, eventLoading } = useEventContext()
    if (eventLoading) {
        return (
            <CommonLoader />
        );
    }
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-30 pb-20 pt-24 px-4 sm:px-6 lg:px-8 !overflow-hidden bg-[#0A0F1C]"
        >
            <div className="max-w-5xl mx-auto space-y-14">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center">
                    Events & Activities
                </h1>

                <p className="text-center text-gray-300 mt-2">
                    Explore what’s happening and what we’ve done.
                </p>

                {/* Upcoming Events */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white mb-4">All Events</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {event?.data?.events?.map((ev, idx) => (
                            <Link href={`/events/${ev?._id}`} key={idx + 1}>
                                <motion.div

                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white/5 border border-white/10 rounded-xl shadow-md overflow-hidden backdrop-blur-sm cursor-pointer"
                                >
                                    {/* Event Image using Next.js <Image /> */}
                                    {/* {ev.poster && (
                                <div className="relative w-full h-40">
                                    <Image
                                        src={ev?.poster}
                                        alt={ev?.title}
                                        height={100}
                                        width={100}
                                        className="object-cover"
                                    />
                                </div>
                            )} */}

                                    {/* Event Content */}
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-white">{ev.title}</h3>
                                        <p className="text-sm text-purple-300 mt-1">
                                            {Date(ev?.eventTime).toLocaleString("en-US", {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                            })}
                                        </p>

                                        {/* Rich Text Description */}
                                        <div
                                            className="prose prose-sm prose-invert mt-3 text-gray-300 max-w-none"
                                            dangerouslySetInnerHTML={{ __html: ev.description }}
                                        />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* <GuestSpeakersSection /> */}
                {/* Past Events */}
                {/* <section className="py-16">
                    <h2 className="text-2xl font-semibold text-white mb-4">Past Highlights</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {pastEvents.map((event, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-sm"
                            >
                                <img src={event.media} alt={event.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h4 className="text-white font-semibold">{event.title}</h4>
                                    <p className="text-xs text-gray-400">{event.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section> */}
                {/* <section className="pb-16">
                    <PastEventsGallery />
                </section> */}
            </div>
        </motion.section>
    );
};

export default EventsPage;
