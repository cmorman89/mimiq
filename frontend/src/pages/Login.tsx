import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { FaExclamationTriangle } from "react-icons/fa";

export const Login = () => {
  return (
    <PageContainer>
      <Card className="flex-col gap-4">
        <div className="flex gap-2 items-center justify-center my-4 ">
          <FaExclamationTriangle className="text-xxl text-yellow-500" />
          <p>
            <span className="font-bold text-yellow-500 text-lg">Note: </span>
            Login page under development.
          </p>
        </div>
        <div className="h-px flex border-1 my-4 bg-gray-600"></div>
      </Card>
    </PageContainer>
  );
};
