'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader, Clock3 } from 'lucide-react';
import useAxiosGet from '@/app/utils/useAxiosGet';

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
      <div className="min-h-screen flex justify-center items-center text-white bg-[#0A0F1C]">
        <Loader className="animate-spin w-6 h-6 mr-2" />
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-[#0A0F1C]">
        Event not found.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen pt-[14vh] bg-[#0A0F1C] px-4 sm:px-8 lg:px-24 py-16 text-white"
    >
      <div className="max-w-5xl mx-auto glassmorphism rounded-2xl overflow-hidden shadow-xl border border-white/10 backdrop-blur-md bg-white/5">
        {/* Poster */}
        {event.poster && (
          <div className="relative w-full h-64 sm:h-96">
            <Image
              src={event.poster}
              alt={event.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/blur.jpg" // fallback blur
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
            {event.title}
          </h1>

          {/* Time */}
          <div className="flex items-center text-sm text-purple-300 mb-4">
            <Clock3 className="w-4 h-4 mr-2" />
            {new Date(event.eventTime).toLocaleString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>

          {/* Meet Link */}
          <a
            href={event.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6 px-4 py-2 bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 transition rounded-md text-sm font-medium border border-purple-500/30"
          >
            🔗 Join Meeting
          </a>

          {/* Rich Text */}
          <div
            className="prose prose-invert max-w-none text-gray-300 prose-a:text-blue-400 prose-a:underline mt-4"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </div>
      </div>
    </motion.section>
  );
}
