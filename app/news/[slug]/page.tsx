'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

type Props = {
  params: Promise<{ slug: string }>;
};

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  publishedAt: Date;
};

export default function NewsDetailPage({ params }: Props) {
  const [slug, setSlug] = useState('');
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Gallery images for Summer Festival, organized by page
  const galleryPages: Record<number, string[]> = {
    1: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
    ],
    2: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=400",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    ],
    3: [
      "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400",
    ],
    4: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400",
      "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=400",
    ],
  };

  const currentImages = galleryPages[currentPage] || galleryPages[1];

  useEffect(() => {
    async function loadArticle() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
      
      try {
        const response = await fetch(`/api/news?slug=${resolvedParams.slug}`);
        if (response.ok) {
          const data = await response.json();
          const foundArticle = data.find((a: Article) => a.slug === resolvedParams.slug);
          if (foundArticle) {
            setArticle(foundArticle);
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [params]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
            src={
              slug === 'mariphil-celebrates-10-years'
                ? 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600'
                : slug === 'summer-festival-2025' || slug === 'mariphil-summer-festival-2025'
                ? '/images/news/Sommerfest 2025.jpg'
                : article.coverImage || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600'
            }
            alt={article.title}
            fill
            className="object-cover"
            priority
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

      {/* Sports Festival Content */}
      {slug === 'sports-festival-childrens-village' && (
        <section className="section-container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sports festival in the children&apos;s village</h2>
              <p className="text-primary font-semibold mb-8">Oct. 10, 2025</p>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  &quot;Sport free&quot; was the motto on October 4th at the MARIPHIL Children&apos;s Village. Under the motto &quot;celebration of strength and spirit&quot;, the sports festival began at 4:30 a.m. with Zumba as a warm-up. At 5:00 a.m., the participants ran about 3km around the Purok Takway and Purok Kamansi. The board of directors, employees of the office administration/social services, house mothers, interns of the social service and of course all the children of the children&apos;s village took part in the run. The run ended at 7:00 a.m. and for breakfast we had a delicious Arroz Caldo.
                </p>

                <p>
                  The sporty start to the day was a great joy for young and old.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Summer Festival 2025 Content */}
      {(slug === 'summer-festival-2025' || slug === 'mariphil-summer-festival-2025') && (
        <section className="section-container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Summer Festival 2025</h2>
              <p className="text-primary font-semibold mb-8">June 26, 2025</p>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  In wonderful weather, the summer party of MARIPHIL took place again this year in beautiful Gutenstein. Friends and supporters of MARIPHIL came from many regions of Germany and even from Lichtenstein or Switzerland, Iserlohn or deepest Bavaria to exchange ideas and enjoy the delicious Asian delicacies with which our board member Isabel and her cooking team (Jane, Glenn, Jonavie and Carmen) spoiled the guests. Many days and nights of preparatory work were necessary here to roll all the spring rolls, cut the vegetables or prepare the dishes. The well-known Filipino food blogger "Bebs" with more than one million followers ("FoxyFolksy-Modern Filipino Kitchen"), had also come with her husband Armin to spend nice hours together with us and to actively participate in the food preparation.
                </p>

                <p>
                  Our service team with Silke, Iris and Daniela, made sure that the guests felt completely comfortable behind the scenes, Rudi at the grill or Michi, Helmut and Rudi during the set-up and dismantling.
                </p>

                <p>
                  3 former Weltwärts volunteers have also travelled from far away to actively support us with the set-up and dismantling. Many thanks also to all the people who supported us by donating cakes or salads.
                </p>

                <p>
                  The proceeds from the event were able to flow 520 € into the "school bus" project, which is urgently needed locally
                </p>
              </div>
            </div>

            {/* Gallery Section */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentImages.map((img, index) => (
                  <div key={index} className="relative h-56 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <Image
                      src={img}
                      alt={`Summer Festival ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-8">
                {[1, 2, 3, 4].map((page) => (
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
            </div>
          </div>
        </section>
      )}

      {/* Default Content for Other Articles */}
      {slug !== 'summer-festival-2025' && slug !== 'mariphil-summer-festival-2025' && slug !== 'sports-festival-childrens-village' && (
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
          </div>
        </section>
      )}

      {/* Back to News */}
      <section className="section-container text-center">
        <Link href="/news" className="btn-secondary inline-flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to News
        </Link>
      </section>
    </div>
  );
}
