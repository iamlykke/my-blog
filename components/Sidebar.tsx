"use client";

import { SidebarLink } from "./SidebarLink";
import { FaGamepad, FaHouse, FaMusic } from "react-icons/fa6";
import { PiFilmSlateFill } from "react-icons/pi";

export const Sidebar = () => {
  const initials = "SU";

  return (
    <aside className="sticky top-0 w-64 h-screen bg-base-200 text-white  flex-col justify-between px-4 py-6 hidden lg:flex">
      <div>
        {/* Аватар и имя */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">
            {initials}
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm font-semibold">Sergei Usachev</p>
            <p className="text-xs text-gray-400">usachev97@gmail.com</p>
          </div>
        </div>

        {/* Разделы */}
        <SidebarSection title="Menu">
          <SidebarLink icon={<FaHouse />} label="Home" href="/" />
          <SidebarLink icon={<FaMusic />} label="Concerts" href="/concerts" />
          <SidebarLink icon={<FaGamepad />} label="Games" href="/games" />
          <SidebarLink
            icon={<PiFilmSlateFill />}
            label="Films"
            href="https://letterboxd.com/iamlykke/films/diary/"
          />
        </SidebarSection>
      </div>
    </aside>
  );
};

const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h4 className="text-xs text-gray-500 uppercase mb-2">{title}</h4>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);
