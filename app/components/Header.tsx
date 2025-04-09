import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    <Link href="/">Bennett Software</Link>
                </h1>
                <nav className="flex gap-4">
                    <Link href="/about" className="text-gray-700 hover:text-gray-900 transition">
                        About
                    </Link>
                    <Link href="/projects" className="text-gray-700 hover:text-gray-900 transition">
                        Projects
                    </Link>
                    <Link href="mailto:austin@thebennett.net" className="text-gray-700 hover:text-gray-900 transition">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;