import Link from "next/link";

interface ICard {
  slug: string;
  title: string;
  created: string;
  tags: string[];
}

export const Card = ({ slug, title, created, tags }: ICard) => {
  return (
    <div className="flex flex-col w-full gap-0.5">
      <div className="flex justify-between w-full items-center">
        <Link href={`/posts/${slug}`}>
          <h3 className="card-title font-bold">{title}</h3>
        </Link>
        <span className="w-fit text-sm font-medium">{created}</span>
      </div>
      <div className="flex flex-row gap-1">
        {tags.map((tag: string, index: number) => (
          <span key={tag}>
            <Link
              className="text-xs text-gray-500 hover:text-gray-700"
              href="#"
            >{`#${tag}`}</Link>
            {index < tags.length - 1 && ", "}
          </span>
        ))}
      </div>
    </div>
  );
};
