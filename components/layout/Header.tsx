'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

type Project = {
  id: string;
  title: string;
  slug: string;
  status: string;
};

type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const projectsDropdownRef = useRef<HTMLDivElement>(null);
  const newsDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fetch projects and news
  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsResponse, newsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/news')
        ]);
        
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData);
        }
        
        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          setNews(newsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Close all dropdowns
  const closeAllDropdowns = useCallback(() => {
    setProjectsDropdownOpen(false);
    setNewsDropdownOpen(false);
    setAboutDropdownOpen(false);
  }, []);

  // Handle click outside and Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (projectsDropdownRef.current && !projectsDropdownRef.current.contains(event.target as Node)) {
        setProjectsDropdownOpen(false);
      }
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(event.target as Node)) {
        setNewsDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeAllDropdowns();
        setMobileMenuOpen(false);
        setMobileProjectsOpen(false);
        setMobileNewsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [closeAllDropdowns]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about', hasDropdown: true, type: 'about' },
    { name: 'Projects', href: '/projects', hasDropdown: true, type: 'projects' },
    { name: 'News', href: '/news', hasDropdown: true, type: 'news' },
    { name: 'Mariphil Children\'s Village', href: '/children-village' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 glass-effect">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/mariphil-logo.png"
              alt="Mariphil Foundation Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900">Mariphil</span>
              <span className="text-xs text-gray-600">Foundation Inc.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.hasDropdown && item.type === 'about' ? (
                <div key={item.name} className="relative" ref={aboutDropdownRef}>
                  <div
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    className="flex items-center"
                  >
                    <Link
                      href={item.href}
                      className={`font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-primary'
                          : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      className="ml-1 text-gray-700 hover:text-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="Toggle about dropdown"
                      aria-expanded={aboutDropdownOpen}
                      aria-haspopup="true"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          aboutDropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* About Dropdown Menu */}
                  {aboutDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      onMouseLeave={() => setAboutDropdownOpen(false)}
                    >
                      <Link
                        href="/about#objectives-mission"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-150"
                        onClick={() => setAboutDropdownOpen(false)}
                      >
                        Objectives & Mission
                      </Link>
                      <Link
                        href="/about#history"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-150"
                        onClick={() => setAboutDropdownOpen(false)}
                      >
                        Our History
                      </Link>
                      <Link
                        href="/about#board"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-150"
                        onClick={() => setAboutDropdownOpen(false)}
                      >
                        Board of Directors
                      </Link>
                    </div>
                  )}
                </div>
              ) : item.hasDropdown && item.type === 'projects' ? (
                <div key={item.name} className="relative" ref={projectsDropdownRef}>
                  <div
                    onMouseEnter={() => setProjectsDropdownOpen(true)}
                    className="flex items-center"
                  >
                    <Link
                      href={item.href}
                      className={`font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-primary'
                          : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => setProjectsDropdownOpen(!projectsDropdownOpen)}
                      className="ml-1 text-gray-700 hover:text-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="Toggle projects dropdown"
                      aria-expanded={projectsDropdownOpen}
                      aria-haspopup="true"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          projectsDropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {projectsDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      onMouseLeave={() => setProjectsDropdownOpen(false)}
                    >
                      {projects.length > 0 ? (
                        projects.map((project) => (
                          <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-150"
                            onClick={() => setProjectsDropdownOpen(false)}
                          >
                            {project.title}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500 italic">
                          No projects available
                        </div>
                      )}
                      <div className="border-t border-gray-100 my-2"></div>
                      <Link
                        href="/children-village"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-150 font-medium"
                        onClick={() => setProjectsDropdownOpen(false)}
                      >
                        MARIPHIL Children&apos;s Village
                      </Link>
                    </div>
                  )}
                </div>
              ) : item.hasDropdown && item.type === 'news' ? (
                <div key={item.name} className="relative" ref={newsDropdownRef}>
                  <div
                    onMouseEnter={() => setNewsDropdownOpen(true)}
                    className="flex items-center"
                  >
                    <Link
                      href={item.href}
                      className={`font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-primary'
                          : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => setNewsDropdownOpen(!newsDropdownOpen)}
                      className="ml-1 text-gray-700 hover:text-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="Toggle news dropdown"
                      aria-expanded={newsDropdownOpen}
                      aria-haspopup="true"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          newsDropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* News Dropdown Menu */}
                  {newsDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      onMouseLeave={() => setNewsDropdownOpen(false)}
                    >
                      {news.length > 0 ? (
                        news.map((article) => (
                          <Link
                            key={article.id}
                            href={`/news/${article.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-150"
                            onClick={() => setNewsDropdownOpen(false)}
                          >
                            {article.title}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500 italic">
                          No news available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link href="/donate" className="btn-primary">
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-150"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle main menu"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                item.hasDropdown && item.type === 'about' ? (
                  <div key={item.name}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={`flex-1 font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-primary bg-primary/10 border-l-4 border-primary'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                        className="px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-150"
                        aria-label="Toggle about menu"
                        aria-expanded={mobileAboutOpen}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileAboutOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {mobileAboutOpen && (
                      <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-top-1 duration-150">
                        <Link
                          href="/about#objectives-mission"
                          className="block py-2 px-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileAboutOpen(false);
                          }}
                        >
                          Objectives & Mission
                        </Link>
                        <Link
                          href="/about#history"
                          className="block py-2 px-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileAboutOpen(false);
                          }}
                        >
                          Our History
                        </Link>
                        <Link
                          href="/about#board"
                          className="block py-2 px-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileAboutOpen(false);
                          }}
                        >
                          Board of Directors
                        </Link>
                      </div>
                    )}
                  </div>
                ) : item.hasDropdown && item.type === 'projects' ? (
                  <div key={item.name}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={`flex-1 font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-primary bg-primary/10 border-l-4 border-primary'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                        className="px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-150"
                        aria-label="Toggle projects menu"
                        aria-expanded={mobileProjectsOpen}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileProjectsOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {mobileProjectsOpen && (
                      <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-top-1 duration-150">
                        {projects.length > 0 ? (
                          projects.map((project) => (
                            <Link
                              key={project.id}
                              href={`/projects/${project.slug}`}
                              className="block py-2 px-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileProjectsOpen(false);
                              }}
                            >
                              {project.title}
                            </Link>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-500 italic">
                            No projects available
                          </div>
                        )}
                        <div className="border-t border-gray-200 my-2"></div>
                        <Link
                          href="/children-village"
                          className="block py-2 px-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-colors duration-150"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProjectsOpen(false);
                          }}
                        >
                          MARIPHIL Children&apos;s Village
                        </Link>
                      </div>
                    )}
                  </div>
                ) : item.hasDropdown && item.type === 'news' ? (
                  <div key={item.name}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={`flex-1 font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-primary bg-primary/10 border-l-4 border-primary'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => setMobileNewsOpen(!mobileNewsOpen)}
                        className="px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-150"
                        aria-label="Toggle news menu"
                        aria-expanded={mobileNewsOpen}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileNewsOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {mobileNewsOpen && (
                      <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-top-1 duration-150">
                        {news.length > 0 ? (
                          news.map((article) => (
                            <Link
                              key={article.id}
                              href={`/news/${article.slug}`}
                              className="block py-2 px-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-150"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileNewsOpen(false);
                              }}
                            >
                              {article.title}
                            </Link>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-500 italic">
                            No news available
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10 border-l-4 border-primary'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                href="/donate"
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
