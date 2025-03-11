import { Card } from "./Card";

interface IPost {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export const Blog = ({ posts }: { posts: IPost[] }) => {
  return (
    <div className="grid gap-5">
      {posts.map((post: IPost) => {
        return (
          <Card
            key={post.id}
            title={post.title}
            description={post.description}
            createdAt={post.createdAt}
          />
        );
      })}
    </div>
  );
};
