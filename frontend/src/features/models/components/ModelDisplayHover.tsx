import { ParsedModel } from "../../../utils/parseModelId";
import { ModelNameRenderer } from "./ModelNameRenderer";
import { Card } from "../../../components/Card";
import { toTitleCase } from "../../../utils/stringUtils";

interface ModelDisplayHoverProps {
  parsedModel: ParsedModel;
  position: { top: number; left: number };
}

export const ModelDisplayHover = ({
  parsedModel,
  position,
}: ModelDisplayHoverProps) => {
  return (
    <div
      className="fixed pointer-events-none"
      style={{ top: position.top, left: position.left }}
    >
      <Card
        className="mt-2 p-4 z-[9999] bg-black/90 backdrop-blur-sm border-white/20 shadow-2xl"
        type="dark"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <ModelNameRenderer
              modelName={parsedModel.model_family}
              color={true}
              label={false}
              className="text-5xl"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                {toTitleCase(parsedModel.model_family)}
              </span>
              {parsedModel.version && (
                <span className="text-sm text-white/80">
                  Version {parsedModel.version}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            {parsedModel.params && (
              <div className="flex items-center gap-2">
                <span className="text-white/60">Parameters:</span>
                <span className="text-white/90">{parsedModel.params}</span>
              </div>
            )}
            {parsedModel.subversion && parsedModel.subversion.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-white/60">Subversion:</span>
                <span className="text-white/90">
                  {parsedModel.subversion.join("-")}
                </span>
              </div>
            )}
            {parsedModel.suffix && parsedModel.suffix.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-white/60">Type:</span>
                <span className="text-white/90">
                  {parsedModel.suffix.join("-")}
                </span>
              </div>
            )}
          </div>
          <div className="h-px bg-white/20" />
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-white/60">Original Model ID:</span>
            <span className="text-white text-xs font-mono">
              {parsedModel.original_model_id}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
