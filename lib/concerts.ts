import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Concert } from '@/types';

const concertsDirectory = path.join(process.cwd(), 'content/concerts');

export function getConcertSlugs(): string[] {
  if (!fs.existsSync(concertsDirectory)) {
    return [];
  }
  return fs.readdirSync(concertsDirectory).filter(
    file => file.endsWith('.mdx') && file !== 'concerts.mdx'
  );
}

export function getConcertBySlug(slug: string): Concert {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(concertsDirectory, `${realSlug}.mdx`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    metadata: {
      artist: data.artist,
      date: data.date,
      location: data.location,
      venue: data.venue,
      year: data.year,
      draft: data.draft,
    },
    content,
    hasContent: content.trim().length > 0,
  };
}

export function getAllConcerts(): Concert[] {
  const slugs = getConcertSlugs();
  return slugs
    .map(slug => getConcertBySlug(slug))
    .filter(concert => !concert.metadata.draft)
    .sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
}

export function getConcertsByGroup(): {
  upcoming: Concert[];
  byYear: Record<number, Concert[]>;
} {
  const today = new Date().toISOString().split('T')[0];
  const concerts = getAllConcerts();

  const upcoming: Concert[] = [];
  const byYear: Record<number, Concert[]> = {};

  concerts.forEach(concert => {
    if (concert.metadata.date >= today) {
      upcoming.push(concert);
    } else {
      const year = concert.metadata.year;
      if (!year || isNaN(year)) return;
      if (!byYear[year]) {
        byYear[year] = [];
      }
      byYear[year].push(concert);
    }
  });

  // Upcoming sorted ascending (nearest first)
  upcoming.sort((a, b) => a.metadata.date.localeCompare(b.metadata.date));

  return { upcoming, byYear };
}

export function formatConcertDate(isoDate: string): string {
  const [, month, day] = isoDate.split('-');
  return `${day}.${month}`;
}
