import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Получение всех slug
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
}

// Получение поста по slug
export function getPostBySlug(slug: string) {
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
export function getAllPosts() {
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