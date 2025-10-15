import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
      title: "Project Not Found",
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
    console.error("Error fetching project:", error);
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
            src={
              project.coverImage ||
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600"
            }
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-20 section-container text-white pb-12">
          <div className="mb-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                project.status === "active"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              {project.status === "active" ? "Active Project" : "Completed"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-xl max-w-3xl">{project.summary}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-container">
        <div className="max-w-6xl mx-auto">
          <article className="space-y-8">
            {/* Render markdown content with proper styling */}
            <div className="prose prose-lg prose-headings:text-gray-900 prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-0 prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-primary prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:space-y-2 prose-li:text-gray-700 prose-li:marker:text-primary max-w-none">
              {project.content.split('\n').map((line, index) => {
                // Parse markdown headers
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-4xl font-bold text-gray-900 mb-6 mt-0">
                      {line.replace('# ', '')}
                    </h1>
                  );
                }
                if (line.startsWith('## ')) {
                  return (
                    <div key={index} className="mt-12 mb-6">
                      <h2 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                        {line.replace('## ', '')}
                      </h2>
                      <div className="h-0.5 w-20 bg-primary/30 ml-6 mt-2"></div>
                    </div>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-2xl font-semibold text-gray-900 mb-3 mt-8 flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                
                // Parse list items
                if (line.startsWith('- ')) {
                  return (
                    <div key={index} className="flex items-start gap-3 ml-6 mb-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
                      <p className="text-gray-700 text-lg leading-relaxed">{line.replace('- ', '')}</p>
                    </div>
                  );
                }
                
                // Parse numbered lists
                const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
                if (numberedMatch) {
                  return (
                    <div key={index} className="flex items-start gap-4 ml-6 mb-3">
                      <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {numberedMatch[1]}
                      </span>
                      <p className="text-gray-700 text-lg leading-relaxed pt-1">{numberedMatch[2]}</p>
                    </div>
                  );
                }
                
                // Parse bold text with **
                if (line.includes('**') && !line.startsWith('#')) {
                  const parts = line.split('**');
                  return (
                    <p key={index} className="text-gray-700 text-lg leading-relaxed mb-4">
                      {parts.map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
                      )}
                    </p>
                  );
                }
                
                // Regular paragraphs
                if (line.trim() && !line.startsWith('#') && !line.startsWith('-') && !line.match(/^\d+\./)) {
                  return (
                    <p key={index} className="text-gray-700 text-lg leading-relaxed mb-4">
                      {line}
                    </p>
                  );
                }
                
                // Empty lines for spacing
                if (!line.trim()) {
                  return <div key={index} className="h-2"></div>;
                }
                
                return null;
              })}
            </div>

            {/* Impact Stats Section */}
            {project.slug === 'mariphil-childrens-village' && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20">
                  <div className="text-5xl font-bold text-primary mb-2">100+</div>
                  <div className="text-gray-700 font-medium">Children Cared For</div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20">
                  <div className="text-5xl font-bold text-primary mb-2">15+</div>
                  <div className="text-gray-700 font-medium">Years of Service</div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20">
                  <div className="text-5xl font-bold text-primary mb-2">95%</div>
                  <div className="text-gray-700 font-medium">Success Rate</div>
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 section-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Support This Project
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Your donation can help us continue and expand this important work.
            Every contribution makes a difference.
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
