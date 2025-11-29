import Games from "@/content/games/games.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games | My Blog",
  description: "Список пройденных игр",
};

export default function GamesPage() {
  return (
    <div>
      <p className="mb-3">Список игр, которые я прошел</p>
      <Games />
    </div>
  );
}
