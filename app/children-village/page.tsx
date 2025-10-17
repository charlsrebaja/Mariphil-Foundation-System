'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ChildrenVillagePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
      setIsDropdownOpen(false);
    }
  };
  
  // Gallery images organized by page
  const galleryPages: Record<number, string[]> = {
    1: [
      "/images/Children's Village Gallery/Children's Village Gallery1.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery2.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery3.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery4.jpg",
    ],
    2: [
      "/images/Children's Village Gallery/Children's Village Gallery5.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery6.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery7.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery8.jpg",
    ],
    3: [
      "/images/Children's Village Gallery/Children's Village Gallery9.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery10.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery1.jpg",
      "/images/Children's Village Gallery/Children's Village Gallery2.jpg",
    ],
  };

  const currentImages = galleryPages[currentPage] || galleryPages[1];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/children-village.jpg"
            alt="Mariphil Children's Village"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-0 left-0 z-20 text-white px-6 md:px-12 lg:px-16 pb-12 w-full flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mariphil Children&apos;s Village
            </h1>
            <p className="text-xl max-w-2xl">
              A loving home where children find safety, care, and opportunities to
              thrive
            </p>
          </div>
          
          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-white font-semibold backdrop-blur-sm"
            >
              Children&apos;s Village
              <svg
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-30">
                <button
                  onClick={scrollToGallery}
                  className="w-full text-left px-4 py-3 text-gray-900 hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  Gallery
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 text-lg mb-4">
              The MARIPHIL Children&apos;s Village &ldquo;Atong Pinuy-Anan&rdquo; Inc. (in German: Our Home) is a community project. Created in cooperation with the German association &ldquo;Hilfsprojekt MARIPHIL e.V.&rdquo;, the Philippine association &ldquo;Project MARIPHIL Foundation Inc.&rdquo;, the city of Panabo and the German Federal Ministry for Economic Cooperation and Development (BMZ).
            </p>
            <p className="text-gray-700 text-lg mb-4">
              We are a non-profit organization recognized under Philippine law and accredited by the Department of Social Welfare and Development (DSWD), which was put into operation in January 2012 after several years of preparation and planning.
            </p>
            <p className="text-gray-700 text-lg">
              The Children&apos;s Village can now look back on many years of experience in actively helping disadvantaged children. However, our greatest success is repeated every day. That our children in the Children&apos;s Village can lead a carefree life after bad past years, play, laugh and be alive.
            </p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-4 text-center tracking-wide">
              &ldquo;WE GIVE CHILDREN A FUTURE!&rdquo;
            </h3>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/s36Ko0HtrcQ"
                title="MARIPHIL Children's Village Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Group Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
            Target group
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our target group are children who no longer have parents or whose parents cannot ensure the child&apos;s best interests. The Children&apos;s Village thus cares for orphaned and abandoned children as well as children who have been victims of neglect, abuse and sexual abuse in their family of origin. Many flee from family violence onto the streets and try to survive there. They try to keep their heads above water with begging, stealing, prostitution and minimally paid work. Many consume cheap drugs such as gasoline and glue to make life more bearable. They are exposed to violent attacks without protection. Street children have been abandoned by their families and society, and do not receive any care, protection or attention.
          </p>
        </div>
      </section>

      {/* Guidelines and Principles Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Guidelines and Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Principle 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                We always see the person in need of help in the foreground
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                His social, religious, cultural background, age, gender or even skin color is not a criterion for us to assess his need for help.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                We trust and are trustworthy
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                All our actions are accompanied by optimism, confidence and trust, and at the same time we are a trustworthy, transparent organization for our partners.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Living and promoting respect
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                We respect the UN rights of children and human rights and accept every child and every employee of the Children&apos;s Village regardless of gender, age, religion, sexual orientation, etc. in their individuality and diversity.
              </p>
            </div>

            {/* Principle 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Together we are effective
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                One person achieves a lot – together we achieve everything. Therefore, we see ourselves as an open, community-oriented organization that can only function through the valued cooperation of many supporters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery-section" className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {currentImages.map((img, index) => (
            <div 
              key={index} 
              className="relative h-56 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Children's Village Gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Hover Overlay with + Icon */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-gray-600 font-medium ml-2">FURTHER</span>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-primary/5">
        {/* Top Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="relative py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-2xl md:text-3xl font-serif italic text-gray-800 mb-4">
            &ldquo;Every child is a different kind of flower, and all together make this world a beautiful garden.&rdquo;
          </p>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white opacity-10"></path>
          </svg>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Gallery Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-primary/5 section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Support the Children&apos;s Village
        </h2>
        <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
          Your donation helps us provide a safe, loving home for children in
          need. Every contribution makes a difference in a child&apos;s life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate" className="btn-primary">
            Donate Now
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
