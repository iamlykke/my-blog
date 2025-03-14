import Link from "next/link";

interface ICard {
  slug: string;
  title: string;
  description: string;
  created: string;
}

export const Card = ({ slug, title, description, created }: ICard) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex justify-between w-full items-center">
        <Link href={`/posts/${slug}`}>
          <h3 className="card-title font-bold">{title}</h3>
        </Link>

        <span className="w-fit text-sm font-medium">{created}</span>
      </div>

      <p className="text-sm">{description}</p>
    </div>
  );
};
