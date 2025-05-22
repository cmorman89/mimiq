import { FaExclamationTriangle } from "react-icons/fa";
import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";

/**
 * The Workflow page component that serves as a placeholder for workflow management.
 *
 * Features:
 * - Consistent page container
 * - Placeholder content
 * - Layout structure for workflow features
 *
 * This component serves as a placeholder for the workflow management section
 * of the application, providing a consistent container for future workflow
 * management features.
 *
 * @component
 * @returns {JSX.Element} A placeholder page for workflow management features
 */
export const Workflow = () => {
  return (
    <PageContainer>
      <Card className="flex-col gap-4">
        <div className="flex gap-2 items-center justify-center my-4 ">
          <FaExclamationTriangle className="text-xxl text-yellow-500" />
          <p>
            <span className="font-bold text-yellow-500 text-lg">Note: </span>
            Workflow page under development.
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};
