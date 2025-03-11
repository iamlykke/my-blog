import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link href={"/about"} className="link link-hover">
          About me
        </Link>
        <Link href={"/contacts"} className="link link-hover">
          Contacts
        </Link>
      </nav>

      <aside>
        <p>Copyright © {new Date().getFullYear()} - Lykke</p>
      </aside>
    </footer>
  );
};
