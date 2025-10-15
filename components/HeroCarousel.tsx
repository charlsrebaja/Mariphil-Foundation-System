"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const slides = [
  {
    title: "Mariphil Children's Village",
    description:
      "A loving home providing care, education, and hope for children in need. Located in Purok Takway, Barangay Nanyo, Panabo, Philippines.",
    image: "/images/mariphil-village.jpg",
    primaryButton: { text: "Learn More", href: "/children-village" },
    secondaryButton: { text: "Donate Now", href: "/donate" },
  },
  {
    title: "Transforming Lives, Building Hope",
    description:
      "Supporting children and communities across the Philippines through education, healthcare, and community development programs.",
    image: "/images/hero/children-background.jpg",
    primaryButton: { text: "Donate Now", href: "/donate" },
    secondaryButton: { text: "Learn More", href: "/about" },
  },
  {
    title: "Education Changes Everything",
    description:
      "Empowering the next generation through quality education and learning opportunities for underprivileged children.",
    image: "/images/hero/education-background.jpg",
    primaryButton: { text: "View Projects", href: "/projects" },
    secondaryButton: { text: "About Us", href: "/about" },
  },
  {
    title: "Building Stronger Communities",
    description:
      "Creating sustainable change through community programs, healthcare initiatives, and children's villages across the Philippines.",
    image: "/images/hero/community-background.jpg",
    primaryButton: { text: "Our Projects", href: "/projects" },
    secondaryButton: { text: "Contact Us", href: "/contact" },
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Removed automatic slide rotation - users control slides manually

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content with Slide-from-Left Animation */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
              <motion.div
                className="text-white max-w-3xl"
                initial={{ opacity: 0, x: -50 }}
                animate={index === currentSlide ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{
                  delay: index === 0 ? 0 : 1,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg lg:text-xl mb-6 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={slide.primaryButton.href}
                    className="btn-primary inline-block text-center"
                  >
                    {slide.primaryButton.text}
                  </Link>
                  <Link
                    href={slide.secondaryButton.href}
                    className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-lg inline-block text-center"
                  >
                    {slide.secondaryButton.text}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
