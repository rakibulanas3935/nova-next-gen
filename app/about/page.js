import React from 'react';

const AboutPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="mb-2">Welcome to our Astronomy Club! We are passionate about exploring the wonders of the universe and sharing our love for astronomy with others.</p>
            <h2 className="text-2xl font-semibold mt-4">Our Mission</h2>
            <p className="mb-2">Our mission is to inspire curiosity and foster a community of astronomy enthusiasts. We aim to provide educational resources, organize events, and create a space for members to share their experiences and knowledge.</p>
            <h2 className="text-2xl font-semibold mt-4">Goals and Values</h2>
            <ul className="list-disc list-inside mb-2">
                <li>Promote interest in astronomy and space science.</li>
                <li>Encourage collaboration and sharing of knowledge among members.</li>
                <li>Organize engaging events and activities for all ages.</li>
                <li>Support educational initiatives related to astronomy.</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-4">About Our School</h2>
            <p>We are based at [Your School Name], and our club is open to students from other schools who share a passion for astronomy. Join us as we explore the night sky and learn more about the universe!</p>
        </div>
    );
};

export default AboutPage;