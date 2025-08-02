'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {  Clock3, ArrowLeft } from 'lucide-react';
import useAxiosGet from '@/app/utils/useAxiosGet';
import Link from 'next/link';
import CommonLoader from '@/app/components/common/CommonLoader';

export default function EventDetailPage() {
  const { id } = useParams();
  const [singleEvent, getSingleEvent, loading] = useAxiosGet([]);

  useEffect(() => {
    if (id) {
      getSingleEvent(`https://nova-next-gen-server.onrender.com/api/v1/events/${id}`);
    }
  }, [id]);

  const event = singleEvent?.data?.event;

  if (loading) {
    return (
      <CommonLoader />
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-slate-300">Event not found</h2>
          <p className="text-slate-500">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-[16vh] px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="max-w-7xl mx-auto">

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Events
            </Link>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Event Image */}
            {event.poster && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                  <Image
                    src={event.poster}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Event Details */}
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Title */}
                <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                    {event.title}
                  </span>
                </h1>

                {/* Date & Time */}
                <div className="flex items-center gap-3 text-slate-400">
                  <Clock3 className="w-4 h-4 text-purple-400" />
                  {new Date(event.eventTime).toLocaleString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>

                {/* Join Link */}
                {event.meetLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href={event.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 group"
                    >
                      🔗 Join Meeting
                    </Link>
                  </motion.div>
                )}

                {/* Description */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <div
                    className="text-slate-300 leading-relaxed [&>p]:mb-4 [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>strong]:text-white [&>em]:text-blue-400"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
