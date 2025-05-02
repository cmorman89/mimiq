import { Card } from "../../../components/Card";
import { ParsedModel } from "../../../utils/parseModelId";
import { toTitleCase } from "../../../utils/stringUtils";
import { ModelNameRenderer } from "./ModelNameRenderer";

export const ModelListRow = ({ model }: { model: ParsedModel }) => {
  return (
    <Card
      type="light"
      padding="tight"
      className="relative flex items-center hover:bg-fuchsia-500/40 hover:border-fuchsia-400/30 hover:cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg"
    >
      <div className="flex flex-1 items-center gap-1 flex-wrap">
        <ModelNameRenderer
          modelName={model.model_family}
          color={true}
          label={false}
          className="text-2xl mr-2"
        />
        <span className="text-lg">{toTitleCase(model.model_family)}</span>
        <span className="text-lg">{model.version}</span>
        {model.params && (
          <span className="text-sm px-2 py-1 rounded-full bg-white/10 ml-2">
            <span className="opacity-50 mr-1">Parameters:</span>
            {model.params}
          </span>
        )}
        {model.subversion && (
          <span className="text-sm px-2 py-1 rounded-full bg-white/10 ml-2">
            <span className="opacity-50 mr-1">Subtype:</span>
            {model.subversion}
          </span>
        )}
        <span className="flex-grow" />
        {model.original_model_id && (
          <span className="text-sm px-2 py-1 rounded-full bg-white/10 ml-2">
            <span className="opacity-50 mr-1">ID:</span>
            {model.original_model_id}
          </span>
        )}
      </div>
    </Card>
  );
};
