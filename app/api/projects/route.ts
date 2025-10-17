import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'active',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}