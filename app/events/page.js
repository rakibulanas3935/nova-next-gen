import React from 'react';

const EventsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Events & Activities</h1>
            <section>
                <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Stargazing Night - Date & Time</li>
                    <li>Planetarium Visit - Date & Time</li>
                    <li>Guest Speaker Webinar - Date & Time</li>
                    <li>Space Movie Night - Date & Time</li>
                </ul>
            </section>
            <section>
                <h2 className="text-2xl font-semibold">Past Events</h2>
                <ul className="list-disc list-inside">
                    <li>Photos, videos, and recaps of past events</li>
                </ul>
            </section>
        </div>
    );
};

export default EventsPage;