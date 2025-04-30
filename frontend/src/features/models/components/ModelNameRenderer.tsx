import { modelComponents } from "../../../utils/modelComponents";

export const ModelNameRenderer = ({
  modelName,
  className = "",
  color = false,
  label = true,
  icon = true,
}: {
  modelName: string;
  className?: string;
  color?: boolean;
  label?: boolean;
  icon?: boolean;
  customText?: boolean;
}) => {
  const [MonoIcon, ColorIcon, Text] = modelComponents[modelName];
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {icon && (color ? <ColorIcon /> : <MonoIcon />)}
      {label && <Text />}
    </div>
  );
};
