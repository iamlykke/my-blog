import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Travel } from '@/types';

const travelsDirectory = path.join(process.cwd(), 'content/travels');

// Получение всех slug путешествий
export function getTravelSlugs(): string[] {
  if (!fs.existsSync(travelsDirectory)) {
    return [];
  }
  return fs.readdirSync(travelsDirectory).filter(file => file.endsWith('.mdx'));
}

// Получение путешествия по slug
export function getTravelBySlug(slug: string): Travel {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(travelsDirectory, `${realSlug}.mdx`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    metadata: {
      title: data.title,
      country: data.country,
      date: data.date,
      year: data.year,
      order: data.order,
      description: data.description,
      draft: data.draft,
    },
    content,
  };
}

// Получение всех путешествий
export function getAllTravels(): Travel[] {
  const slugs = getTravelSlugs();
  return slugs
    .map(slug => getTravelBySlug(slug))
    .filter(travel => !travel.metadata.draft)
    .sort((a, b) => {
      // Сначала сортируем по году (сначала новые)
      if (a.metadata.year !== b.metadata.year) {
        return b.metadata.year - a.metadata.year;
      }
      // Затем по порядку внутри года (новые сверху)
      return b.metadata.order - a.metadata.order;
    });
}

// Группировка путешествий по годам
export function getTravelsByYear(): Record<number, Travel[]> {
  const travels = getAllTravels();
  const grouped: Record<number, Travel[]> = {};

  travels.forEach(travel => {
    if (!grouped[travel.metadata.year]) {
      grouped[travel.metadata.year] = [];
    }
    grouped[travel.metadata.year].push(travel);
  });

  return grouped;
}
