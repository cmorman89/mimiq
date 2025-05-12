import { ModelDisplay } from "./components/ModelDisplay";
import { FaChevronDown } from "react-icons/fa";
export const ModelBadge = ({
  activeModel,
  onClick,
}: {
  activeModel: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex px-2 py-1 gap-1.5 items-center justify-center rounded-full border-2 border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <ModelDisplay isParentHovering={false} modelId={activeModel} />
      <FaChevronDown className="text-gray-400 text-xs pt-0.5" />
    </div>
  );
};
