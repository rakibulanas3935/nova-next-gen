import React from 'react';

const BlogPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Blog / News</h1>
            <p className="mb-4">Welcome to our blog! Here you'll find the latest updates, articles, and news related to our astronomy club.</p>
            <div className="space-y-4">
                {/* Example Blog Post */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-semibold">Upcoming Stargazing Event</h2>
                    <p className="text-gray-600">Join us for a night under the stars on March 15th! We'll be meeting at the school parking lot at 7 PM.</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-2xl font-semibold">NASA's Latest Discoveries</h2>
                    <p className="text-gray-600">Stay updated with the latest discoveries from NASA and how they impact our understanding of the universe.</p>
                </div>
                {/* Add more blog posts as needed */}
            </div>
        </div>
    );
};

export default BlogPage;