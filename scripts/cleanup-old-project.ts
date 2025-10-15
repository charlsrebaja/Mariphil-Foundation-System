import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Removing old projects...');
  
  // Remove Healthcare and Nutrition Program
  try {
    const deleted1 = await prisma.project.delete({
      where: { slug: 'healthcare-nutrition-program' },
    });
    console.log('Successfully deleted:', deleted1.title);
  } catch (error) {
    console.log('Healthcare project already removed or does not exist');
  }
  
  // Remove Education Program 2024
  try {
    const deleted2 = await prisma.project.delete({
      where: { slug: 'education-program-2024' },
    });
    console.log('Successfully deleted:', deleted2.title);
  } catch (error) {
    console.log('Education project already removed or does not exist');
  }
  
  console.log('Cleanup completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });