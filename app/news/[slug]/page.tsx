import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await prisma.news.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} - Mariphil Foundation Inc.`,
    description: article.excerpt,
  };
}

async function getArticle(slug: string) {
  try {
    const article = await prisma.news.findUnique({
      where: { slug },
    });
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Image
            src={article.coverImage || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600'}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 section-container text-white pb-12">
          <div className="text-sm mb-4 opacity-90">
            {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          <p className="text-xl max-w-3xl">{article.excerpt}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="bg-gray-50 section-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Share This Story
          </h2>
          <p className="text-gray-600 mb-6">
            Help us spread the word about our work
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Back to News */}
      <section className="section-container text-center">
        <Link href="/news" className="btn-secondary">
          ← Back to News
        </Link>
      </section>
    </div>
  );
}