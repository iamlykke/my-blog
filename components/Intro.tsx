import {
  FaLinkedin,
  FaTelegram,
  FaGithub,
  FaInstagram,
  FaSpotify,
} from "react-icons/fa";

export const Intro: React.FC = () => {
  return (
    <section className="card bg-base-100 my-5 flex flex-row gap-4 shadow-sm p-6">
      <figure className="avatar">
        <div className="w-30 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
        </div>
      </figure>
      <div className="flex flex-col w-full">
        <h2 className="font-bold text-lg">Добро пожаловать в мой блог!</h2>
        <p className="text-md mt-1">
          Собираю здесь всё, что люблю и что меня окружает: концерты, фильмы,
          игры, путешествия и прочие заметки.
        </p>
        <div className="flex flex-row justify-between mt-4">
          <div className="flex gap-2 text-xl text-gray-600">
            <a href="https://linkedin.com/in/yourname" target="_blank">
              <FaLinkedin />
            </a>
            <a href="https://t.me/yourname" target="_blank">
              <FaTelegram />
            </a>
            <a href="https://github.com/yourname" target="_blank">
              <FaGithub />
            </a>
            <a href="https://instagram.com/yourname" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://open.spotify.com/user/yourname" target="_blank">
              <FaSpotify />
            </a>
          </div>
          <div className="text-sm text-gray-500">📍 Serbia, Novi Sad</div>
        </div>
      </div>
    </section>
  );
};
