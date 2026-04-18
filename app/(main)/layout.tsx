import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[768px] mx-auto flex h-full min-h-screen">
      <main className="flex-1 px-4 py-6 overflow-y-auto flex flex-col">
        <Header />
        <div className="mx-auto block w-full">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
