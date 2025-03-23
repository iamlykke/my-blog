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
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-7 pt-10 mt-auto">
      <aside className="flex flex-col gap-3">
        <div className="flex gap-2">
          {socials.map((social) => (
            <Link
              key={social.id}
              href={social.link}
              target="_blank"
              className="hover:opacity-50"
            >
              <Image
                src={social.icon}
                width={20}
                height={20}
                alt={social.alt}
              />
            </Link>
          ))}
        </div>
        <p>Copyright © {new Date().getFullYear()} - Lykke</p>
      </aside>
    </footer>
  );
};
