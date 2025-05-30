import React from 'react';

const ProjectsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Projects</h1>
            <section className="mb-6">
                <h2 className="text-2xl font-semibold">Current Projects</h2>
                <ul className="list-disc list-inside">
                    <li>Constellation mapping</li>
                    <li>Moon diary or observing logs</li>
                    <li>Building a telescope</li>
                    <li>Astrophotography challenge</li>
                </ul>
            </section>
            <section>
                <h2 className="text-2xl font-semibold">Member Projects</h2>
                <p>Share work by members (articles, drawings, photos, models).</p>
            </section>
        </div>
    );
};

export default ProjectsPage;