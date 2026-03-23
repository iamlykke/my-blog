import { FaLastfmSquare } from "react-icons/fa";
import { getAllConcerts } from "@/lib/concerts";

export const Intro: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const all = getAllConcerts();
  const past = all.filter((c) => c.metadata.date < today);

  const totalConcerts = past.length;
  const uniqueCities = new Set(
    past.map((c) => c.metadata.location.split(",")[0].trim())
  ).size;
  const uniqueCountries = new Set(
    past.map((c) => c.metadata.location.split(",").pop()?.trim())
  ).size;

  return (
    <section className="rounded-xl mb-4 w-full">
      <h1 className="text-2xl font-bold tracking-tight mb-1">
        Моя концертная жизнь
      </h1>
      <p className="text-sm text-base-content/50 mb-6">
        фотки и заметки с концертов
      </p>

      <div className="flex gap-6 mb-6">
        <div>
          <p className="text-3xl font-bold">{totalConcerts}</p>
          <p className="text-xs text-base-content/50 mt-0.5">концертов</p>
        </div>
        <div className="w-px bg-base-content/10" />
        <div>
          <p className="text-3xl font-bold">{uniqueCities}</p>
          <p className="text-xs text-base-content/50 mt-0.5">городов</p>
        </div>
        <div className="w-px bg-base-content/10" />
        <div>
          <p className="text-3xl font-bold">{uniqueCountries}</p>
          <p className="text-xs text-base-content/50 mt-0.5">стран</p>
        </div>
      </div>

      <a
        href="https://www.last.fm/user/iamlykke"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors"
      >
        <FaLastfmSquare size="1.1rem" />
        Last.fm
      </a>
    </section>
  );
};
