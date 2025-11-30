import { Metadata } from "next";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.metadata.title,
      description: post.metadata.description || post.metadata.title,
    };
  } catch {
    return {
      title: "Post not found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { metadata, content } = post;
  const withTags = metadata?.tags.length > 0;

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  };

  return (
    <article>
      <div className="mb-5">
        <div className="flex flex-row w-full justify-between gap-1 items-center">
          <h1 className="text-2xl font-bold">{metadata.title}</h1>
          <time
            dateTime={`${metadata.created}T00:00:00.000Z`}
            className="text-sm"
          >
            {metadata.created}
          </time>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          {withTags ? (
            <div className="flex flex-row gap-1">
              {metadata.tags.map((tag: string) => (
                <span key={tag}>
                  <Link className="tag no-underline" href="#">
                    {`#${tag}`}
                  </Link>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mdx-content">
        <MDXRemote source={content} options={options} />
      </div>
    </article>
  );
}
