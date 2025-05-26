import { FaArrowDown, FaCaretDown } from "react-icons/fa";
import { Card } from "../../../components/Card";
import { BlogTopicWizardResultItem } from "./BlogTopicWizardMenu";
import { useState, useRef, useEffect } from "react";
import { toTitleCase } from "../../../utils/stringUtils";

export const BlockTopicWixardItem = ({
  item,
  index,
}: {
  item: BlogTopicWizardResultItem;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    // Initial height calculation
    updateHeight();

    // Add resize listener
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <Card
      type="dark"
      padding="tight"
      className="flex flex-col w-full gap-4 relative overflow-hidden transition-all duration-300 ease-in-out max-h-40 xl:max-h-[300px]"
      style={{
        maxHeight: isOpen ? `${contentHeight + 100}px` : "",
      }}
    >
      <div
        className={`flex flex-col w-full gap-4 relative overflow-hidden ${
          !isOpen && "fade-mask"
        }`}
        style={{
          maxHeight: isOpen ? `${contentHeight + 100}px` : "",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-heading-1 text-xl">
            {index + 1}. {item.topic}
          </h3>
          {/* Expand Button */}
          <div
            className="flex-0 flex items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaCaretDown
              className={`text-gray-400 cursor-pointer text-2xl transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <hr className="w-full border-rose-400/50" />
        {/* Content panel */}
        <div ref={contentRef} className="flex flex-col flex-1 gap-4">
          {/* Title */}
          <Card
            type="light"
            padding="tight"
            className="flex w-full gap-2 items-center"
            overrideDims={true}
          >
            <span className="text-sm text-gray-400 px-2">Title:</span>
            <h4 className="text-heading-2 text-sm font-semibold">
              {item.title}
            </h4>
          </Card>
          {/* Keyword Chips*/}
          <Card
            type="light"
            padding="tight"
            className="flex flex-col w-full gap-2"
            overrideDims={true}
          >
            <p className="text-sm text-gray-400 px-2">Keywords:</p>
            <div className="flex flex-wrap gap-2 px-6">
              {item.keywords.map((keyword) => (
                <div
                  key={keyword}
                  className="px-2 border-2 border-gray-600/50 rounded-full bg-gray-400/20 hover:bg-gray-400/20 transition-all duration-300 cursor-default"
                >
                  <p className="text-xs text-gray-400 px-2">
                    {toTitleCase(keyword)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
          <Card
            type="light"
            padding="tight"
            className="flex flex-col w-full gap-2"
            overrideDims={true}
          >
            {/* Details */}
            <p className="text-sm text-gray-400 px-2">Details:</p>
            <p className="text-sm text-content px-6">{item.details}</p>
          </Card>
          <Card
            type="light"
            padding="tight"
            className="flex flex-col w-full gap-2"
            overrideDims={true}
          >
            {/* Sections */}
            <p className="text-sm text-gray-400 px-2">Sections:</p>
            <div className="flex flex-col items-start gap-2">
              {item.sections.map((section, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 px-6"
                >
                  <div className="text-sm text-content p-3 rounded-md bg-gray-400/20 hover:bg-gray-400/20 cursor-default flex items-center">
                    {index + 1}. {toTitleCase(section)}
                  </div>
                  {index !== item.sections.length - 1 && (
                    <FaArrowDown className="text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};
