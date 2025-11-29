import Link from "next/link";

export const Lists = () => {
  return (
    <section className="flex flex-col card bg-base-200 my-5 gap-2 shadow-sm p-2">
      <ul className="list">
        <li className="list-row">
          <Link href={"/concerts"} className="text-md ">
            Посещенные концерты
          </Link>
        </li>
        <li className="list-row">
          <Link href={"/games"} className="text-md">
            Пройденные игры
          </Link>
        </li>
        <li className="list-row">
          <Link
            target="_blank"
            href={"https://letterboxd.com/iamlykke/films/diary/"}
            className="text-md"
          >
            Просмотренные фильмы (letterboxd)
          </Link>
        </li>
        <li className="list-row">
          <Link href={"/travel"} className="text-md">
            Путешествия
          </Link>
        </li>
        {/* <li className="text-md list-row">
          <Link href={"/concerts"} className="link-blue-underline">
            Прочитаные книги
          </Link>
        </li> */}
      </ul>
    </section>
  );
};
