import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), "content/concerts/concerts.mdx");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);

  return {
    title: `${data.title}`,
    description: data.description,
  };
}

export default function ConcertsPage() {
  const filePath = path.join(process.cwd(), "content/concerts/concerts.mdx");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(fileContent);

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  };

  return (
    <div>
      <p className="mb-3">
        Актуальная инфа всегда{" "}
        <Link
          className="underline"
          href="https://www.last.fm/user/iamlykke"
          target="_blank"
        >
          тут
        </Link>
      </p>
      <div className="flex flex-col items-center mb-5 gap-2">
        <Image
          src="/images/concerts/chelsea-grin-2024.jpg"
          width={736}
          height={100}
          alt="Chelsea grin 2024"
          className="object-cover shadow rounded-sm"
        />
        <p className="italic text-sm">Chelsea Grin in Budapest, 2024</p>
      </div>

      <div className="mdx-content">
        <MDXRemote source={content} options={options} />
      </div>
    </div>
  );
}
