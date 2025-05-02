import { modelComponents } from "../../../utils/modelComponents";

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
