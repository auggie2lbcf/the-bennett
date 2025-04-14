import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';

interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    techStack: string[];
    liveUrl?: string;
    repoUrl?: string;
}

const projectsData: Project[] = [
    {
        id: 1,
        title: 'The Vine Coffeehouse & Bakery',
        description: 'A modern website for a local coffeehouse and bakery, featuring an elegant design to showcase their menu and offerings. The site is integrated with a backend system that allows the client to manage Square orders seamlessly, ensuring efficient order processing and customer satisfaction.',
        imageUrl: '/images/thevine.png',
        techStack: ['Next.js', 'React', 'Custom Emails', 'Square API'],
        liveUrl: 'https://itsthevine.com',
    },
    // {
    //     id: 2,
    //     title: 'Covenant Community Church',
    //     description: 'A clean and responsive website for a community church, designed to provide easy access to sermons, events, and contact information. The site emphasizes simplicity and usability to engage visitors effectively.',
    //     imageUrl: '/images/covenant.png',
    //     techStack: ['HTML', 'CSS', 'JavaScript', 'Custom Emails'],
    //     liveUrl: 'https://covenantcommunity.org',
    // },
];


// --- Reusable Project Card Component ---
// (Often good practice to move this to its own file, e.g., components/ProjectCard.tsx)
interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
            
            <div className="p-6 flex flex-col flex-grow"> {/* Text content area */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{project.description}</p> {/* flex-grow makes description take available space */}

            {/* Technology Stack */}
            <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                    <span key={tech} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {tech}
                    </span>
                ))}
                </div>
            </div>

            {/* Links */}
            <div className="mt-auto pt-4 border-t border-gray-200 flex gap-4"> {/* mt-auto pushes links to bottom */}
                {project.liveUrl && project.liveUrl !== '#' && (
                <a
                    href={project.liveUrl}
                    target="_blank" // Open in new tab
                    rel="noopener noreferrer" // Security best practice for target="_blank"
                    className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                >
                    View Live Site →
                </a>
                )}
                {project.repoUrl && project.repoUrl !== '#' && (
                <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-medium transition duration-200"
                >
                    View Code {/* Or GitHub Icon */}
                </a>
                )}
            </div>
            </div>
        </div>
    );
};


// --- Projects Page Component ---
const ProjectsPage: React.FC = () => {
    return (
        <>
            <Header />
            <main className="min-h-screen p-8 md:p-16 bg-gray-100">
                <div className="max-w-6xl mx-auto"> {/* Centered container */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
                        My Work & Case Studies
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
                        Here are some examples of websites I've built, focusing on solving real problems for businesses like yours.
                    </p>

                    {/* Grid for Project Cards */}
                    {projectsData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {projectsData.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No projects to display yet. Check back soon!</p>
                    )}
                </div>
            </main>
        </>
    );
};

export default ProjectsPage;