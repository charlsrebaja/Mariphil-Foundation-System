import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Sponsorships image...');
  
  try {
    const updated = await prisma.project.update({
      where: { slug: 'sponsorships' },
      data: {
        coverImage: '/images/projects/Sponsorships.jpg',
      },
    });
    console.log('Successfully updated:', updated.title);
    console.log('New image:', updated.coverImage);
  } catch (error) {
    console.error('Error updating project:', error);
  }
  
  console.log('Update completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });