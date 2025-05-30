import React from 'react';

const JoinPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Join the Club</h1>
            <p className="mb-4">We welcome all astronomy enthusiasts! Fill out the membership form below to join us.</p>
            
            <h2 className="text-2xl font-semibold mb-2">Who Can Join</h2>
            <p className="mb-4">Our club is open to anyone with an interest in astronomy, regardless of age or experience.</p>
            
            <h2 className="text-2xl font-semibold mb-2">Meeting Times and Locations</h2>
            <p className="mb-4">We meet every Saturday at 6 PM at the school auditorium. Online meetings are also held bi-weekly.</p>
            
            <h2 className="text-2xl font-semibold mb-2">Benefits of Joining</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Access to exclusive events and activities</li>
                <li>Networking with fellow astronomy enthusiasts</li>
                <li>Resources and materials for learning</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-2">Membership Form</h2>
            <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScXXXXXX/viewform?embedded=true" 
                width="100%" 
                height="600" 
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0">Loading…</iframe>
        </div>
    );
};

export default JoinPage;