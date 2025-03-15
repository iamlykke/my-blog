import Link from "next/link";

export const Intro: React.FC = () => {
  return (
    <section>
      <p className="text-xl font-semibold">Хеллоу в мой блог! 👋</p>
      <p className="text-sm">
        Здесь я рассказываю про то, что мне интересно, и что могло бы быть
        интересно вам
      </p>
      <p className="text-sm">
        Если вы сюда попали, значит что то уже обо мне знаете. Если нет, то
        добро пожаловать на <Link href="/about">страницу обо мне</Link>
      </p>
      <p className="text-sm">
        Веду список посещенных и планируемых концертов,{" "}
        <Link href={"/concerts"}>залетай</Link>
      </p>
    </section>
  );
};
