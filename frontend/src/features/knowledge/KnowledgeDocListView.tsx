import { FaPlus } from "react-icons/fa";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { capitalize } from "../../utils/stringUtils";
import { DefaultModel } from "../models/DefaultModel";

/**
 * A view component that displays a list of knowledge documents of a specific type.
 *
 * Features:
 * - Document type-specific filtering
 * - Add new document button with dynamic label
 * - Default model selection
 * - Card-based layout for document examples
 * - Responsive design
 *
 * This component is used to display and manage different types of knowledge documents
 * such as blogs, books, videos, podcasts, and articles. It provides a consistent
 * interface for viewing and adding new examples of each document type.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.docType - Type of documents to display (e.g., 'blog', 'books', 'videos', 'podcasts', 'articles', 'all')
 * @returns {JSX.Element} A view component for displaying knowledge documents
 */
export const KnowledgeDocListView = ({ docType }: { docType: string }) => {
  return (
    <Card className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DefaultModel />
        </div>
        <Button type="primary" to="/knowledge/new">
          <span className="flex gap-2 items-center justify-center">
            <FaPlus />
            Add New {docType !== "all" ? capitalize(docType) : ""} Example
          </span>
        </Button>
      </div>
      {/* Examples */}
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
