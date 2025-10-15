import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Mariphil Foundation Inc.`,
    description: project.summary,
  };
}

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Image
            src={project.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600'}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 section-container text-white pb-12">
          <div className="mb-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.status === 'active' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-900'
            }`}>
              {project.status === 'active' ? 'Active Project' : 'Completed'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl max-w-3xl">{project.summary}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 section-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Support This Project
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Your donation can help us continue and expand this important work. Every contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="btn-primary">
              Donate Now
            </Link>
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}