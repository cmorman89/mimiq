import { Card } from "../../../components/Card";
import ReactDOM from "react-dom";
import { useModels } from "../../../hooks/useModels";
import { useEffect, useState } from "react";
import { ParsedModel, parseModelId } from "../../../utils/parseModelId";
import { ModelListRow } from "./ModelListRow";
import { FaArrowLeft, FaSync, FaTimes } from "react-icons/fa";
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
    <div className="fixed inset-0 z-10 w-1/2 h-1/2 mx-auto my-auto overflow-hidden">
      <Card
        type="dark"
        transparent={false}
        className="relative p-6 flex-col gap-6 overflow-hidden"
      >
        <div className="flex justify-between items-center">
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
        <div className="h-1 bg-gradient-mimiq w-full"></div>
        <div className="flex flex-col gap-3 overflow-y-auto mimiq-scrollbar px-6">
          <div className="flex flex-col gap-3 z-50">
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
        </div>
      </Card>
    </div>,
    document.getElementById("portal-root")!
  );
};

export default ModelList;
