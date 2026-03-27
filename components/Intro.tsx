import Link from "next/link";
import { FaLastfmSquare, FaRecordVinyl, FaMap } from "react-icons/fa";
import { getAllConcerts, toIso } from "@/lib/concerts";

function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

export const Intro: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const all = getAllConcerts();
  const past = all.filter((c) => toIso(c.date) < today);

  const totalConcerts = past.length;
  const uniqueCities = new Set(
    past.map((c) => c.location.split(",")[0].trim()),
  ).size;
  const uniqueCountries = new Set(
    past.map((c) => c.location.split(",").pop()?.trim()),
  ).size;

  return (
    <section className="rounded-xl mb-4 w-full">
      <h1 className="text-2xl font-bold tracking-tight mb-1 text-center">
        Моя концертная жизнь
      </h1>
      <p className="text-sm text-base-content/50 mb-6 text-center">
        Фотки и заметки с концертов
      </p>

      <div className="flex gap-6 mb-6 justify-center">
        <div>
          <p className="text-3xl font-bold">{totalConcerts}</p>
          <p className="text-xs text-base-content/50 mt-0.5">{pluralize(totalConcerts, "концерт", "концерта", "концертов")}</p>
        </div>
        <div className="w-px bg-base-content/10" />
        <div>
          <p className="text-3xl font-bold">{uniqueCities}</p>
          <p className="text-xs text-base-content/50 mt-0.5">{pluralize(uniqueCities, "город", "города", "городов")}</p>
        </div>
        <div className="w-px bg-base-content/10" />
        <div>
          <p className="text-3xl font-bold">{uniqueCountries}</p>
          <p className="text-xs text-base-content/50 mt-0.5">{pluralize(uniqueCountries, "страна", "страны", "стран")}</p>
        </div>
      </div>

      <div className="flex flex-row gap-3 justify-center">
        <a
          href="https://www.last.fm/user/iamlykke"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors"
        >
          <FaLastfmSquare size="1.1rem" />
          Last.fm
        </a>
        <a
          href="https://roundnsquare.club/lykke"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors"
        >
          <FaRecordVinyl size="1.1rem" />
          Vinyl collection
        </a>
        <Link
          href="/map"
          className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors"
        >
          <FaMap size="1.1rem" />
          Concerts map
        </Link>
      </div>
    </section>
  );
};
