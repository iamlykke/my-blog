import Link from "next/link";

interface ICard {
  title: string;
  description: string;
  createdAt: string;
}

export const Card = ({ title, description, createdAt }: ICard) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex justify-between w-full items-center">
        <Link href="#">
          <h2 className="card-title underline underline-offset-1 font-bold">
            {title}
          </h2>
        </Link>

        <span className="w-fit text-sm font-medium">{createdAt}</span>
      </div>

      <p className="text-sm">{description}</p>
    </div>
  );
};
