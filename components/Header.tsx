"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface INavLink {
  linkTo: string;
  title: string;
  target?: string;
}

export const Header: React.FC = () => {
  const navLinks: INavLink[] = [
    { linkTo: "/", title: "Candles" },
    { linkTo: "/about", title: "About us" },
    { linkTo: "/wholesale", title: "Wholesale" },
    {
      linkTo: "https://flowwow.com/en-en/shop/austris-handmade-candles/",
      title: "Flowwow",
      target: "_blank",
    },
    { linkTo: "/contacts", title: "Contact us" },
    { linkTo: "/cart", title: "Cart" },
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <p className="text-xl text-black font-bold">My Blog</p>
      </div>
      <div className="flex gap-4">
        <button className="btn btn-soft btn-primary">New post</button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
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
