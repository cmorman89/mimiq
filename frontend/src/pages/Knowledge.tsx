import { Outlet } from "react-router-dom";
import { PageContainer } from "../features/page_container/PageContainer";

/**
 * The Knowledge page component that serves as a layout wrapper for knowledge-related routes.
 *
 * Features:
 * - Nested route rendering
 * - Consistent page container
 * - Layout structure for knowledge features
 *
 * This component acts as a layout wrapper for the knowledge management section
 * of the application, providing a consistent container for nested routes
 * related to knowledge base management and example content.
 *
 * @component
 * @returns {JSX.Element} A layout wrapper for knowledge-related routes
 */
export const Knowledge = () => {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
};
