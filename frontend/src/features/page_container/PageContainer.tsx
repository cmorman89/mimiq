import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "./components/Breadcrumbs";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const breadcrumbs = location.pathname.split("/").filter(Boolean);
  const isHome = location.pathname === "/";

  return (
    <div
      id="page-container"
      className="max-w-[1400px] h-full w-full mx-auto pt-32 sm:px-6 lg:px-8 relative z-10 flex flex-col"
    >
      <Breadcrumbs breadcrumbs={breadcrumbs} isHome={isHome} />
      <div
        id="page-content"
        className="flex flex-col gap-4 w-full flex-1 overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
};
