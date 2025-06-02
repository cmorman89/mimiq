import { Card } from "../../../components/Card";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { ModelBadge } from "../../../features/models/ModelBadge";
import { Button } from "../../../components/Button";
import { FaCopy } from "react-icons/fa";
import { BlogSkeleton } from "../../../components/BlogSkeleton";
import Markdown from "react-markdown";

export const BlogCard = ({
  generatedBlog,
  setGeneratedBlog,
  isGenerating,
  wordCount,
  expanded,
  setExpanded,
  setShowModelList,
}: {
  generatedBlog: string;
  setGeneratedBlog: (blog: string) => void;
  isGenerating: boolean;
  wordCount: number;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  setShowModelList: (show: boolean) => void;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedBlog);
  };

  const handleClear = () => {
    setGeneratedBlog("");
  };

  return (
    <Card
      className={`flex flex-col ${
        expanded ? "xl:w-11/12" : "xl:w-2/3"
      } gap-2 h-full overflow-y-hidden transition-all duration-300 pb-2`}
      overrideDims={true}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaExpandArrowsAlt onClick={() => setExpanded(!expanded)} />
          <h2 className="text-lg font-semibold">AI Output</h2>
          <ModelBadge
            activeModel={"GPT-4.1"}
            onClick={() => setShowModelList(true)}
          />
        </div>
        <div
          className={`${
            wordCount > 1 ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000 text-sm text-gray-400 rounded-full bg-gray-700 px-2 py-1 border border-white/10`}
        >
          {wordCount} words
        </div>
        <div className="flex flex-col transition-all duration-300">
          <Button
            type="primary"
            onClick={handleClear}
            itemsRow={true}
            className="opacity-50 hover:opacity-100 transition-opacity duration-300 items-center justify-center text-sm "
          >
            Clear Blog
          </Button>
        </div>
        {generatedBlog && (
          <div className="flex items-center gap-2 absolute bottom-0 right-0 bg-gray-950/50 backdrop-blur-lg p-2 rounded-lg">
            <Button
              type="primary"
              onClick={handleCopy}
              itemsRow={true}
              className="opacity-50 hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg aspect-square items-center justify-center"
            >
              <FaCopy className="text-base" />
            </Button>
          </div>
        )}
      </div>
      <div className="w-full h-px bg-gray-700 "></div>
      <div className="flex flex-col h-full pb-4 overflow-y-auto">
        {!generatedBlog ? (
          <div className="mb-2 text-sm text-gray-400">
            Your blog post will be generated here!
            <BlogSkeleton isGenerating={isGenerating} />
          </div>
        ) : (
          <div className="markdown flex flex-col flex-1 gap-2 overflow-y-auto h-full pt-2 relative">
            <Markdown>{generatedBlog}</Markdown>
          </div>
        )}
      </div>
    </Card>
  );
};
