import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mariphilfoundation.org' },
    update: {},
    create: {
      email: 'admin@mariphilfoundation.org',
      name: 'Admin User',
      role: 'admin',
      passwordHash: hashedPassword,
    },
  });

  console.log('Created admin user:', admin);

  // Create sample project
  const project = await prisma.project.upsert({
    where: { slug: 'education-program-2024' },
    update: {},
    create: {
      title: 'Education Program 2024',
      slug: 'education-program-2024',
      summary: 'Supporting children\'s education with school supplies and scholarships.',
      content: `
# Education Program 2024

Our Education Program provides comprehensive support to underprivileged children in the Philippines.

## Goals
- Provide school supplies to 500 children
- Grant 50 scholarships for high school students
- Conduct after-school tutoring programs

## Impact
Through this program, we aim to break the cycle of poverty by ensuring every child has access to quality education.
      `.trim(),
      coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      status: 'active',
    },
  });

  console.log('Created project:', project);

  // Create sample news posts
  const news1 = await prisma.news.upsert({
    where: { slug: 'sports-festival-childrens-village' },
    update: {
      coverImage: '/images/news/Sportfest im Kinderdorf.jpeg',
    },
    create: {
      title: 'Sports Festival in the Children\'s Village',
      slug: 'sports-festival-childrens-village',
      excerpt: 'An exciting day of sports and games brought joy to all the children at our village.',
      content: `
# Sports Festival in the Children's Village

Our children's village recently hosted an exciting sports festival filled with fun activities and friendly competition!

## Activities

The day included:
- Basketball and volleyball tournaments
- Relay races and obstacle courses
- Traditional Filipino games (patintero, tumbang preso)
- Prizes and medals for all participants

## Community Spirit

The event brought together children, staff, and volunteers in a celebration of teamwork, sportsmanship, and community spirit. Every child received participation medals and enjoyed refreshments throughout the day.

## Thank You

Special thanks to our volunteers and donors who made this event possible. Your support brings smiles and creates lasting memories for our children.
      `.trim(),
      coverImage: '/images/news/Sportfest im Kinderdorf.jpeg',
      publishedAt: new Date('2025-01-15'),
    },
  });

  const news2 = await prisma.news.upsert({
    where: { slug: 'summer-festival-2025' },
    update: {
      coverImage: '/images/news/Sommerfest 2025.jpg',
    },
    create: {
      title: 'Summer Festival 2025',
      slug: 'summer-festival-2025',
      excerpt: 'Join us for our annual Summer Festival celebration with activities for the whole community!',
      content: `
# Summer Festival 2025

Mark your calendars! Mariphil Foundation presents the Summer Festival 2025, a day of fun, food, and fellowship.

## Event Details

**Date:** April 20, 2025
**Time:** 9:00 AM - 5:00 PM
**Location:** Mariphil Children's Village

## Festival Highlights

- Live music and performances
- Food stalls featuring Filipino cuisine
- Games and activities for children
- Arts and crafts booths
- Raffle draws with exciting prizes

## Get Involved

We welcome volunteers and sponsors to help make this event special. Contact us to learn how you can participate!

All proceeds will support our educational programs and children's village operations.
      `.trim(),
      coverImage: '/images/news/Sommerfest 2025.jpg',
      publishedAt: new Date('2025-02-01'),
    },
  });

  const news3 = await prisma.news.upsert({
    where: { slug: 'mariphil-summer-festival-2025' },
    update: {
      coverImage: '/images/news/MARIPHIL Sommerfest 2025.jpeg',
    },
    create: {
      title: 'MARIPHIL Summer Festival 2025',
      slug: 'mariphil-summer-festival-2025',
      excerpt: 'A celebration of community, culture, and hope - don\'t miss our biggest event of the year!',
      content: `
# MARIPHIL Summer Festival 2025

Get ready for the most anticipated event of the year! The MARIPHIL Summer Festival is back and bigger than ever.

## What to Expect

This year's festival promises:
- Cultural performances showcasing Filipino heritage
- Interactive workshops for children and families
- Local vendor market supporting small businesses
- Photo booth and selfie stations
- Special guest speakers and testimonials

## Impact Your Community

By attending, you're not just having fun - you're supporting:
- Educational scholarships for underprivileged children
- Healthcare programs in underserved communities
- Sustainable livelihood projects for families

## Registration

Early bird tickets available now! Visit our website or contact our office to secure your spot.

Let's celebrate together and make a difference in the lives of Filipino children and families!
      `.trim(),
      coverImage: '/images/news/MARIPHIL Sommerfest 2025.jpeg',
      publishedAt: new Date('2025-02-10'),
    },
  });

  console.log('Created news posts:', news1, news2, news3);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });