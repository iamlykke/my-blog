import Link from "next/link";
import { Metadata } from "next";
import { getTravelsByYear } from "@/lib/travels";

export const metadata: Metadata = {
  title: "Travel",
  description: "Мои путешествия по миру",
};

export default function TravelPage() {
  const travelsByYear = getTravelsByYear();
  const years = Object.keys(travelsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <p className="mb-5 text-gray-600">
        Здесь я делюсь впечатлениями и фотографиями из моих путешествий
      </p>

      <div className="space-y-8">
        {years.map((year) => (
          <div key={year}>
            <h2 className="text-2xl font-bold mb-4">{year}</h2>
            <ul className="space-y-2">
              {travelsByYear[year].map((travel) => (
                <li key={travel.slug} className="flex items-baseline gap-3">
                  <span className="font-bold text-lg min-w-[2rem]">
                    {String(travel.metadata.order).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/travel/${travel.slug}`}
                    className="text-lg hover:underline hover:text-primary transition-colors"
                  >
                    {travel.metadata.country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {years.length === 0 && (
          <p className="text-gray-500 italic">
            Пока нет добавленных путешествий
          </p>
        )}
      </div>
    </div>
  );
}
