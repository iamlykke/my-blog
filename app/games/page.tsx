import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), "content/games/games.mdx");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);

  return {
    title: `${data.title}`,
    description: data.description,
  };
}

export default function GamesPage() {
  const filePath = path.join(process.cwd(), "content/games/games.mdx");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  };

  return (
    <div className="mdx-content">
      <MDXRemote source={content} options={options} />
    </div>
  );
}
