import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking for "mariphil-summer-festival-2025" article...');

  try {
    // Check if the article exists
    const article = await prisma.news.findUnique({
      where: { slug: 'mariphil-summer-festival-2025' },
    });

    if (article) {
      console.log('Found article:', article.title);
      
      // Delete the article
      await prisma.news.delete({
        where: { slug: 'mariphil-summer-festival-2025' },
      });
      
      console.log('✅ Successfully deleted the article');
    } else {
      console.log('ℹ️  Article not found in database - nothing to delete');
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