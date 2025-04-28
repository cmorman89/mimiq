import { Navbar } from "../features/navbar/Navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen min-h-screen max-h-screen wiscreen min-w-screen max-w-screen">
      <Navbar />
      {children}
    </div>
  )
}