import { Intro } from "@/components/Intro";
import { HomeList } from "@/components/HomeList";
import { getConcertsByGroup } from "@/lib/concerts";

export default function Home() {
  const { upcoming, byYear } = getConcertsByGroup();
  const years = Object.keys(byYear)
    .map(Number)
    .filter((y) => !isNaN(y))
    .sort((a, b) => b - a);

  return (
    <div>
      <Intro />
      <HomeList upcoming={upcoming} byYear={byYear} years={years} />
    </div>
  );
}
