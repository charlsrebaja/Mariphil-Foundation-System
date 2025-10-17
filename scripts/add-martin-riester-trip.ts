import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding "Martin Riester\'s project trip to the Philippines" article...');

  try {
    // Check if the article already exists
    const existing = await prisma.news.findUnique({
      where: { slug: 'martin-riester-project-trip-philippines' },
    });

    if (existing) {
      console.log('ℹ️  Article already exists, updating it...');
      await prisma.news.update({
        where: { slug: 'martin-riester-project-trip-philippines' },
        data: {
          title: "Martin Riester's project trip to the Philippines",
          excerpt: "Our board member Martin Riester visited the Philippines to see our projects firsthand and meet with the children and staff.",
          content: `
# Martin Riester's project trip to the Philippines

Our board member Martin Riester recently completed an inspiring project trip to the Philippines, visiting the MARIPHIL Children's Village and other project sites.

## Purpose of the Visit

The visit aimed to:
- Assess the current status of ongoing projects
- Meet with the children and staff at the Children's Village
- Evaluate future development opportunities
- Strengthen partnerships with local organizations
- Document the impact of donor contributions

## Highlights of the Trip

### Children's Village Visit
Martin spent quality time with the children at the MARIPHIL Children's Village, witnessing firsthand the positive impact of the program on their lives. The children warmly welcomed him with performances and shared their dreams for the future.

### Project Site Inspections
Multiple project sites were visited, including:
- The water treatment plant serving the local community
- Reforestation areas where thousands of trees have been planted
- Health care facilities providing essential services
- Educational programs supporting children's development

### Community Engagement
Martin met with local community leaders and beneficiaries, gathering valuable feedback on how MARIPHIL's programs are making a difference in their lives.

## Key Observations

The trip reinforced the critical importance of continued support for:
- Quality education for disadvantaged children
- Sustainable livelihood programs for families
- Healthcare access in underserved communities
- Environmental conservation initiatives

## Looking Forward

Martin returned with renewed commitment to MARIPHIL's mission and valuable insights for future project development. The trip strengthened the connection between our supporters in Germany and the communities we serve in the Philippines.

## Thank You

We extend our gratitude to all who made this visit possible and to our donors whose contributions make our work sustainable and impactful.
          `.trim(),
          coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600',
          publishedAt: new Date('2025-04-04'),
        },
      });
      console.log('✅ Successfully updated the article');
    } else {
      await prisma.news.create({
        data: {
          title: "Martin Riester's project trip to the Philippines",
          slug: 'martin-riester-project-trip-philippines',
          excerpt: "Our board member Martin Riester visited the Philippines to see our projects firsthand and meet with the children and staff.",
          content: `
# Martin Riester's project trip to the Philippines

Our board member Martin Riester recently completed an inspiring project trip to the Philippines, visiting the MARIPHIL Children's Village and other project sites.

## Purpose of the Visit

The visit aimed to:
- Assess the current status of ongoing projects
- Meet with the children and staff at the Children's Village
- Evaluate future development opportunities
- Strengthen partnerships with local organizations
- Document the impact of donor contributions

## Highlights of the Trip

### Children's Village Visit
Martin spent quality time with the children at the MARIPHIL Children's Village, witnessing firsthand the positive impact of the program on their lives. The children warmly welcomed him with performances and shared their dreams for the future.

### Project Site Inspections
Multiple project sites were visited, including:
- The water treatment plant serving the local community
- Reforestation areas where thousands of trees have been planted
- Health care facilities providing essential services
- Educational programs supporting children's development

### Community Engagement
Martin met with local community leaders and beneficiaries, gathering valuable feedback on how MARIPHIL's programs are making a difference in their lives.

## Key Observations

The trip reinforced the critical importance of continued support for:
- Quality education for disadvantaged children
- Sustainable livelihood programs for families
- Healthcare access in underserved communities
- Environmental conservation initiatives

## Looking Forward

Martin returned with renewed commitment to MARIPHIL's mission and valuable insights for future project development. The trip strengthened the connection between our supporters in Germany and the communities we serve in the Philippines.

## Thank You

We extend our gratitude to all who made this visit possible and to our donors whose contributions make our work sustainable and impactful.
          `.trim(),
          coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600',
          publishedAt: new Date('2025-04-04'),
        },
      });
      console.log('✅ Successfully created the article');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });