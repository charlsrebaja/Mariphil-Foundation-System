import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mariphil Children&apos;s Village - Mariphil Foundation Inc.",
  description:
    "A safe and nurturing home for children in need. Learn about our Children&apos;s Village program and how we provide care, education, and hope.",
};

export default function ChildrenVillagePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/children-village.jpg"
            alt="Mariphil Children&apos;s Village"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute bottom-0 left-0 z-20 text-white px-6 md:px-12 lg:px-16 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mariphil Children&apos;s Village
          </h1>
          <p className="text-xl max-w-2xl">
            A loving home where children find safety, care, and opportunities to
            thrive
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              A Home for Every Child
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              The Mariphil Children&apos;s Village provides a safe, nurturing
              environment for children who have faced adversity. Our facility
              offers comprehensive care including housing, education,
              healthcare, and emotional support.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              Each child receives individualized attention and care from our
              dedicated staff and house parents who work tirelessly to create a
              family-like atmosphere where children can heal, grow, and discover
              their potential.
            </p>
            <p className="text-gray-700 text-lg">
              We believe every child deserves a chance at a bright future, and
              our village provides the foundation for that journey.
            </p>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800"
              alt="Children&apos;s Village"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-gray-50 section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Facilities
          </h2>
          <p className="text-gray-600 text-lg">
            Everything a child needs to feel safe, loved, and supported
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Residential Units",
              description:
                "Comfortable, home-like living spaces with dedicated house parents",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              ),
            },
            {
              title: "Learning Center",
              description:
                "Fully-equipped classrooms and library for education support",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              ),
            },
            {
              title: "Healthcare Clinic",
              description: "On-site medical care and regular health monitoring",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              ),
            },
            {
              title: "Recreation Areas",
              description:
                "Playgrounds and sports facilities for physical activities",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ),
            },
            {
              title: "Dining Hall",
              description:
                "Nutritious meals prepared daily in our community kitchen",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              ),
            },
            {
              title: "Counseling Rooms",
              description: "Professional psychological support and guidance",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              ),
            },
          ].map((facility, index) => (
            <div key={index} className="card p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {facility.icon}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {facility.title}
              </h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive approach to child care and development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Admission",
              description:
                "Children are referred by social services or community partners",
            },
            {
              step: "2",
              title: "Assessment",
              description:
                "Individual needs assessment and care plan development",
            },
            {
              step: "3",
              title: "Care & Education",
              description:
                "Comprehensive support including housing, education, and healthcare",
            },
            {
              step: "4",
              title: "Reintegration",
              description:
                "Preparation for independent living or family reunification",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-gray-50 section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Success Stories
          </h2>
          <p className="text-gray-600 text-lg">
            Lives transformed through love, care, and opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Miguel, Age 16",
              story:
                "Arrived at 12, now excelling in school and dreams of becoming a teacher to help other children.",
              image:
                "https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg",
            },
            {
              name: "Maria, Age 14",
              story:
                "Found safety and support at the village. Now a confident student and leader among her peers.",
              image:
                "https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg",
            },
            {
              name: "Juan, Age 15",
              story:
                "Overcame early challenges to discover his passion for art. Recently won a regional art competition.",
              image:
                "https://static.vecteezy.com/system/resources/previews/029/271/062/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg",
            },
          ].map((story, index) => (
            <div key={index} className="card">
              <div className="relative h-64">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {story.name}
                </h3>
                <p className="text-gray-600 italic">&ldquo;{story.story}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Staff Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Dedicated Staff
          </h2>
          <p className="text-gray-600 text-lg">
            Trained professionals committed to child welfare
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "House Parents",
            "Social Workers",
            "Teachers",
            "Healthcare Staff",
            "Counselors",
            "Nutritionists",
            "Recreation Coordinators",
            "Administrative Staff",
          ].map((role, index) => (
            <div
              key={index}
              className="bg-primary/5 rounded-lg p-6 text-center"
            >
              <p className="text-gray-900 font-semibold">{role}</p>
            </div>
          ))}
        </div>
      </section>

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
