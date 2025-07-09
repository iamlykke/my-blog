import {
  FaLinkedin,
  FaTelegram,
  FaGithub,
  FaLastfmSquare,
} from "react-icons/fa";

export const Intro: React.FC = () => {
  return (
    <section className="card bg-base-200 my-5 flex flex-row gap-4 shadow-sm p-6">
      <div className="flex flex-col w-full">
        <h2 className="font-bold text-lg">Добро пожаловать в мой блог!</h2>
        <p className="text-sm mt-2">
          Собираю здесь всё, что люблю и что меня окружает: концерты, фильмы,
          игры, путешествия и прочие заметки.
        </p>
        <div className="flex flex-row justify-between mt-4 items-center">
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/in/sergeiusachev/"
              target="_blank"
            >
              <FaLinkedin
                size="1.5rem"
                className="opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </a>
            <a href="https://t.me/iamlykke" target="_blank">
              <FaTelegram
                size="1.5rem"
                className="opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </a>
            <a href="https://github.com/iamlykke" target="_blank">
              <FaGithub
                size="1.5rem"
                className="opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </a>
            <a href="https://www.last.fm/user/iamlykke" target="_blank">
              <FaLastfmSquare
                size="1.5rem"
                className="opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </a>
          </div>
          <div className="text-sm text-gray-500">📍 Serbia, Novi Sad</div>
        </div>
      </div>
    </section>
  );
};
