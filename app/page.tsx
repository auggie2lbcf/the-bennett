"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink, Github, Mail, MapPin, Code, Palette, Zap, Users, ChevronDown, Menu, X, Star, Coffee, Radio, Database, Headphones, Shield } from 'lucide-react';

const PremiumPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'The Vine Coffeehouse & Bakery',
      description: 'A modern website for a local coffeehouse and bakery, featuring an elegant design to showcase their menu and offerings. The site is integrated with a backend system that allows the client to manage Square orders seamlessly.',
      image: '/api/placeholder/600/400',
      icon: <Coffee className="w-6 h-6" />,
      techStack: ['Next.js', 'React', 'Square API', 'Custom Emails'],
      liveUrl: 'https://itsthevine.com',
      githubUrl: 'https://github.com/auggie2lbcf/itsthevine',
      category: 'E-commerce',
      year: '2024',
      featured: true
    },
    {
      id: 2,
      title: 'PulpitStream',
      description: 'A comprehensive streaming platform for churches and religious organizations. Features real-time sermon streaming, archived content management, and interactive community features. Built with modern TypeScript architecture for scalability and reliability.',
      image: '/api/placeholder/600/400',
      icon: <Radio className="w-6 h-6" />,
      techStack: ['TypeScript', 'Node.js', 'WebRTC', 'PostgreSQL', 'Redis'],
      liveUrl: 'https://pulpitstream.com',
      githubUrl: 'https://github.com/auggie2lbcf/pulpitstream',
      category: 'Streaming Platform',
      year: '2025',
      featured: true
    },
    {
      id: 3,
      title: 'Confessions of Grace',
      description: 'A sophisticated theology blog platform with advanced content management, user authentication, and discussion forums. Features markdown support, categorized content, and responsive design optimized for reading.',
      image: '/api/placeholder/600/400',
      icon: <Users className="w-6 h-6" />,
      techStack: ['TypeScript', 'Next.js', 'MongoDB', 'Tailwind CSS'],
      liveUrl: 'https://confessionsofgrace.com',
      githubUrl: 'https://github.com/auggie2lbcf/confessions-of-grace',
      category: 'Content Platform',
      year: '2025',
      featured: true
    },
    {
      id: 4,
      title: 'Barista Display System',
      description: 'An intelligent point-of-sale display system for coffee shops. Features real-time order management, custom drink configurations, and seamless integration with existing POS systems. Optimized for high-volume environments.',
      image: '/api/placeholder/600/400',
      icon: <Database className="w-6 h-6" />,
      techStack: ['JavaScript', 'Node.js', 'Socket.io', 'Express', 'SQLite'],
      liveUrl: '#',
      githubUrl: 'https://github.com/auggie2lbcf/barista-display',
      category: 'POS System',
      year: '2025',
      featured: true
    },
    {
      id: 5,
      title: 'Podcast RSS Generator',
      description: 'A npm package that simplifies the creation of podcast RSS feeds. Features customizable templates, automatic episode management, and integration with popular podcast platforms. Ideal for independent podcasters looking to streamline their workflow.',
      image: '/api/placeholder/600/400',
      icon: <Headphones className="w-6 h-6" />,
      techStack: ['JavaScript', 'Node.js', 'XML', 'AWS S3', 'Webhooks'],
      liveUrl: 'https://www.npmjs.com/package/podcast-rss-generator',
      githubUrl: 'https://github.com/auggie2lbcf/podcast-rss-generator',
      category: 'Media Tool',
      year: '2025',
      featured: false
    },
    {
      id: 6,
      title: 'Rust P2P Blockchain',
      description: 'A high-performance peer-to-peer blockchain implementation built in Rust. Features custom consensus algorithms, encrypted transactions, and distributed network architecture. Demonstrates advanced systems programming skills.',
      image: '/api/placeholder/600/400',
      icon: <Shield className="w-6 h-6" />,
      techStack: ['Rust', 'Cryptography', 'Networking', 'Consensus Algorithms'],
      liveUrl: '#',
      githubUrl: 'https://github.com/auggie2lbcf/rust-p2p-blockchain',
      category: 'Blockchain',
      year: '2024',
      featured: false
    },
    {
      id: 6,
      title: 'Rust Rhythm',
      description: 'A rust music player that supports various audio formats, playlists, and streaming services. Features a modern UI with real-time audio processing and customizable themes.',
      image: '/api/placeholder/600/400',
      icon: <Shield className="w-6 h-6" />,
      techStack: ['Rust', 'Audio Processing', 'WebAssembly', 'Custom UI'],
      liveUrl: '#',
      githubUrl: 'https://github.com/auggie2lbcf/rust-rhythm',
      category: 'Music Player',
      year: '2024',
      featured: true
    }
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Custom Development',
      description: 'Tailored web solutions built with modern technologies for optimal performance and user experience.'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that engage users and drive conversions for your business.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance Optimization',
      description: 'Lightning-fast websites that rank higher in search results and keep visitors engaged.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client Partnership',
      description: 'Collaborative approach ensuring your vision becomes reality with ongoing support and updates.'
    }
  ];

  const ScrollIndicator = () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
      </div>
      <ChevronDown className="w-4 h-4 mx-auto mt-2 text-white/50" />
    </div>
  );

  const ParallaxBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 100 ? 'bg-white/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bennett Software
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Projects', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative font-medium transition-all duration-300 hover:text-blue-600 ${
                    scrollY > 100 ? 'text-gray-700' : 'text-white'
                  } group`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              {['About', 'Projects', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center text-white">
        <ParallaxBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
              ✨ Available for New Projects
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Software Developement
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/80 leading-relaxed">
            Hi, I'm <span className="text-white font-semibold">Austin Bennett</span>, a software developer 
            creating exceptional digital experiences that help local businesses thrive online.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#projects"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a
              href="mailto:austin@thebennett.net"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Let's Talk
            </a>
          </div>
        </div>
        
        <ScrollIndicator />
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              What I Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive web solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="mb-6 p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-600">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real solutions for real businesses, crafted with attention to detail and performance
            </p>
          </div>
          
          <div className="space-y-12">
            {projects.filter(project => project.featured).map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                    {/* <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {project.icon}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                        {project.category} • {project.year}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        View Live Site
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 hover:-translate-y-1"
                      >
                        View Code
                        <Github className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Projects Grid */}
          <div className="mt-24">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              More Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.filter(project => !project.featured).map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    {/* <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {project.icon}
                      </div>
                      <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {project.title}
                    </h4>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                        >
                          Live Site
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200"
                        >
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                About Austin
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  I'm a passionate software developer with a focus on creating exceptional web experiences 
                  for small and local businesses. With years of experience in modern web technologies, 
                  I understand what it takes to build websites that not only look great but perform exceptionally.
                </p>
                <p>
                  My approach combines technical expertise with business understanding, ensuring every project 
                  delivers real value. From initial concept to ongoing maintenance, I partner with clients 
                  to bring their digital vision to life.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or helping other developers in the community.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                    AB
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Austin Bennett</h3>
                  <p className="text-gray-600 mb-4">Full-Stack Developer</p>
                  <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
                    <MapPin className="w-4 h-4" />
                    <span>Available Worldwide</span>
                  </div>
                  <a
                    href="mailto:austin@thebennett.net"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <Mail className="w-4 h-4" />
                    Get In Touch
                  </a>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together. 
            I'm here to help bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:austin@thebennett.net"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </a>
            
            <a
              href="https://github.com/auggie2lbcf"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 flex items-center gap-2"
            >
              View More Work
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-0">
              Bennett Software
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 Bennett Software. All rights reserved.</p>
              <p className="mt-2">Crafted with passion and precision.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPortfolio;