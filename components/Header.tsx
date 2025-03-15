"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const previousPage = pathname !== "/";

  const getFormattedPath = (path: string) => {
    if (path === "/" || path.startsWith("/posts/")) return "My Blog";

    const name = path.replace("/", "");
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="navbar bg-base-200 p-0 justify-center h-fit relative">
      {previousPage && (
        <Link href="/" className="absolute left-2">
          ← Назад
        </Link>
      )}

      <p className="text-xl text-black font-bold">
        {getFormattedPath(pathname)}
      </p>
    </div>
  );
};
