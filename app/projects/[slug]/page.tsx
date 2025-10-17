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
        </div>
      </section>

      {/* Content Section */}
      <section className="section-container">
        <div className="max-w-6xl mx-auto">
          <article className="space-y-8">
            {/*100,000 Trees Against Climate Change - Enhanced with Image Gallery*/}
            {(project.slug === "100000-trees-against-climate-change" ||
              project.slug === "trees-climate-change" ||
              project.title.includes("100,000 Trees")) && (
              <div className="space-y-12">
                <div className="prose max-w-none mx-auto">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Join us in our mission to plant 100,000 trees across the
                    Philippines to combat climate change and promote
                    biodiversity.
                  </h2>

                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    MARIPHIL e.V. acquires and plants land in the Philippines
                    with mixed forests of 10 – 20 typical tree species. Through
                    the most gentle management possible and with the involvement
                    of the local population, we would like to generate permanent
                    income for the MARIPHIL projects on site, such as the
                    children&apos;s village and the school, health or social
                    projects. An equal goal is the fight against climate change.
                    We also strive for recognition for the sale of CO²
                    certificates, which is associated with strict criteria. With
                    every tree we plant, we bind CO² and want to do our part in
                    the fight against global warming. Every tree counts. At the
                    moment we already have about 25 ha. Land acquired. More than
                    31,000 trees have already been planted on it.
                  </p>
                </div>

                {/* Image Gallery Section */}
                <div>
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                    Project Gallery
                  </h2>
                  <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                    Witness our reforestation efforts and the positive impact on
                    local communities and the environment
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Image Card 1 */}
                    <div className="card overflow-hidden group hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src="/images/gallery/planting-gallery1.png"
                          alt="Tree planting ceremony"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-xl font-bold mb-2">
                              Community Planting Day
                            </h3>
                            <p className="text-sm">
                              Local volunteers participating in tree planting
                              activities
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Card 2 */}
                    <div className="card overflow-hidden group hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src="/images/gallery/planting-gallery2.png"
                          alt="Growing forest"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-xl font-bold mb-2">
                              Thriving Forest
                            </h3>
                            <p className="text-sm">
                              Young trees growing strong in reforested areas
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Card 3 */}
                    <div className="card overflow-hidden group hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src="/images/gallery/planting-gallery1.png"
                          alt="Seedling nursery"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-xl font-bold mb-2">
                              Seedling Nursery
                            </h3>
                            <p className="text-sm">
                              Thousands of seedlings prepared for planting
                              season
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Card 4 */}
                    <div className="card overflow-hidden group hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src="/images/gallery/planting-gallery1.png"
                          alt="Environmental education"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-xl font-bold mb-2">
                              Environmental Education
                            </h3>
                            <p className="text-sm">
                              Teaching communities about climate change and
                              sustainability
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forestry Project With Vision Section */}
                <div className="py-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 uppercase tracking-tight">
                    Forestry Project With Vision
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Acquisition and Planting */}
                    <div className="text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden">
                          <Image
                            src="/images/projects/Acquisition and planting.png"
                            alt="Acquisition and planting"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Acquisition and planting
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        For the purchase of a seedling, the planting (incl.
                        travel costs, fertilizer, etc.) and necessary replanting
                        due to a 30% failure rate, about 0.49€ are incurred.
                      </p>
                    </div>

                    {/* Care */}
                    <div className="text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden">
                          <Image
                            src="/images/projects/Care.png"
                            alt="Care"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Care
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        For the intensive care of the seedlings in the first
                        four months (e.g. watering) we calculate 1.45€. MARIPHIL
                        pays the minimum wage to the employees of the land
                        projects.
                      </p>
                    </div>

                    {/* Tree */}
                    <div className="text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden">
                          <Image
                            src="/images/projects/Tree.png"
                            alt="Tree"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Tree
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        For each tree that grows on MARIPHIL land, we calculate
                        with 1.94€.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sustainability Mission Statement */}
                <div className="bg-gradient-to-br from-teal-400 via-[#4DB8B8] to-teal-500 -mx-4 sm:-mx-6 lg:-mx-8 py-12 sm:py-16 px-6 sm:px-12 lg:px-16 my-12">
                  <div className="max-w-6xl mx-auto text-center">
                    <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed font-light">
                      WITH THEIR SUPPORT, MARIPHIL HAS STARTED A MAJOR PROJECT
                      WITH &ldquo;100,000 TREES AGAINST CLIMATE CHANGE&rdquo;,
                      WHICH ENABLES US TO TAKE INTO ACCOUNT THE THREE DIMENSIONS
                      OF{" "}
                      <span className="font-bold text-base md:text-lg">
                        SUSTAINABILITY
                      </span>{" "}
                      IN OUR WORK ON SITE:{" "}
                      <span className="font-bold text-base md:text-lg">
                        SOCIAL, ENVIRONMENTAL
                      </span>{" "}
                      AND{" "}
                      <span className="font-bold text-base md:text-lg">
                        ECONOMIC.
                      </span>{" "}
                      BECAUSE ONLY WITH A HOLISTIC AND RESPONSIBLE APPROACH CAN
                      WE ACHIEVE LONG-TERM{" "}
                      <span className="font-bold text-base md:text-lg">
                        CHANGES
                      </span>
                      , CHANGE{" "}
                      <span className="font-bold text-base md:text-lg">
                        SOCIETY
                      </span>{" "}
                      SUSTAINABLY FROM BELOW AND FINALLY EFFECTIVELY BREAK THE
                      CYCLE OF POVERTY. OF COURSE, THE GLOBAL CHALLENGES CANNOT
                      BE{" "}
                      <span className="font-bold text-base md:text-lg">
                        SOLVED
                      </span>{" "}
                      FROM ONE DAY TO THE NEXT, BUT WE ARE SURE – WHETHER
                      INDIVIDUAL, ORGANIZATION OR STATE –{" "}
                      <span className="font-bold text-base md:text-lg">
                        EVERYONE CAN
                      </span>{" "}
                      CONTRIBUTE A SMALL{" "}
                      <span className="font-bold text-base md:text-lg">
                        PART.
                      </span>
                    </p>
                  </div>
                </div>
                {/* Plant With Us - Support Section */}
                <div className="py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column - Plant With Us */}
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase">
                        PLANT WITH US!
                      </h2>

                      <div className="space-y-3 text-gray-700 leading-relaxed text-base">
                        <p>
                          Anyone who would like to support the further
                          development of this sustainable project can make a
                          contribution by making a donation to our donation
                          account with the keyword{" "}
                          <strong>
                            &ldquo;100,000 trees against climate change&rdquo;
                          </strong>
                          . The contact person for the land project is Martin
                          Riester.
                        </p>

                        <p>
                          From one hectare of donated land, there is the
                          possibility to give &ldquo;your country&rdquo; your
                          own name. In addition, we welcome all donors to take
                          their own look at the project. For those who do not
                          want to fly to the Philippines, there are of course
                          regular updates and impressions of the developments in
                          the MARIPHIL countries.
                        </p>
                      </div>
                    </div>

                    {/* Right Column - Donation Account */}
                    <div className="rounded-2xl shadow-xl p-6 border-2 border-orange-200 bg-[#fad20a]">
                      <div className="flex flex-col items-center mb-4">
                        {/* Down Arrow Icon */}
                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-4">
                          OUR DONATION ACCOUNT IN PHILIPPINES
                        </h3>
                      </div>

                      <div className="space-y-3 text-center">
                        <p className="text-base text-gray-700">
                          Aid project MARIPHIL e.V.
                        </p>

                        <div className="py-3 border-y border-gray-200">
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Keyword:</strong> 100,000 trees against
                            climate change
                          </p>
                        </div>

                        <div className="space-y-2 py-3">
                          <p className="text-base">
                            <strong className="text-gray-900">IBAN:</strong>{" "}
                            <span className="font-mono text-sm text-gray-700">
                              DE11 6009 0700 0863 4900 00
                            </span>
                          </p>
                          <p className="text-base">
                            <strong className="text-gray-900">BIC:</strong>{" "}
                            <span className="font-mono text-sm text-gray-700">
                              SWBSDESS
                            </span>
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Please be sure to enter your password and address so
                            that we can send you a donation receipt!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sponsorships Card-Based Layout */}
            {project.slug === "sponsorships" && (
              <div className="space-y-16 mt-12">
                {/* Introduction Text */}
                <div className="prose max-w-none mx-auto">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    We offer different forms of sponsorship for our supporters.
                    Through the regular support on your part, you place great
                    trust in us.
                  </p>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    We appreciate this very much and are happy to confirm this!
                  </p>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    Sponsorships can also be a wonderful and very meaningful
                    gift for your loved ones. They are also ideal for providing
                    valuable help when several people join forces. See the
                    sponsorship as a community project within your family, your
                    circle of friends, your department or your association, etc.
                  </p>
                </div>

                {/* Types of Sponsorships Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* School Sponsorship Card */}
                  <div className="group card hover:shadow-2xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40">
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-t-xl">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg
                          className="w-8 h-8 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        School Sponsorship
                      </h3>
                      <p className="text-primary font-semibold">
                        Transform a Child&apos;s Future
                      </p>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-6">
                        Enable a child in need to receive a quality school
                        education. Your regular support covers:
                      </p>
                      <ul className="space-y-3">
                        {[
                          "School tuition and enrollment fees",
                          "School supplies and textbooks",
                          "School uniforms",
                          "Transportation to school",
                          "Educational materials",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm font-semibold text-primary">
                          Impact: Break the cycle of poverty through education
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Project Sponsorship Card */}
                  <div className="group card hover:shadow-2xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40">
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-t-xl">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg
                          className="w-8 h-8 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Project Sponsorship
                      </h3>
                      <p className="text-primary font-semibold">
                        Support Community Development
                      </p>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-6">
                        Sponsor a specific project and support it financially.
                        Your contributions help fund:
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Infrastructure development",
                          "Educational programs",
                          "Healthcare and nutrition programs",
                          "Community development projects",
                          "Vocational training facilities",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm font-semibold text-primary">
                          Flexibility: Choose projects aligned with your values
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Information About School Sponsorship */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-8 uppercase">
                    All information about our school sponsorship
                  </h2>

                  <div className="space-y-4 max-w-4xl mx-auto">
                    <details className="group bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-primary/40 transition-all">
                      <summary className="cursor-pointer p-6 font-bold text-lg text-gray-900 hover:text-primary transition-colors list-none flex justify-between items-center uppercase">
                        Cost
                        <svg
                          className="w-6 h-6 text-primary group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                        <p>
                          School sponsorship costs information will be displayed
                          here.
                        </p>
                      </div>
                    </details>

                    <details className="group bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-primary/40 transition-all">
                      <summary className="cursor-pointer p-6 font-bold text-lg text-gray-900 hover:text-primary transition-colors list-none flex justify-between items-center uppercase">
                        We operate according to the principle of solidarity
                        <svg
                          className="w-6 h-6 text-primary group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                        <p>
                          Information about the solidarity principle will be
                          displayed here.
                        </p>
                      </div>
                    </details>

                    <details className="group bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-primary/40 transition-all">
                      <summary className="cursor-pointer p-6 font-bold text-lg text-gray-900 hover:text-primary transition-colors list-none flex justify-between items-center uppercase">
                        What requirements do we place on the parents/children we
                        support in the Philippines?
                        <svg
                          className="w-6 h-6 text-primary group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                        <p>Requirements information will be displayed here.</p>
                      </div>
                    </details>

                    <details className="group bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-primary/40 transition-all">
                      <summary className="cursor-pointer p-6 font-bold text-lg text-gray-900 hover:text-primary transition-colors list-none flex justify-between items-center uppercase">
                        What services do the supported children receive?
                        <svg
                          className="w-6 h-6 text-primary group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                        <p>Services information will be displayed here.</p>
                      </div>
                    </details>

                    <details className="group bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-primary/40 transition-all">
                      <summary className="cursor-pointer p-6 font-bold text-lg text-gray-900 hover:text-primary transition-colors list-none flex justify-between items-center uppercase">
                        Cost development and controlling
                        <svg
                          className="w-6 h-6 text-primary group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                        <p>
                          Cost development and controlling information will be
                          displayed here.
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            )}

            {/* MARIPHIL Water Treatment Plant Card-Based Layout */}
            {project.slug === "mariphil-water-treatment-plant" && (
              <div className="space-y-12 mt-12">
                {/* Introduction Section */}
                <div className="prose max-w-none mx-auto">
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    There is usually more than enough water in a tropical
                    country like the Philippines. But when it comes to clean
                    drinking water, the situation is completely different. In
                    the project area of the MARIPHIL aid project, the vast
                    majority of people lack direct access to really clean
                    drinking water. Many people have no choice, filter the
                    rainwater or use the mostly germ-contaminated water from
                    wells they have built themselves.
                  </p>

                  {/* Not All Water Is The Same */}
                  <div className="my-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                      <span className="text-gray-900">NOT ALL WATER </span>
                      <span className="text-yellow-500">IS</span>
                      <br />
                      <span className="text-yellow-500">THE SAME</span>
                    </h2>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    The people with some income buy water in disposable bottles,
                    get it in reusable containers from the many water treatment
                    plants on site or get the water from the local suppliers on
                    site, which is often not really germ-free.
                  </p>

                  <p className="text-gray-700 text-lg leading-relaxed mb-12">
                    Therefore, many people, especially the poor population in
                    the Philippines and especially young children, are at high
                    risk of contracting gastrointestinal diseases of any kind.
                    Unfortunately, often with fatal consequences, as these
                    families often do not have sufficient access to medical care
                    even with such an illness.
                  </p>
                </div>

                {/* Large Image Section */}
                <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl -mx-4 sm:-mx-6 lg:-mx-8">
                  <Image
                    src="/images/projects/MARIPHIL Water Treatment Plant1.jpg"
                    alt="MARIPHIL Water Treatment Plant"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* MARIPHIL Opens Water Treatment Plant Section */}
                <div className="prose max-w-none mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                    MARIPHIL opens
                    <br />
                    water treatment plant
                  </h2>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    This circumstance has encouraged the association of the
                    three MARIPHIL organisations MARIPHIL Switzerland, MARIPHIL
                    Nord e.V. and MARIPHIL e.V. to jointly launch and finance a
                    sustainable water project. The construction of a so-called
                    &ldquo;Water refilling station&rdquo; (water purification
                    with the help of the so-called &ldquo;osmosis – reversal
                    process&rdquo;) was planned and implemented, mainly by
                    MARIPHIL Switzerland and board member Isabel Riester of
                    MARIPHIL e.V. from Gutenstein as project manager on site.
                  </p>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Construction began in October 2022 after almost 2 years of
                    preparation and planning, and was completed in April 2023
                    after overcoming countless bureaucratic obstacles. Now that
                    the operating license has been obtained and all other
                    necessary papers have been approved, the facility was
                    officially opened on 15.05.2023. &ldquo;The fact that this
                    project was largely implemented within the planned budget
                    and to a high standard shows the quality of the practical
                    implementation in an environment characterized by
                    inflation,&rdquo; says Martin Riester, board member of
                    MARIPHIL e.V.
                  </p>
                </div>

                {/* Sustainable Goals Section */}
                <div className="prose max-w-none mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                    Sustainable goals
                  </h2>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    The goals of this project are, on the one hand, to supply
                    the MARIPHIL projects on site such as the Children&apos;s
                    Village with clean drinking water and thus reduce operating
                    costs. But also to generate income with the project despite
                    fair water prices for the people, which then flows directly
                    to the projects of MARIPHIL in the Philippines. At the same
                    time, we also create fairly paid jobs locally. The fact that
                    Jovelyn Dahang, a young lady who has been built up over 14
                    years through a sponsorship from primary school to the
                    completion of her studies, is now taking over the
                    responsibility for this project also shows the long-term
                    effect of MARIPHIL&apos;s work. This is where we come full
                    circle,&rdquo; says Martin Riester.
                  </p>
                </div>
              </div>
            )}
            {/* Health Insurance and Emergency Care */}
            {project.slug === "health-insurance-emergency-care" && (
              <div className="space-y-12 mt-12">
                {/* Introduction Section */}
                <div className="prose max-w-none mx-auto">
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    Being insured in the event of illness or accident is almost
                    a matter of course for us in Europe. Anyone who is
                    unemployed, old or permanently ill is taken care of in the
                    solidarity-based system of statutory health insurance as
                    part of our stable social network. Through medical care,
                    diseases are detected at an early stage and can be treated
                    effectively.
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                    In the Philippines, however, it&apos;s completely different!
                  </h2>

                  <p className="text-gray-700 text-lg leading-relaxed mb-12">
                    The majority of families have poor access to medical care
                    and have to pay for medication and treatment out of their
                    own pockets. Social health insurance only covers employees
                    in the regular labour market – but the absolute majority of
                    people work in the informal sector and therefore do not have
                    health insurance.
                  </p>
                </div>

                {/* Video Section */}
                <div className="max-w-4xl mx-auto">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/u7X_SEWe2Gs"
                      title="MARIPHIL Health Insurance and Emergency Care"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Help Us to Help Section */}
                <div className="bg-green-50 rounded-2xl p-8 md:p-12 shadow-lg border-2 border-green-200">
                  <div className="prose max-w-none mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                      Help us to help!
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      Finance a simple health insurance for a Filipino family
                      with only 7 euros a month!
                    </p>

                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                      For us, a cup of coffee and a piece of cake – but for the
                      affected families, it is a valuable insurance in the event
                      of illness or accident that saves lives
                    </p>

                    <p className="text-gray-700 text-lg leading-relaxed">
                      If you would like to take on such a sponsorship, simply
                      place a standing order on our account. Please also be sure
                      to provide us with your complete address (e.g. by e-mail)
                      so that we can issue an annual donation receipt. Here we
                      recommend a semi-annual (42 €) or annual standing order
                      (84 €) to reduce the administrative burden.
                    </p>
                  </div>
                </div>

                {/* Donation Account Section */}
                <div className="rounded-2xl shadow-xl p-8 border-2 border-orange-200 max-w-2xl mx-auto bg-[#fad20a]">
                  <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                    Our donation account in PHILIPPINES
                  </h3>

                  <div className="space-y-4 text-center">
                    <p className="text-lg text-gray-700">
                      Aid project MARIPHIL eV
                    </p>

                    <div className="py-4 border-y border-gray-200">
                      <p className="text-base text-gray-700 mb-1">
                        <strong>Keyword:</strong> health insurance
                      </p>
                    </div>

                    <div className="space-y-3 py-4">
                      <p className="text-lg">
                        <strong className="text-gray-900">IBAN:</strong>{" "}
                        <span className="font-mono text-sm text-gray-700">
                          DE11 6009 0700 0863 4900 00
                        </span>
                      </p>
                      <p className="text-lg">
                        <strong className="text-gray-900">BIC:</strong>{" "}
                        <span className="font-mono text-sm text-gray-700">
                          SWBSDESS
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="prose max-w-none mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                    <span className="text-primary">Frequently Asked</span>{" "}
                    <span className="text-gray-900">Questions</span>
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        question: "How does the health insurance work?",
                        answer:
                          "The health insurance provides coverage for Filipino families working in the informal sector who don&apos;t have access to social health insurance. It covers basic medical care, medication, and emergency treatments.",
                      },
                      {
                        question: "How much does it cost to sponsor a family?",
                        answer:
                          "With just 7 euros per month, you can provide health insurance coverage for an entire Filipino family. We recommend semi-annual (42€) or annual (84€) standing orders to reduce administrative costs.",
                      },
                      {
                        question: "What does the insurance cover?",
                        answer:
                          "The insurance covers essential medical services including doctor visits, medication, emergency care, and treatment for illnesses and accidents that would otherwise be unaffordable for families in the informal sector.",
                      },
                      {
                        question: "How do I set up a sponsorship?",
                        answer:
                          "Simply set up a standing order to our account using the keyword 'health insurance'. Please provide your complete address via email so we can issue an annual donation receipt.",
                      },
                      {
                        question: "Is my donation tax-deductible?",
                        answer:
                          "Yes, all donations to MARIPHIL e.V. are tax-deductible. We will provide you with an annual donation receipt for your tax records.",
                      },
                    ].map((faq, index) => (
                      <details
                        key={index}
                        className="group bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-primary/40 transition-all"
                      >
                        <summary className="cursor-pointer p-6 font-semibold text-lg text-gray-900 hover:text-primary transition-colors list-none flex justify-between items-center">
                          {faq.question}
                          <svg
                            className="w-5 h-5 text-primary group-open:rotate-180 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Rice Sack Campaign */}
            {project.slug === "rice-sack-campaign" && (
              <div className="space-y-12 mt-12">
                {/* Introduction Section */}
                <div className="prose max-w-none mx-auto">
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    Countless families in the Philippines have too little income
                    to satisfy their hunger due to a lack of or only temporary
                    employment opportunities. Those who are reasonably well off
                    live mainly on dried fish and a handful of rice. Only those
                    who own their own piece of land are able to supplement the
                    meagre diet with some fruit and vegetables. Large families
                    or those who have fallen into extreme poverty due to a
                    stroke of fate are among those who have too little to be
                    really full every day.
                  </p>

                  <p className="text-gray-700 text-lg leading-relaxed mb-12">
                    The situation of these families is exacerbated by the
                    current immense price increases for basic foodstuffs. Also
                    in the area where the aid project MARIPHIL e.V. is active,
                    many families suffer from poverty and hunger during the
                    Christmas season!
                  </p>

                  {/* A Hunger-Free Christmas Section */}
                  <div className="my-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight uppercase">
                      <span className="text-yellow-500">
                        A HUNGER-FREE CHRISTMAS
                      </span>
                      <br />
                      <span className="text-gray-900">
                        FOR FAMILIES IN NEED
                      </span>
                    </h2>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-12">
                    The &ldquo;Rice Bag Campaign&rdquo; was carried out for the first time
                    in 2001 and with overwhelming success. For our partners in
                    the project area, every Reissack campaign is a challenge in
                    terms of logistics, accounting and management. A crowd of
                    helpers is busy distributing the rice donations to needy
                    families in the entire project area, documenting the
                    distribution and then preparing an account for the campaign.
                  </p>
                </div>

                {/* Video Section */}
                <div className="max-w-6xl mx-auto">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/nh-XnGKkTYg"
                      title="Rice Sack Campaign Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                {/* Rice Sack Campaign 2025 Details */}
                <div className="prose max-w-none mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">
                    Rice sack campaign 2025
                  </h2>

                  <div className="text-left space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      We want to make sure that families in need have enough
                      rice so that they don&apos;t have to go hungry over Christmas.
                      This year, MARIPHIL is once again handing over 1 sack of
                      rice to destitute families in the Philippines. Sharply
                      rising prices, especially for food, are causing problems
                      for the weakest in particular. Many parents do not know
                      how to feed their families adequately. Therefore, many
                      people need special support again!
                    </p>

                    <div className="my-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">
                        &ldquo;A really meaningful Christmas present!&rdquo;
                      </h3>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">
                      With 40 euros* you can donate 1 bag (40 kg) of rice to a
                      family in need. Whether individual or partial donations,
                      every donation counts! Let&apos;s work together again to give
                      as many families as possible a hunger-free Christmas!
                    </p>

                    <p className="text-gray-600 text-base leading-relaxed italic">
                      *Any surpluses (e.g. due to price or currency
                      fluctuations) flow into our general project work (e.g.
                      emergency fund).
                    </p>

                    <p className="text-gray-600 text-base leading-relaxed">
                      <strong>Note on data protection:</strong> The transfer of
                      your data to the Philippines is necessary for the thank
                      you letter – if you do not want this, please note the note
                      &ldquo;no letter&rdquo; when making the transfer.
                    </p>
                  </div>
                </div>

                {/* Donation Account Section */}
                <div className="rounded-2xl shadow-xl p-8 border-2 border-orange-200 max-w-2xl mx-auto bg-[#fad20a]">
                  <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                    Our donation account
                  </h3>

                  <div className="space-y-4 text-center">
                    <p className="text-lg text-gray-700">
                      Aid project MARIPHIL e.V.
                    </p>

                    <div className="py-4 border-y border-gray-200">
                      <p className="text-base text-gray-700 mb-1">
                        <strong>Keyword:</strong> Aktion Reissack
                      </p>
                    </div>

                    <div className="space-y-3 py-4">
                      <p className="text-lg">
                        <strong className="text-gray-900">IBAN:</strong>{" "}
                        <span className="font-mono text-sm text-gray-700">
                          DE78 6009 0700 0863 1780 06
                        </span>
                      </p>
                      <p className="text-lg">
                        <strong className="text-gray-900">BIC:</strong>{" "}
                        <span className="font-mono text-sm text-gray-700">
                          SWBSDESS
                        </span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Please be sure to enter your password and address so
                        that we can send you a donation receipt!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Impact Stats Section */}
            {project.slug === "mariphil-childrens-village" && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20">
                  <div className="text-5xl font-bold text-primary mb-2">
                    100+
                  </div>
                  <div className="text-gray-700 font-medium">
                    Children Cared For
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20">
                  <div className="text-5xl font-bold text-primary mb-2">
                    15+
                  </div>
                  <div className="text-gray-700 font-medium">
                    Years of Service
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center border border-primary/20">
                  <div className="text-5xl font-bold text-primary mb-2">
                    95%
                  </div>
                  <div className="text-gray-700 font-medium">Success Rate</div>
                </div>
              </div>
            )}
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-50 via-teal-50 to-white py-20">
        <div className="text-center px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto">
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
        </div>
      </section>
    </div>
  );
}
