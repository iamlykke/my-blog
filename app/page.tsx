import { Blog } from "@/components/Blog";

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "My first trip",
      description: "it was amazing",
      createdAt: "08.03.2025",
    },
    {
      id: 2,
      title: "My second trip",
      description: "it was amazing",
      createdAt: "10.03.2025",
    },
    {
      id: 3,
      title: "My third trip",
      description: "it was amazing",
      createdAt: "11.03.2025",
    },
  ];

  return <Blog posts={posts} />;
}
