import { getAllConcerts } from "@/lib/concerts";
import { ConcertArchiveSwiss } from "@/components/ConcertArchiveSwiss";
import "./swiss.css";

export default function Home() {
  const concerts = getAllConcerts();
  return <ConcertArchiveSwiss concerts={concerts} />;
}
