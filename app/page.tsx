import Link from "next/link";
import { Intro } from "@/components/Intro";
import { getConcertsByGroup, formatConcertDate } from "@/lib/concerts";
import { Concert } from "@/types";

function ConcertRow({ concert }: { concert: Concert }) {
  const date = formatConcertDate(concert.metadata.date);
  const { location, venue } = concert.metadata;
  const locationStr = venue ? `${venue}, ${location}` : location;

  const artist = concert.hasContent ? (
    <Link
      href={`/concerts/${concert.slug}`}
      className="hover:underline hover:text-primary transition-colors"
    >
      {concert.metadata.artist}
    </Link>
  ) : (
    <span>{concert.metadata.artist}</span>
  );

  return (
    <li className={!concert.hasContent ? "text-base-content/70" : ""}>
      {date} — {artist}
      <span className="text-sm text-base-content/50"> · {locationStr}</span>
    </li>
  );
}

export default function Home() {
  const { upcoming, byYear } = getConcertsByGroup();
  const years = Object.keys(byYear)
    .map(Number)
    .filter((y) => !isNaN(y))
    .sort((a, b) => b - a);


  return (
    <div>
      <Intro />

      {upcoming.length > 0 && (
        <section className="mb-4">
          <div className="bg-base-200 rounded-lg px-4 py-3">
            <h2 className="text-lg font-semibold mb-2">Upcoming</h2>
            <ul className="space-y-1">
              {upcoming.map((concert) => (
                <ConcertRow key={concert.slug} concert={concert} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <section>

        <div className="space-y-4">
          {years.map((year) => {
            const currentYear = new Date().getFullYear();
            const isCurrentYear = year === currentYear;

            const list = (
              <ul className="space-y-1">
                {byYear[year].map((concert) => (
                  <ConcertRow key={concert.slug} concert={concert} />
                ))}
              </ul>
            );

            if (isCurrentYear) {
              return (
                <div key={year} className="bg-base-200 rounded-lg px-4 py-3">
                  <div className="flex items-baseline gap-2 mb-2 justify-between">
                    <h3 className="text-lg font-semibold">{year}</h3>
                     <span className="text-sm font-normal text-base-content/40">
                    {byYear[year].length} concerts so far
                  </span>
                  </div>
                  {list}
                </div>
              );
            }

            return (
              <div key={year} className="collapse collapse-arrow bg-base-200 rounded-lg">
                <input type="checkbox" />
                <div className="collapse-title flex items-center gap-3 py-3 font-semibold text-lg justify-between">
                  {year}
                  <span className="text-sm font-normal text-base-content/40">
                    {byYear[year].length} concerts
                  </span>
                </div>
                <div className="collapse-content">
                  {list}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
