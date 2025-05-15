import { Card } from "../../components/Card";
import { FaChevronDown } from "react-icons/fa";
import { ModelDisplay } from "./components/ModelDisplay";
import { useState } from "react";
// import { useState } from "react";

/**
 * A component that displays the default model selection with hover interaction.
 *
 * Features:
 * - Configurable orientation (horizontal/vertical)
 * - Hover state management
 * - Model display with dropdown indicator
 * - Responsive text sizing
 * - Dark theme styling
 *
 * This component is used to show and manage the default model selection,
 * providing a consistent interface for model selection across the application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - Layout orientation of the component
 * @returns {JSX.Element} A component displaying the default model with selection interface
 */
export const DefaultModel = ({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Card
      type="dark"
      padding="tight"
      className={`${
        orientation === "horizontal" ? "text-sm" : "text-base"
      } cursor-pointer`}
    >
      <div
        className={`flex items-center gap-2 ${
          orientation === "horizontal" ? "flex-row items-center" : "flex-col"
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="text-sm text-white/50">Default Model:</span>

        <div className={`flex gap-2 items-center text-white`}>
          <ModelDisplay modelId="default" isParentHovering={isHovering} />
          <FaChevronDown className="text-white/50 transition-transform duration-200" />
        </div>
      </div>
    </Card>
  );
};
