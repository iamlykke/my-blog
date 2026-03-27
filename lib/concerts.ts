import { Concert } from '@/types';
import concertsData from '@/content/concerts.json';

const concerts: Concert[] = concertsData as Concert[];

// Convert DD.MM.YYYY → YYYY-MM-DD for sorting/comparison
export function toIso(date: string): string {
  const [dd, mm, yyyy] = date.split('.');
  return `${yyyy}-${mm}-${dd}`;
}

export function getAllConcerts(): Concert[] {
  return [...concerts].sort((a, b) => toIso(b.date).localeCompare(toIso(a.date)));
}

export function getConcertsByGroup(): {
  upcoming: Concert[];
  byYear: Record<number, Concert[]>;
} {
  const today = new Date().toISOString().split('T')[0];
  const all = getAllConcerts();

  const upcoming: Concert[] = [];
  const byYear: Record<number, Concert[]> = {};

  all.forEach(concert => {
    if (toIso(concert.date) >= today) {
      upcoming.push(concert);
    } else {
      const year = parseInt(concert.date.slice(6), 10);
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(concert);
    }
  });

  upcoming.sort((a, b) => toIso(a.date).localeCompare(toIso(b.date)));

  return { upcoming, byYear };
}

export function formatConcertDate(date: string): string {
  return date.slice(0, 5); // DD.MM
}
