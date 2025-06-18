import Link from "next/link";

export const Lists = () => {
  return (
    <section className="flex flex-col card bg-base-100 my-5 gap-2 shadow-sm p-2">
      <ul className="list">
        <li className="list-row">
          <Link href={"/concerts"} className="link-blue-underline text-md ">
            Посещенные концерты
          </Link>
        </li>
        <li className="list-row">
          <Link href={"/games"} className="link-blue-underline text-md ">
            Пройденные игры
          </Link>
        </li>
        <li className="list-row">
          <Link href={"/concerts"} className="link-blue-underline text-md ">
            Посмотреные фильмы и аниме
          </Link>
        </li>
        {/* <li className="text-md list-row">
          <Link href={"/concerts"} className="link-blue-underline">
            Прочитаные книг
          </Link>
        </li> */}
      </ul>
    </section>
  );
};
