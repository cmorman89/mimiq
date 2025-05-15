import { modelComponents } from "../../../utils/modelComponents";

/**
 * A component that renders model names with associated icons and styling.
 * 
 * Features:
 * - Dynamic icon selection based on model family
 * - Color and monochrome icon variants
 * - Optional label display
 * - Custom text support
 * - Flexible styling through className prop
 * - Fallback to default components
 * - Consistent spacing and alignment
 * 
 * This component provides a standardized way to display model names throughout
 * the application, with appropriate icons and styling based on the model family.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.modelName - Name of the model family to render
 * @param {string} [props.className=""] - Additional CSS classes to apply
 * @param {boolean} [props.color=false] - Whether to use colored or monochrome icons
 * @param {boolean} [props.label=true] - Whether to display the model label
 * @param {boolean} [props.icon=true] - Whether to display the model icon
 * @param {string|null} [props.customText=null] - Optional custom text to display
 * @returns {JSX.Element} A component displaying the model name with associated icon and styling
 */
export const ModelNameRenderer = ({
  modelName,
  className = "",
  color = false,
  label = true,
  icon = true,
  customText = null,
}: {
  modelName: string;
  className?: string;
  color?: boolean;
  label?: boolean;
  icon?: boolean;
  customText?: string | null;
}) => {
  const [MonoIcon, ColorIcon, Text] =
    modelComponents[modelName] || modelComponents.default;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {icon && (color ? <ColorIcon /> : <MonoIcon />)}
      {label && <Text />}
      {customText && <span>{customText}</span>}
    </div>
  );
};
