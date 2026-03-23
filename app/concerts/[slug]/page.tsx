import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getConcertBySlug, getConcertSlugs, formatConcertDate } from "@/lib/concerts";
import { ImageCarousel } from "@/components/ImageCarousel";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface ConcertPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getConcertSlugs();
  return slugs
    .map((slug) => ({ slug: slug.replace(/\.mdx$/, "") }))
    .filter((params) => {
      try {
        const concert = getConcertBySlug(params.slug);
        return concert.hasContent;
      } catch {
        return false;
      }
    });
}

export async function generateMetadata({
  params,
}: ConcertPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const concert = getConcertBySlug(slug);
    return {
      title: concert.metadata.artist,
      description: `${concert.metadata.artist} — ${concert.metadata.location}, ${formatConcertDate(concert.metadata.date)}`,
    };
  } catch {
    return { title: "Concert not found" };
  }
}

export default async function ConcertPage({ params }: ConcertPageProps) {
  const { slug } = await params;

  let concert;
  try {
    concert = getConcertBySlug(slug);
  } catch {
    notFound();
  }

  if (!concert.hasContent) {
    notFound();
  }

  const components = {
    ImageCarousel,
  };

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  };

  return (
    <article className="prose prose-lg max-w-none">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">{concert.metadata.artist}</h1>
        <div className="text-gray-500 text-sm">
          {formatConcertDate(concert.metadata.date)}.{concert.metadata.year} —{" "}
          {concert.metadata.location}
          {concert.metadata.venue && ` — ${concert.metadata.venue}`}
        </div>
      </div>

      <div className="mdx-content">
        <MDXRemote
          source={concert.content}
          components={components}
          options={options}
        />
      </div>
    </article>
  );
}
