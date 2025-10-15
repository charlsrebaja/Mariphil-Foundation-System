import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us - Mariphil Foundation Inc.',
  description: 'Learn about Mariphil Foundation Inc., our mission, vision, history, and the team behind our commitment to transforming lives across the Philippines.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/about-herobg.jpg"
            alt="About Mariphil Foundation"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 z-20 text-white px-6 md:px-12 lg:px-16 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Transforming Lives Since 2015</p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To provide hope, support, and opportunities to underprivileged children and families 
              in the Philippines through education, healthcare, and community development programs. 
              We strive to empower communities to break the cycle of poverty and build sustainable futures.
            </p>
          </div>

          <div className="card p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              A Philippines where every child has access to quality education, healthcare, and 
              opportunities to reach their full potential. We envision thriving communities where 
              families are empowered to create lasting positive change for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-gray-50 section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
            Our History
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Mariphil Foundation Inc. was established in 2015 by a group of passionate individuals 
              who witnessed firsthand the challenges faced by underprivileged communities in the Philippines. 
              What started as a small grassroots initiative has grown into a comprehensive organization 
              serving thousands of children and families.
            </p>
            <p>
              Over the past decade, we have expanded our programs to include education support, healthcare 
              services, children&apos;s villages, and community development initiatives. Our first Children&apos;s
              Village opened in 2017, providing a safe and nurturing home for children in need.
            </p>
            <p>
              Today, Mariphil Foundation Inc. operates multiple programs across the Philippines, supported 
              by dedicated volunteers, generous donors, and strong partnerships with local communities and 
              organizations. We remain committed to our founding principles of compassion, integrity, and 
              sustainable community development.
            </p>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Board of Directors
          </h2>
          <p className="text-gray-600 text-lg">
            Meet the dedicated leaders guiding our mission
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Maria Santos', role: 'Board President', image: 'https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg' },
            { name: 'Juan Dela Cruz', role: 'Vice President', image: 'https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg' },
            { name: 'Elena Rodriguez', role: 'Secretary', image: 'https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg' },
            { name: 'Carlos Mendoza', role: 'Treasurer', image: 'https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg' },
            { name: 'Rosa Garcia', role: 'Board Member', image: 'https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg' },
            { name: 'Miguel Torres', role: 'Board Member', image: 'https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg' },
          ].map((member, index) => (
            <div key={index} className="card text-center">
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Join Our Mission
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Be part of our journey to transform lives. Whether through donations, volunteering, 
            or partnerships, your support makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/donate" className="btn-primary">
              Donate Now
            </a>
            <a href="/contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}