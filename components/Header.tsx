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
        <p className="text-xl text-black font-bold">My Blog</p>
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

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full bg-gray-800"></div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
