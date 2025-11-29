import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTravelBySlug, getTravelSlugs } from "@/lib/travels";
import { ImageCarousel } from "@/components/ImageCarousel";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface TravelPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getTravelSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: TravelPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const travel = getTravelBySlug(slug);
    return {
      title: `${travel.metadata.country} - ${travel.metadata.title}`,
      description:
        travel.metadata.description ||
        `Путешествие в ${travel.metadata.country}`,
    };
  } catch {
    return {
      title: "Travel not found",
    };
  }
}

export default async function TravelPage({ params }: TravelPageProps) {
  const { slug } = await params;

  let travel;
  try {
    travel = getTravelBySlug(slug);
  } catch {
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
        <h1 className="text-3xl font-bold mb-2">
          {travel.metadata.country}
        </h1>
        <div className="text-gray-600 text-sm">
          <time dateTime={travel.metadata.date}>{travel.metadata.date}</time>
        </div>
        {travel.metadata.description && (
          <p className="text-lg text-gray-700 mt-4">
            {travel.metadata.description}
          </p>
        )}
      </div>

      <div className="mdx-content">
        <MDXRemote
          source={travel.content}
          components={components}
          options={options}
        />
      </div>
    </article>
  );
}
