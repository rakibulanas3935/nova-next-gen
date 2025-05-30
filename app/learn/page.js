import React from 'react';

const LearnPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Learn Astronomy</h1>
            <h2 className="text-xl font-semibold mt-4">Astronomy Basics for Beginners</h2>
            <p>Get started with the fundamentals of astronomy, including key concepts and terminology.</p>
            
            <h2 className="text-xl font-semibold mt-4">Recommended Apps and Tools</h2>
            <ul className="list-disc list-inside">
                <li>Stellarium</li>
                <li>Sky Guide</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-4">Book and YouTube Recommendations</h2>
            <p>Explore our curated list of books and YouTube channels to deepen your knowledge.</p>
            
            <h2 className="text-xl font-semibold mt-4">DIY Telescope Instructions</h2>
            <p>Learn how to build your own telescope with our step-by-step guide.</p>
            
            <h2 className="text-xl font-semibold mt-4">Quizzes & Fun Facts</h2>
            <p>Test your knowledge with quizzes and discover fun facts about the universe.</p>
        </div>
    );
};

export default LearnPage;