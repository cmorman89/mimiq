import { BlogStructureItemState } from "../../../context/BlogFormContext";
import { Divider } from "../../../components/Divider";
import { Card } from "../../../components/Card";
import { FaArrowDown, FaTimes } from "react-icons/fa";
import { useMemo } from "react";
export const BlogStructure = ({
  structure,
  size = "default",
  handleRemoveSection,
}: {
  structure: BlogStructureItemState[];
  size?: "default" | "small";
  handleRemoveSection: (index: number) => void;
}) => {
  const sizeClass = useMemo(
    () => ({
      default: {
        title: "text-lg",
        description: "text-sm",
        keywords: "text-sm",
        arrow: "text-2xl",
      },
      small: {
        title: "text-sm",
        description: "text-xs",
        keywords: "text-xs",
        arrow: "text-lg",
      },
    }),
    []
  );

  const useSizeClass = useMemo(() => sizeClass[size], [size, sizeClass]);
  return (
    <div className="flex flex-col gap-2">
      {structure.map((item, index) => (
        <div key={index}>
          <Card
            className="flex flex-col gap-2"
            padding="tight"
            type="dark"
            overrideDims={true}
          >
            <div
              className="flex items-center justify-center aspect-square cursor-pointer absolute top-3 right-3 rounded-full bg-white/40 hover:bg-red-500/60 transition-all duration-300 p-1"
              onClick={() => handleRemoveSection(index)}
            >
              <FaTimes className="text-white text-xs" />
            </div>
            <h3
              className={`${useSizeClass.title} font-semibold flex items-center gap-2`}
            >
              <span className="text-gray-400 mr-1">{index + 1}.</span>
              {item.title}
            </h3>
            {(item.description || item.keywords.length > 0) && (
              <Divider className="bg-gray-700" />
            )}
            {item.description && (
              <p className={`${useSizeClass.description} text-gray-500`}>
                {item.description}
              </p>
            )}
            {item.keywords.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className={`${useSizeClass.keywords} font-semibold`}>
                  Keywords
                </h4>
                <ul className="list-inside text-xs flex flex-wrap gap-2">
                  {item.keywords.map((keyword, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 px-2 py-1 rounded-md"
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
          {index < structure.length - 1 && (
            <div className="flex justify-center">
              <div
                className="flex aspect-square items-center justify-center bg-gray-700/50 rounded-full shadow-xl border-2
               border-gray-700 mt-2"
              >
                <FaArrowDown
                  className={`text-gray-500 ${useSizeClass.arrow} m-1`}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
