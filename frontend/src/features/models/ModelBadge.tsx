import { ModelDisplay } from "./components/ModelDisplay";
import { FaChevronDown } from "react-icons/fa";

/**
 * A badge component that displays the currently selected model with a dropdown indicator.
 *
 * Features:
 * - Model name display
 * - Dropdown indicator icon
 * - Click interaction for model selection
 * - Consistent styling with border and rounded corners
 * - Hover state handling
 *
 * This component is used to show the currently active model and provide
 * a way to open the model selection dropdown.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.activeModel - ID or name of the currently selected model
 * @param {() => void} props.onClick - Click handler for opening model selection
 * @returns {JSX.Element} A badge showing the active model with dropdown indicator
 */
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
