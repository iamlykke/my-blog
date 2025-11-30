import { Metadata } from "next";
import { PostPreview } from "@/components/PostPreview";
import { getPostSlugs, getPostBySlug } from "@/lib/posts";
import { Post } from "@/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "Мои заметки, обзоры и размышления",
};

export default function BlogPage() {
  const slugs = getPostSlugs();
  const posts: Post[] = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => !post.metadata.draft)
    .sort((a, b) => {
      const dateA = new Date(a.metadata.created);
      const dateB = new Date(b.metadata.created);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div>
      <p className="mb-5 text-gray-600">
        Здесь я пишу о том, что меня интересует — от обзоров всего угодно до
        размышлений о музыке
      </p>

      <div className="flex flex-col gap-5">
        {posts.map((post: Post) => {
          return (
            <PostPreview
              key={post.slug}
              slug={post.slug}
              title={post.metadata.title}
              created={post.metadata.created}
              tags={post.metadata.tags}
            />
          );
        })}
      </div>

      {posts.length === 0 && (
        <p className="text-gray-500 italic">Пока нет добавленных постов</p>
      )}
    </div>
  );
}
