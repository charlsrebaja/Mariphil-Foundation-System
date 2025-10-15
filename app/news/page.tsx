import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'News & Updates - Mariphil Foundation Inc.',
  description: 'Stay updated with the latest news and stories from Mariphil Foundation Inc.',
};

async function getNews() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/hero/children-background.jpg')] bg-cover bg-center"></div>
        
        <div className="absolute bottom-0 left-0 z-20 text-white px-6 md:px-12 lg:px-16 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">WHAT&apos;S NEW AT MARIPHIL?</h1>
          <p className="text-xl">Stories of Hope and Impact</p>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="section-container">
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <Link href={`/news/${article.slug}`} key={article.id} className="card group">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={article.coverImage || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600'}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="text-primary font-medium">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-gray-50 rounded-lg">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-500 text-lg">No news available at the moment.</p>
              <p className="text-gray-400 mt-2">Check back soon for updates!</p>
            </div>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Subscribe to our newsletter
        </h2>
        <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
          Follow us on social media or contact us to receive updates about our work and impact.
        </p>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </section>
    </div>
  );
}