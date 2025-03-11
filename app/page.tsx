import { Blog } from "@/components/Blog";

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "Article",
      description: "Small notes aboiut my life",
      createdAt: "08.03.2025",
    },
    {
      id: 2,
      title: "Evangelion",
      description: "It was amazing",
      createdAt: "10.03.2025",
    },
    {
      id: 3,
      title: "Trip to Belgrade",
      description: "Cool and rainy",
      createdAt: "11.03.2025",
    },
  ];

  return <Blog posts={posts} />;
}
