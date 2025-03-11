interface ICard {
  title: string;
  description: string;
  createdAt: string;
}

export const Card = ({ title, description, createdAt }: ICard) => {
  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <div className="card-body w-full">
        <div className="flex justify-between w-full items-center">
          <h2 className="card-title">{title}</h2>
          <span className="w-fit">{createdAt}</span>
        </div>

        <p>{description}</p>
      </div>
    </div>
  );
};
