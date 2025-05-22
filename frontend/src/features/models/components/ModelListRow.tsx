import { Card } from "../../../components/Card";
import { ParsedModel, parseModelId } from "../../../utils/parseModelId";
import { toTitleCase } from "../../../utils/stringUtils";
import { ModelNameRenderer } from "./ModelNameRenderer";

/**
 * A row component that displays individual model information in the model selection list.
 *
 * Features:
 * - Interactive model selection
 * - Model family and version display
 * - Parameter count badge
 * - Subtype information badge
 * - Model ID display
 * - Hover effects with scaling
 * - Smooth transitions
 * - Color-coded model family indicator
 *
 * This component renders a single row in the model selection list, providing
 * detailed information about each model and handling the selection interaction.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ParsedModel} props.model - Parsed model information object
 * @param {string} props.currentModel - ID of the currently selected model
 * @param {(model: string) => void} props.setCurrentModel - Function to update the selected model
 * @param {(show: boolean) => void} props.setShowModelList - Function to control model list visibility
 * @returns {JSX.Element} A row component displaying model information and handling selection
 */
export const ModelListRow = ({
  model,
  currentModel,
  setCurrentModel,
  setShowModelList,
}: {
  model: ParsedModel | string;
  currentModel: string;
  setCurrentModel: (model: string) => void;
  setShowModelList: (show: boolean) => void;
}) => {
  if (typeof model === "string") {
    model = parseModelId(model);
  }

  return (
    <Card
      padding="tight"
      className={`relative flex items-center transition-all duration-300 shadow-lg hover:bg-fuchsia-500/40 hover:border-fuchsia-400/30 hover:cursor-pointer ${
        model.original_model_id === currentModel
          ? "bg-fuchsia-500/20 border-fuchsia-400/30"
          : ""
      }`}
      onClick={() => {
        if (model.original_model_id) {
          setCurrentModel(model.original_model_id);
          setShowModelList(false);
        }
      }}
    >
      <div className="flex flex-wrap items-center flex-1 gap-1">
        <ModelNameRenderer
          modelName={model.model_family}
          color={true}
          label={false}
          className="mr-2 text-2xl"
        />
        <span className="text-lg">{toTitleCase(model.model_family)}</span>
        <span className="text-lg">{model.version}</span>
        {model.params && (
          <span className="px-2 py-1 ml-2 text-sm rounded-full bg-white/10">
            <span className="mr-1 opacity-50">Parameters:</span>
            {model.params}
          </span>
        )}
        {model.subversion && (
          <span className="px-2 py-1 ml-2 text-sm rounded-full bg-white/10">
            <span className="mr-1 opacity-50">Subtype:</span>
            {model.subversion}
          </span>
        )}
        <span className="flex-grow" />
        {model.original_model_id && (
          <span className="px-2 py-1 ml-2 text-sm rounded-full bg-white/10">
            <span className="mr-1 opacity-50">ID:</span>
            {model.original_model_id}
          </span>
        )}
      </div>
    </Card>
  );
};
