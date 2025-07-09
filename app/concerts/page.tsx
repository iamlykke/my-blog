import Concerts from "@/content/concerts/concerts.mdx";
import Link from "next/link";
import Image from "next/image";

export default function ConcertsPage() {
  return (
    <div>
      <p className="mb-3">
        Актуальная инфа всегда{" "}
        <Link
          className="underline"
          href="https://www.last.fm/user/iamlykke"
          target="_blank"
        >
          тут
        </Link>
      </p>
      <div className="flex flex-col items-center mb-5 gap-2">
        <Image
          src="/images/concerts/chelsea-grin-2024.jpg"
          width={736}
          height={100}
          alt="Chelsea grin 2024"
          className="object-cover shadow rounded-sm"
        />
        <p className="italic text-sm">Chelsea Grin in Budapest, 2024</p>
      </div>

      <Concerts />
    </div>
  );
}
