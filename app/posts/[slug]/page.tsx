import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx$/, "") }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const { metadata, content } = post;

  return (
    <article className="mt-7">
      <div className="mb-5">
        <div className="flex flex-row w-full justify-between  items-center">
          <h1 className="text-2xl font-bold">{metadata.title}</h1>
          <time
            date-time={`${metadata.created}T00:00:00.000Z`}
            className="text-sm text-gray-500"
          >
            {metadata.created}
          </time>
        </div>
        <p className="text-sm  text-gray-500">{metadata.description}</p>
      </div>

      <MDXRemote source={content} />
    </article>
  );
}
