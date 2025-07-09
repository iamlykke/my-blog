"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarLink = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`relative flex items-center gap-3 text-sm px-2 py-1 pl-4 rounded-lg transition 
        ${
          isActive
            ? "text-purple-400 font-semibold"
            : "text-gray-300 hover:text-purple-400"
        }`}
      style={{ textDecoration: "none" }}
    >
      {/* Левая полоска (только при активном состоянии) */}
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-1 rounded-full bg-purple-500" />
      )}

      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
};
