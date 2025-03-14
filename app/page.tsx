import { Card } from "@/components/Card";
import { Intro } from "@/components/Intro";
import { getAllPosts } from "@/lib/posts";

interface IPost {
  slug: string;
  metadata: {
    title: string;
    description: string;
    created: string;
    tags: string;
    draft: boolean;
  };
  content: string;
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <Intro />
      <div className="grid gap-3 py-8">
        <h2 className="text-2xl font-bold">Мои посты</h2>
        {posts.map((post: IPost) => {
          return (
            <Card
              key={post.slug}
              slug={post.slug}
              title={post.metadata.title}
              description={post.metadata.description}
              created={post.metadata.created}
            />
          );
        })}
      </div>
    </div>
  );
}
