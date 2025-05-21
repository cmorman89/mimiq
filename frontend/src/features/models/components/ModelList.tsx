import { Card } from "../../../components/Card";
import ReactDOM from "react-dom";
import { useModels } from "../../../hooks/useModels";
import { useEffect, useState } from "react";
import { ParsedModel, parseModelId } from "../../../utils/parseModelId";
import { ModelListRow } from "./ModelListRow";
import { FaArrowLeft, FaSync, FaTimes } from "react-icons/fa";

/**
 * A modal component that displays a list of available models for selection.
 *
 * Features:
 * - Portal-based modal rendering
 * - Model list with scrollable content
 * - Model selection functionality
 * - Model refresh capability
 * - Current model highlighting
 * - Close and back navigation
 * - Gradient separator
 * - Custom scrollbar styling
 *
 * This component provides a modal interface for users to browse and select
 * from available models, with the ability to refresh the model list and
 * navigate back to the previous view.
 *
 * @component
 * @param {Object} props - Component props
 * @param {(show: boolean) => void} props.setShowModelList - Function to control modal visibility
 * @param {string} props.currentModel - ID of the currently selected model
 * @param {(model: string) => void} props.setCurrentModel - Function to update the selected model
 * @returns {JSX.Element} A modal component displaying the list of available models
 */
export const ModelList = ({
  setShowModelList,
  currentModel,
  setCurrentModel,
}: {
  setShowModelList: (show: boolean) => void;
  currentModel: string;
  setCurrentModel: (model: string) => void;
}) => {
  // Hook to fetch all models
  const { lmStudioModels, fetchModels } = useModels();

  // Store the models in state
  const [parsedModels, setParsedModels] = useState<ParsedModel[]>([]);

  // Parse the models when the models are fetched
  useEffect(() => {
    setParsedModels(lmStudioModels.data.map((model) => parseModelId(model.id)));
  }, [lmStudioModels]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 w-1/2 mx-auto my-auto overflow-hidden h-1/2">
      <Card
        type="dark"
        transparent={false}
        className="relative flex-col gap-6 p-6 overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl">
            <FaArrowLeft
              className="text-lg cursor-pointer"
              onClick={() => setShowModelList(false)}
            />
            <h1>Model List</h1>
          </div>
          <div className="flex items-center gap-6 text-lg">
            <FaSync onClick={() => fetchModels()} className="cursor-pointer" />
            <FaTimes
              onClick={() => setShowModelList(false)}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-mimiq"></div>
        {/* Model lists */}
        {/* Ollama Models */}
        <div className="flex flex-col gap-3 px-6 overflow-y-auto mimiq-scrollbar">
          <div className="z-50 flex flex-col gap-3">
            {/* LM Studio Models */}
            LM Studio Models:
            {parsedModels.map((model) => (
              <ModelListRow
                key={model.original_model_id}
                model={model}
                currentModel={currentModel}
                setCurrentModel={setCurrentModel}
                setShowModelList={setShowModelList}
              />
            ))}
          </div>
          {/* OpenAI Models */}
          <div className="z-50 flex flex-col gap-3 pt-2 border-t border-neutral-600">
            OpenAI Models
            <ModelListRow
              model={"GPT-4.1"}
              currentModel={currentModel}
              setCurrentModel={setCurrentModel}
              setShowModelList={setShowModelList}
            />
            <ModelListRow
              model={"GPT-4.1-mini"}
              currentModel={currentModel}
              setCurrentModel={setCurrentModel}
              setShowModelList={setShowModelList}
            />
            <ModelListRow
              model={"GPT-4.1-nano"}
              currentModel={currentModel}
              setCurrentModel={setCurrentModel}
              setShowModelList={setShowModelList}
            />
          </div>
        </div>
      </Card>
    </div>,
    document.getElementById("portal-root")!
  );
};

export default ModelList;
