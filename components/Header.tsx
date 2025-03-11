"use client";

import { Pen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();

  const isNewPostPage = pathname === "/posts/new";
  const newPostButtonAppear: boolean = !isNewPostPage;

  return (
    <div className="navbar bg-base-200 p-0 justify-between h-fit">
      <Link href="/" className="w-fit">
        <p className="text-xl text-black font-bold">Blog</p>
      </Link>
      <div className="flex gap-4">
        {newPostButtonAppear && (
          <Link href="/posts/new">
            <button className="btn">
              <Pen width={16} />
              New post
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
