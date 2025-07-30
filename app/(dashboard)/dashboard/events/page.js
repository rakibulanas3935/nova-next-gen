'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash, Eye, Plus } from 'lucide-react';

const mockEvents = [
  {
    id: 1,
    title: 'AI for Everyone',
    eventTime: '2025-08-01T19:00',
    meetLink: 'https://meet.google.com/ai-event',
  },
  {
    id: 2,
    title: 'Next.js 15 Workshop',
    eventTime: '2025-08-10T17:30',
    meetLink: 'https://zoom.us/nextjs15',
  },
];

export default function EventPage() {
  const [events, setEvents] = useState(mockEvents);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Events</h1>
          <Link
            href="/dashboard/events/create"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <Plus className="w-4 h-4" /> Create Event
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/10 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Time</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Meeting Link</th>
                <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-white/10 transition">
                  <td className="px-6 py-4">{event.title}</td>
                  <td className="px-6 py-4">{new Date(event.eventTime).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <a href={event.meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                      Join Link
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <Link
                      href={`/dashboard/events/${event.id}`}
                      className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      href={`/dashboard/events/${event.id}/edit`}
                      className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-md p-2"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-6 text-center text-gray-400">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
