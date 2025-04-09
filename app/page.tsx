import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="text-center mb-16 sm:mb-20 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 uppercase tracking-wide text-gray-900">
            Professional Websites for Small Businesses
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed text-gray-700">
            Hi, I'm Austin Bennett, a software developer focused on helping local and small businesses succeed online with fast, reliable, and beautiful websites.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/projects" className="bg-gray-900 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-semibold border-2 border-gray-900 rounded-md hover:bg-white hover:text-gray-900 transition">
              View My Work
            </Link>
            <Link href="mailto:austin@thebennett.net" className="bg-white text-gray-900 px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-semibold border-2 border-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition">
              Email Me
            </Link>
          </div>
        </section>

        {/* Featured Project Section */}
        <section className="w-full max-w-6xl mx-auto mb-16 sm:mb-20 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 uppercase tracking-wide text-gray-900">
            Featured Project
          </h2>
          <div className="bg-white p-4 sm:p-6 md:p-8 shadow-lg rounded-lg border border-gray-200 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
                The Vine Coffeehouse & Bakery
              </h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                A modern website for a local coffeehouse and bakery, featuring an elegant design to showcase their menu and offerings. The site is integrated with a backend system that allows the client to manage Square orders seamlessly, ensuring efficient order processing and customer satisfaction.
              </p>
              <Link href="https://itsthevine.com" className="font-semibold text-gray-900 underline hover:text-gray-700 transition">
                Visit Site &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
