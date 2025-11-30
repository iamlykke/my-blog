import Link from "next/link";

interface IPostPreview {
  slug: string;
  title: string;
  created: string;
  tags: string[];
}

export const PostPreview = ({ slug, title, created, tags }: IPostPreview) => {
  // Определяем правильный URL в зависимости от типа контента
  const href = slug.startsWith('travel/') ? `/${slug}` : `/blog/${slug}`;

  return (
    <div className="flex flex-col w-full gap-0.5">
      <div className="flex justify-between w-full items-center gap-1">
        <Link href={href}>
          <h3 className="card-title font-bold text-pretty">{title}</h3>
        </Link>
        <span className="w-fit text-sm font-medium">{created}</span>
      </div>
      <div className="flex flex-row gap-1">
        {tags.map((tag: string) => (
          <span key={tag}>
            <Link className="tag no-underline" href="#">{`#${tag}`}</Link>
          </span>
        ))}
      </div>
    </div>
  );
};
