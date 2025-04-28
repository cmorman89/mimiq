import { Outlet } from "react-router-dom";
import { PageContainer } from "../features/page_container/PageContainer";

export const Knowledge = () => {
  return (
    <PageContainer>

      <Outlet />
    </PageContainer>
  );
};
