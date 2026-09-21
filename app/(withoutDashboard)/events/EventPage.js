"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock3, MapPin, Video } from "lucide-react";
import { useEventContext } from "@/app/context/eventContext";
import CommonLoader from "@/app/components/common/CommonLoader";
import { withSeedEvents } from "@/app/lib/seed-events";

const TYPE = { stargazing: "🔭 Stargazing", workshop: "🛠️ Workshop", webinar: "💻 Webinar", talk: "🎤 Talk", meetup: "🤝 Meetup", other: "✨ Event" };

const fmt = (d) =>
    new Date(d).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

function EventCard({ ev, idx, past }) {
    return (
        <Link href={`/events/${ev?.slug || ev?._id}`} key={idx + 1}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 h-full border border-white/10 rounded-xl shadow-md overflow-hidden backdrop-blur-sm cursor-pointer flex flex-col"
            >
                <div className="p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-purple-300">{TYPE[ev.type] || TYPE.other}</span>
                        {past && <span className="text-gray-500">Past</span>}
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2">{ev.title}</h3>
                    <p className="text-sm text-purple-300 mt-1 flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" /> {fmt(ev?.eventTime)}</p>
                    {(ev.location || ev.meetLink) && (
                        <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                            {ev.location ? <MapPin className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />} {ev.location || "Online"}
                        </p>
                    )}
                    {ev.excerpt && <p className="text-sm text-gray-300 mt-3 line-clamp-2">{ev.excerpt}</p>}
                </div>
            </motion.div>
        </Link>
    );
}

const EventsPage = () => {
    const { event, eventLoading, upcomingEvent, upComingEventEventLoading } = useEventContext();

    if (eventLoading || upComingEventEventLoading) {
        return <CommonLoader />;
    }

    // API events + the built-in event calendar (app/lib/seed-events.js)
    const apiEvents = [...(event?.data?.events || []), ...(upcomingEvent?.data?.events || [])];
    const upcoming = withSeedEvents(apiEvents, { scope: "upcoming" });
    const past = withSeedEvents(apiEvents, { scope: "past" });

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-30 pb-20 pt-24 px-4 sm:px-6 lg:px-8 !overflow-hidden "
        >
            <div className="max-w-6xl mx-auto space-y-6 relative z-10">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center">
                    Events & Activities
                </h1>

                <section className="mt-4">
                    <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Events</h2>
                    {upcoming.length === 0 && <p className="text-gray-400">Nothing scheduled right now — check back soon.</p>}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {upcoming.map((ev, idx) => <EventCard key={ev._id || idx} ev={ev} idx={idx} />)}
                    </div>
                </section>

                {past.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold text-white mb-4">Past Events</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {past.map((ev, idx) => <EventCard key={ev._id || idx} ev={ev} idx={idx} past />)}
                        </div>
                    </section>
                )}
            </div>
        </motion.section>
    );
};

export default EventsPage;
