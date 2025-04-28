import { Navbar } from "../features/navbar/Navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="main-layout" className="relative flex flex-col h-full w-full">
      <Navbar />
      <main id="main-content" className="flex w-full h-full pb-6">{children}</main>
    </div>
  );
}
