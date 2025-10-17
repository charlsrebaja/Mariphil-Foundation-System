import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating cover image for Martin Riester article...');

  try {
    const article = await prisma.news.findUnique({
      where: { slug: 'martin-riester-project-trip-philippines' },
    });

    if (article) {
      await prisma.news.update({
        where: { slug: 'martin-riester-project-trip-philippines' },
        data: {
          coverImage: "/images/news/Martin Riester's project.png",
        },
      });
      console.log('✅ Successfully updated the cover image');
    } else {
      console.log('❌ Article not found');
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