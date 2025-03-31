import Link from "next/link";
import Image from "next/image";

interface ISocial {
  id: number;
  icon: string;
  link: string;
  alt: string;
}

export const Footer = () => {
  const socials: ISocial[] = [
    {
      id: 1,
      icon: "/images/socials/linkedin.svg",
      link: "https://www.linkedin.com/in/sergeiusachev/",
      alt: "linkedin icon",
    },
    {
      id: 2,
      icon: "/images/socials/telegram.svg",
      link: "https://t.me/iamlykke",
      alt: "telegram icon",
    },
    {
      id: 3,
      icon: "/images/socials/instagram.svg",
      link: "https://instagram.com/sergeiusachev",
      alt: "instagram icon",
    },
  ];

  return (
    <footer className="w-full footer footer-horizontal footer-center bg-base-200 text-base-content pb-5 pt-12 rounded-b-none mt-auto">
      <aside className="flex flex-row justify-between w-full">
        {/* <p>Copyright © {new Date().getFullYear()} - Lykke</p> */}
        <Image
          src={"/images/footer/sleep.gif"}
          width={100}
          height={80}
          alt={"nyan gif"}
        />
        <div className="flex gap-4">
          {socials.map((social) => (
            <Link
              key={social.id}
              href={social.link}
              target="_blank"
              className="opacity-50 hover:opacity-100"
            >
              <Image
                src={social.icon}
                width={28}
                height={28}
                alt={social.alt}
              />
            </Link>
          ))}
        </div>
      </aside>
    </footer>
  );
};
