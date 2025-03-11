import { Github, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About me</a>
        <a className="link link-hover">Contacts</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            className="cursor-pointer"
            href="https://github.com/iamlykke"
            target="_blank"
          >
            <Github className="hover:stroke-gray-500 duration-200" />
          </a>
          <a
            className="cursor-pointer"
            href="https://instagram.com/sergeiusachev"
            target="_blank"
          >
            <Instagram className="hover:stroke-fuchsia-900 duration-200" />
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Lykke</p>
      </aside>
    </footer>
  );
};
