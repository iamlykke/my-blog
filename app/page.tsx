import { Card } from "@/components/Card";
import { Intro } from "@/components/Intro";
import { getAllPosts } from "@/lib/posts";

interface IPost {
  slug: string;
  metadata: {
    title: string;
    description: string;
    created: string;
    tags: string[];
    draft: boolean;
  };
  content: string;
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <Intro />
      <div className="grid gap-3 my-8">
        <h2 className="text-xl font-bold">Мои посты</h2>
        <div className="flex flex-col gap-3">
          {posts.map((post: IPost) => {
            return (
              <Card
                key={post.slug}
                slug={post.slug}
                title={post.metadata.title}
                description={post.metadata.description}
                created={post.metadata.created}
                tags={post.metadata.tags}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
