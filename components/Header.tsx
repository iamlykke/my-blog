"use client";

import { usePathname, useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const previousPage = pathname !== "/";

  const getFormattedPath = (path: string): string => {
    if (path === "/") return "Lykke";
    if (path.startsWith("/concerts")) return "Concerts";
    return path.slice(1).charAt(0).toUpperCase() + path.slice(2);
  };

  return (
    <div className="navbar p-0 justify-center h-fit relative max-w-[768px] mx-auto mb-7">
      {previousPage && (
        <button
          onClick={() => router.back()}
          className="absolute left-0 text-md hover:underline cursor-pointer"
        >
          ← Назад
        </button>
      )}

      <p className="relative text-2xl font-bold">
        {getFormattedPath(pathname)}
      </p>
    </div>
  );
};
