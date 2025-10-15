import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import HeroCarousel from "@/components/HeroCarousel";

async function getLatestNews() {
  try {
    const news = await prisma.news.findMany({
      take: 3,
      orderBy: { publishedAt: "desc" },
    });
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function Home() {
  const latestNews = await getLatestNews();

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Latest News Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            NEWS FROM THE AID PROJECT MARIPHIL
          </h2>
          <p className="text-gray-600 text-lg">
            Stay informed about our recent activities and achievements
          </p>
        </div>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <Link
                href={`/news/${news.slug}`}
                key={news.id}
                className="card group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={
                      news.coverImage ||
                      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600"
                    }
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {news.excerpt}
                  </p>
                  <span className="text-primary font-medium">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No news available at the moment. Check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/news" className="btn-secondary">
            View All News
          </Link>
        </div>
      </section>

      {/* Children's Village Section */}
      <section className="bg-gray-50 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/images/mariphil-village.jpg"
              alt="Mariphil Children&apos;s Village"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Mariphil Children&apos;s Village
            </h2>
            <p className="text-primary font-medium mb-3">
              Purok Takway, Barangay Nanyo, Panabo, Philippines
            </p>
            <p className="text-gray-700 text-lg mb-4">
              A safe, nurturing home where children find love, care, and opportunities to thrive.
              Our Children&apos;s Village provides comprehensive support including housing, education,
              healthcare, and emotional guidance.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              With dedicated staff and volunteers, we create a family-like atmosphere where every
              child receives the care and attention they deserve. From educational programs to
              recreational activities, we ensure each child has the foundation for a bright future.
            </p>
            <Link href="/children-village" className="btn-primary">
              Learn More About the Village
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white to-green-50"></div>
        <div className="relative z-10 section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
            Make a Difference Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-800">
            Your support can change lives. Join us in our mission to provide
            hope and opportunities to those who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg"
            >
              Donate Now
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
