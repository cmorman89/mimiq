import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { FaSpinner, FaTimes } from "react-icons/fa";
import { BlogTopicWizardResults } from "./BlogTopicWizardResults";
import { useBlogTopicWizard } from "../../../hooks/useBlogTopicWizard";

export interface BlogTopicWizardResultItem {
  topic: string;
  title: string;
  details: string;
  sections: string[];
  keywords: string[];
}
export interface BlogTopicWizardMenuProps {
  direction: string;
  setDirection: (direction: string) => void;
  isGenerating: boolean;
  result: string;
  ideas: BlogTopicWizardResultItem[];
  handleGenerate: (direction: string) => void;
  handleClear: () => void;
}

export const BlogTopicWizardMenu = () => {
  const {
    direction,
    setDirection,
    isGenerating,
    ideas,
    handleGenerate,
    handleClear,
  } = useBlogTopicWizard();

  const handleSetDirection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDirection(value);
    console.log(value);
  };
  return (
    <div className="flex flex-col w-full gap-2 lg:p-2 max-w-3xl mx-auto">
      <div className="flex items-center justify-between w-full gap-2">
        {/*
          <h3 className="text-lg font-semibold">Blog Topic Wizard</h3>
          <div className="flex items-center gap-2">
            <Button type="primary">Generate</Button>
          </div>
        </div>
        <hr className="w-full" />
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between w-full gap-2 rounded-2xl">
            <h4 className="text-sm font-semibold">Blog Topic Wizard</h4>
            <p className="text-sm text-gray-400">
              This is a wizard that will help you generate a blog topic.
            </p>
          </div> */}
        <Card
          type="dark"
          padding="tight"
          className="flex flex-col w-full gap-2"
        >
          <div className="flex flex-col md: justify-between w-full gap-2 rounded-2xl min-h-20">
            <div className="flex gap-2 items-baseline">
              <label
                htmlFor="topic"
                className="text-lg font-semibold text-gray-200 whitespace-nowrap min-w-20 pt-2"
              >
                Have an idea in mind?
              </label>
              <p className="text-xs text-gray-500">(Optional)</p>
            </div>
            <div className="flex flex-1 relative">
              <textarea
                id="direction"
                name="direction"
                placeholder="Enter a direction for the blog topic"
                className="h-full w-full p-2 text-sm text-gray-200 bg-transparent rounded-md outline-none placeholder:text-gray-600 min-h-18 border border-gray-800"
                rows={4}
                autoComplete="off"
                value={direction}
                onChange={handleSetDirection}
              />

              <FaTimes
                className={`${
                  direction ? "opacity-100" : "opacity-0"
                } text-gray-400 text-sm cursor-pointer transition-all duration-300 absolute right-2 top-2`}
                onClick={() => setDirection("")}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type={isGenerating ? "disabled" : "accent"}
              className="flex-1 text-sm"
              onClick={() => handleGenerate(direction)}
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  Generating...
                </div>
              ) : (
                "Generate")}
            </Button>
            <Button
              type={isGenerating ? "disabled" : "primary"}
              className="flex-0 text-sm hover:bg-red-950"
              onClick={handleClear}
            >
              Clear Results
            </Button>
          </div>
        </Card>
      </div>
      <BlogTopicWizardResults content={ideas} />
    </div>
  );
};
