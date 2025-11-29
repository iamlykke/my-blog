"use client";

import { usePathname, useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const previousPage = pathname !== "/";

  const getFormattedPath = (path: string): string => {
    if (path === "/" || path.startsWith("/posts/")) return "My Blog";

    // Для страниц путешествий всегда показываем "Travel"
    if (path.startsWith("/travel")) return "Travel";

    const pathMap: Record<string, string> = {
      "/concerts": "Concerts",
      "/games": "Games",
      "/travel": "Travel",
    };

    return (
      pathMap[path] || path.slice(1).charAt(0).toUpperCase() + path.slice(2)
    );
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
