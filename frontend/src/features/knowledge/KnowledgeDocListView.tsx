import { FaPlus } from "react-icons/fa";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { capitalize } from "../../utils/stringFromatters";

export const KnowledgeDocListView = ({ docType }: { docType: string }) => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button type="primary" to="/knowledge/new">
          <span className="flex gap-2 items-center justify-center">
            <FaPlus />
            Add New {docType !== "all" ? capitalize(docType) : ""} Example
          </span>
        </Button>
      </div>
      <Card type="dark">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Example 1</h2>
          </div>
        </div>
      </Card>
    </Card>
  );
};
