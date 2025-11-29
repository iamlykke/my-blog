import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Получение всех slug
export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

// Получение поста по slug
export function getPostBySlug(slug: string): Post {

    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      metadata: {
        title: data.title,
        description: data.description,
        created: data.created,
        tags: data.tags,
        draft: data.draft,
      },
      content,
    };
}


// Получение всех постов
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map(slug => getPostBySlug(slug))
    .filter(post => !post.metadata.draft) // Игнорировать черновики
    .sort((a, b) => {
      const dateA = new Date(a.metadata.created);
      const dateB = new Date(b.metadata.created);
      return dateB.getTime() - dateA.getTime(); // Сортировка по дате (сначала новые)
    });
}