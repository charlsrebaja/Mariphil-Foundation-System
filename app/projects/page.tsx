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
      orderBy: { createdAt: 'desc' },
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

      {/* Projects Grid Section */}
      <section className="section-container">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link href={`/projects/${project.slug}`} key={project.id} className="card group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.coverImage || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600'}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === 'active' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {project.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.summary}
                  </p>
                  <span className="text-primary font-medium">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-gray-50 rounded-lg">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-lg">No projects available at the moment.</p>
              <p className="text-gray-400 mt-2">Check back soon for updates on our initiatives!</p>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 section-container text-center">
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
      </section>
    </div>
  );
}