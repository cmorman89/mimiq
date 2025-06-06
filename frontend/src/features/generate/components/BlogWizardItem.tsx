import { FaCaretDown, FaPlus } from "react-icons/fa";
import { Card } from "../../../components/Card";
import { BlogTopicWizardResultItem } from "./BlogTopicWizardMenu";
import { useState, useRef, useEffect } from "react";
import { toTitleCase } from "../../../utils/stringUtils";
import { Button } from "../../../components/Button";
import { BlogFormFieldIndex } from "../../../context/BlogFormContext";
import { BlogStructure } from "./BlogStructure";
import { useBannerContext } from "../../../context/useBannerMessage";

const AddButton = ({
  label,
  item,
  field,
  subfield,
  onClick,
}: {
  label: string;
  item: BlogTopicWizardResultItem;
  field: BlogFormFieldIndex["field"];
  subfield: BlogFormFieldIndex["subfield"];
  onClick: (
    item: BlogTopicWizardResultItem,
    fieldIndex: BlogFormFieldIndex
  ) => void;
}) => {
  const { handleSetBannerMessage } = useBannerContext();
  const handleClick = () => {
    onClick(item, { field: field, subfield: subfield });
    handleSetBannerMessage({
      message: `Added ${label}`,
      type: "success",
    });
  };

  return (
    <Button type="primary" onClick={handleClick}>
      <div className="text-xs text-gray-400 flex items-center gap-1">
        <FaPlus className="text-xs" />
        <span className="hidden md:inline">
          Add <span className="hidden xl:inline">{label}</span>
        </span>
      </div>
    </Button>
  );
};

export const BlogWizardItem = ({
  item,
  index,
  handleItemOnClick,
}: {
  item: BlogTopicWizardResultItem;
  index: number;
  handleItemOnClick: (
    item: BlogTopicWizardResultItem,
    fieldIndex: BlogFormFieldIndex
  ) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleHeightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [titleHeight, setTitleHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (titleHeightRef.current) {
        setTitleHeight(titleHeightRef.current.scrollHeight);
      }
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
  }, [item]);

  return (
    <Card
      type="dark"
      padding="tight"
      className="flex flex-col w-full gap-4 relative overflow-hidden transition-all duration-300 ease-in-out max-h-40 xl:max-h-[300px] p-2"
      style={{
        height: isOpen ? `${contentHeight + titleHeight + 64}px` : `${titleHeight + 32}px`,
        maxHeight: isOpen
          ? `${contentHeight + titleHeight + 64}px`
          : `${titleHeight + 32}px`,
      }}
    >
      <div
        className={`flex flex-col w-full gap-4 relative overflow-hidden transition-all duration-300 ease-in-out ${
          !isOpen && "fade-mask"
        }`}
        // style={{
        //   maxHeight: isOpen
        //     ? `${contentHeight + titleHeight + 100}px`
        //     : `${titleHeight}px`,
        // }}
      >
        {/* Header */}
        <div className="flex items-start justify-between" ref={titleHeightRef}>
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
          {/* Topic */}
          <Card
            type="light"
            padding="tight"
            className="flex w-full gap-2 items-center justify-between"
            overrideDims={true}
          >
            <div className="flex flex-1 gap-2 items-center">
              <span className="text-sm text-gray-400 px-2">Topic:</span>
              <h4 className="text-heading-2 text-sm font-semibold">
                {item.topic}
              </h4>
            </div>
            <AddButton
              label="topic"
              item={item}
              field="idea"
              subfield="topic"
              onClick={handleItemOnClick}
            />
          </Card>
          {/* Title */}
          <Card
            type="light"
            padding="tight"
            className="flex w-full gap-2 items-center justify-between"
            overrideDims={true}
          >
            <div className="flex flex-1 gap-2 items-center">
              <span className="text-sm text-gray-400 px-2">Title:</span>
              <h4 className="text-heading-2 text-sm font-semibold">
                {item.title}
              </h4>
            </div>
            <AddButton
              label="title"
              item={item}
              field="idea"
              subfield="title"
              onClick={handleItemOnClick}
            />
          </Card>

          {/* Keyword Chips*/}
          <Card
            type="light"
            padding="tight"
            className="flex w-full gap-2 items-center justify-between"
            overrideDims={true}
          >
            <div className="flex flex-1 flex-col w-full gap-2">
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
            </div>
            <AddButton
              label="keywords"
              item={item}
              field="idea"
              subfield="keywords"
              onClick={handleItemOnClick}
            />
          </Card>
          <Card
            type="light"
            padding="tight"
            className="flex w-full gap-2 items-center justify-between"
            overrideDims={true}
          >
            {/* Details */}
            <div className="flex flex-1 flex-col w-full gap-2">
              <p className="text-sm text-gray-400 px-2">Details:</p>
              <p className="text-sm text-content px-6">{item.details}</p>
            </div>
            <AddButton
              label="details"
              item={item}
              field="idea"
              subfield="details"
              onClick={handleItemOnClick}
            />
          </Card>
          <Card
            type="light"
            padding="tight"
            className="flex w-full gap-2 items-center justify-between"
            overrideDims={true}
          >
            <div className="flex flex-1 flex-col w-full gap-2">
              {/* Sections */}
              <p className="text-sm text-gray-400 px-2">Sections:</p>
              <div className="flex flex-col items-start gap-2">
                <BlogStructure
                  size="small"
                  structure={item.sections.map((section) => ({
                    title: section,
                    description: "",
                    keywords: [],
                  }))}
                />
              </div>
            </div>
            <AddButton
              label="sections"
              item={item}
              field="structure"
              subfield="sections"
              onClick={handleItemOnClick}
            />
          </Card>
        </div>
      </div>
    </Card>
  );
};
