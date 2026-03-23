export const Footer = () => {
  return (
    <footer className="w-full footer footer-horizontal footer-center text-base-content pt-12 rounded-b-none mt-auto">
      <aside className="flex flex-row justify-center w-full">
        <p className="text-sm text-gray-500"> © {new Date().getFullYear()} | @iamlykke </p>
      </aside>
    </footer>
  );
};
