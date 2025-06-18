import { Intro } from "@/components/Intro";
import { Lists } from "@/components/Lists";
import { PostPreview } from "@/components/PostPreview";
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
      <Lists />
      <div className="grid gap-3 my-8">
        <h2 className="text-xl font-bold">Мои посты</h2>
        <div className="flex flex-col gap-4">
          {posts.map((post: IPost) => {
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
      </div>
    </div>
  );
}
