import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-3 text-center">
      <h2 className="text-2xl font-bold text-black">404 Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="link-blue-underline">
        Return Home
      </Link>
    </div>
  );
}
