import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Our Projects - Mariphil Foundation Inc.',
  description: 'Explore our ongoing and completed projects supporting children and communities across the Philippines.',
};

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600')] bg-cover bg-center"></div>
        
        <div className="absolute bottom-0 left-0 z-20 text-white px-6 md:px-12 lg:px-16 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl">Making a Difference in Communities</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <p className="text-gray-800 text-lg md:text-xl leading-relaxed text-center">
              The aid project MARIPHIL Foundation Inc in the Philippines is committed to improving the economic, social and health conditions of the poor population in the project area in the Philippines in the form of various sustainable measures and projects. In doing so, it always acts in accordance with the principle of &quot;helping people to help themselves&quot;. The focus is on promoting the education of children and adults in order to enable them to escape poverty in the long term and to strengthen local structures.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Alternating Section */}
      <section className="py-16">
        {projects.length > 0 ? (
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-24">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={project.id}
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 lg:gap-12 items-center`}
                >
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl group">
                      <Image
                        src={project.coverImage || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute top-6 right-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                          project.status === 'active'
                            ? 'bg-primary text-white'
                            : 'bg-gray-900 text-white'
                        }`}>
                          {project.status === 'active' ? 'Active Project' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Section */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {project.title}
                      </h2>
                      <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
                    </div>
                    
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="pt-4">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Learn More
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="section-container">
            <div className="text-center py-12">
              <div className="inline-block p-8 bg-gray-50 rounded-lg">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg">No projects available at the moment.</p>
                <p className="text-gray-400 mt-2">Check back soon for updates on our initiatives!</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-teal-50 to-white py-20">
        {/* Top Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="relative text-center px-6 md:px-12 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Support Our Projects
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Your donations help us continue our mission of transforming lives. Every contribution 
            makes a real difference in the communities we serve.
          </p>
          <Link href="/donate" className="btn-primary">
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
}
