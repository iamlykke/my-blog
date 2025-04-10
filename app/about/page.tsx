import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="mt-5">
      <Image
        src={"/images/about/me.png"}
        width={768}
        height={200}
        alt="My photo"
        className="shadow rounded-sm object-cover"
      />
      <h2 className="text-3xl font-bold mt-10 mb-2">👋 Привет</h2>
      <p className="text-m">Я фронтендер Серёга</p>
      <p className="text-m">
        Играю на гитаре, в большой теннис, люблю путешествовать, ходить на
        концерты и вот это вот всё
      </p>
      <h2 className="text-3xl font-bold mt-10 mb-2">📍 Локация</h2>
      <p className="text-m">Астрахань → Петербург → Нови сад</p>
      <h2 className="text-3xl font-bold mt-10 mb-2">🔗 Ссылки</h2>
      <ul>
        <li className="mb-2">
          <Link href="https://letterboxd.com/iamlykke/" target="_blank">
            Список просмотренных фильмов
          </Link>
        </li>
        <li className="mb-2">
          <Link href={"/concerts"}>Список посещенных концертов</Link>
        </li>
        <li className="mb-2">
          <Link href={"https://www.last.fm/user/iamlykke"} target="_blank">
            Мой last.fm
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href={"https://open.spotify.com/user/31ig4cpcmwmoqanmvwz26efmz75u"}
            target="_blank"
          >
            Spotify
          </Link>
        </li>
      </ul>
    </section>
  );
}
