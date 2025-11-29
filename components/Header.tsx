"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const previousPage = pathname !== "/";

  const getFormattedPath = (path: string): string => {
    if (path === "/" || path.startsWith("/posts/")) return "My Blog";

    const pathMap: Record<string, string> = {
      "/concerts": "Concerts",
      "/games": "Games",
    };

    return pathMap[path] || path.slice(1).charAt(0).toUpperCase() + path.slice(2);
  };

  return (
    <div className="navbar p-0 justify-center h-fit relative max-w-[768px] mx-auto mb-7">
      {previousPage && (
        <Link href="/" className="absolute left-0 text-md">
          ← Назад
        </Link>
      )}

      <p className="relative text-2xl font-bold">
        {getFormattedPath(pathname)}
      </p>
    </div>
  );
};
