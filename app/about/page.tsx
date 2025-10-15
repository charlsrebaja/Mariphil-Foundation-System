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
          <p className="text-xl">MARIPHIL Children’s Village, “Atong Pinuy-Anan” Inc.</p>
        </div>
      </section>

      {/* Objectives & Mission Section */}
      <section className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="card p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
              OBJECTIVES & MISSION
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                We are always trying to act according to our ideals: Our main attention lies on the people in need of help. Their social, religious, and cultural background, age, gender, or skin color is of no importance to us when it comes to evaluating their need for help.
              </p>
              <p>
                We are intentionally trying to set an example for peaceful collaboration, for mutual respect of all the peoples of the world, of religions and of different cultures as well as for equal gender treatment in the world. Every full-time and honorary staff member of the Children&apos;s Village has to act in accordance with the Accord of Children&apos;s Rights (Nov. 20, 1989) in their daily interaction with the children in and around the Children&apos;s Village.
              </p>
              <p>
                The aim of our Children&apos;s Village is to prepare each of our fosterlings for a self-sufficient life. Depending on personal interests and talents the children are individually promoted and supported in their academic- and leisure-activities, such as school education and vocational training. Unattached to the ethnic and social origin, religious denomination, and gender they have the chance to sustain an autonomous, financially independent, and happy life for their families and themselves.
              </p>
            </div>
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