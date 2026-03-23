import Link from "next/link";
import { Metadata } from "next";
import { getConcertsByGroup, formatConcertDate } from "@/lib/concerts";
import { Concert } from "@/types";

export const metadata: Metadata = {
  title: "Concerts",
  description: "Список посещенных и планируемых концертов",
};

function ConcertItem({ concert }: { concert: Concert }) {
  const dateStr = formatConcertDate(concert.metadata.date);
  const { artist, location, venue } = concert.metadata;
  const locationStr = venue ? `${venue}, ${location}` : location;

  const content = (
    <>
      {dateStr} — {artist}
      <span className="text-base-content/50"> · {locationStr}</span>
    </>
  );

  if (concert.hasContent) {
    return (
      <li>
        <Link
          href={`/concerts/${concert.slug}`}
          className="hover:underline hover:text-primary transition-colors"
        >
          {content}
        </Link>
      </li>
    );
  }

  return <li className="text-base-content/80">{content}</li>;
}

export default function ConcertsPage() {
  const { upcoming, byYear } = getConcertsByGroup();
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <div className="space-y-8">
        {upcoming.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3">Upcoming</h2>
            <ul className="space-y-1">
              {upcoming.map((concert) => (
                <ConcertItem key={concert.slug} concert={concert} />
              ))}
            </ul>
          </div>
        )}

        {years.map((year) => (
          <div key={year}>
            <h2 className="text-xl font-bold mb-3">{year}</h2>
            <ul className="space-y-1">
              {byYear[year].map((concert) => (
                <ConcertItem key={concert.slug} concert={concert} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
