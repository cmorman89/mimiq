import { toTitleCase, truncate } from "../../../utils/stringUtils";
import { ModelNameRenderer } from "./ModelNameRenderer";
import { useEffect, useState, useRef } from "react";
import { ParsedModel, parseModelId } from "../../../utils/parseModelId";
import { createPortal } from "react-dom";
import { ModelDisplayHover } from "./ModelDisplayHover";

export const ModelDisplay = ({
  isParentHovering = false,
  modelId = "llama-3.2-8b-instruct",
}: {
  isParentHovering: boolean;
  modelId: string;
}) => {
  const [parsedModel, setParsedModel] = useState<ParsedModel | null>(null);
  const [isHovering, setIsHovering] = useState(isParentHovering);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modelId) {
      const parsed = parseModelId(modelId);
      setParsedModel(parsed);
    }
  }, [modelId]);

  useEffect(() => {
    setIsHovering(isParentHovering);
  }, [isParentHovering]);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width,
      });
    }
    setIsHovering(true);
  };

  return (
    <>
      <div
        ref={ref}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={`flex gap-2 items-center text-white`}>
          <ModelNameRenderer
            modelName={parsedModel?.model_family || "default"}
            color={true}
            label={false}
            className="text-lg"
          />
          <span className="text-sm">
            {toTitleCase(
              truncate(parsedModel?.model_family || "Default Model", 8)
            )}{" "}
            {parsedModel?.version && (
              <span className="text-white/80 text-xs">v{parsedModel.version}</span>
            )}
          </span>
        </div>
      </div>

      {isHovering &&
        parsedModel &&
        createPortal(
          <ModelDisplayHover parsedModel={parsedModel} position={position} />,
          document.body
        )}
    </>
  );
};
