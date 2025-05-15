import { Card } from "../../../components/Card";
import { ParsedModel } from "../../../utils/parseModelId";
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
  model: ParsedModel;
  currentModel: string;
  setCurrentModel: (model: string) => void;
  setShowModelList: (show: boolean) => void;
}) => {
  return (
    <Card
      padding="tight"
      className="relative flex items-center hover:bg-fuchsia-500/40 hover:border-fuchsia-400/30 hover:cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg"
      onClick={() => {
        if (model.original_model_id) {
          setCurrentModel(model.original_model_id);
          setShowModelList(false);
        }
      }}
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
