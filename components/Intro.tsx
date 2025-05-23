import Link from "next/link";

export const Intro: React.FC = () => {
  return (
    <section className="my-5">
      <p className="text-xl font-semibold">Хеллоу в мой блог! 👋</p>
      <p className="text-md">
        Здесь я рассказываю про то, что мне интересно, и что могло бы быть
        интересно вам
      </p>
      <p className="text-md">
        Если вы сюда попали, значит что то уже обо мне знаете. Если нет, то
        добро пожаловать на{" "}
        <Link href="/about" className="link-blue-underline">
          страницу обо мне
        </Link>
      </p>
      <p className="text-md">
        Веду список посещенных и планируемых концертов,{" "}
        <Link href={"/concerts"} className="link-blue-underline">
          залетай
        </Link>{" "}
        🤘
      </p>
    </section>
  );
};
