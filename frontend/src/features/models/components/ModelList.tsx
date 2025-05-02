import { Card } from "../../../components/Card";
import ReactDOM from "react-dom";
import { useModels } from "../../../hooks/useModels";
import { useEffect, useState } from "react";
import { ParsedModel, parseModelId } from "../../../utils/parseModelId";
import { Button } from "../../../components/Button";
import { ModelListRow } from "./ModelListRow";
export const ModelList = () => {
  // Hook to fetch all models
  const { lmStudioModels, fetchModels } = useModels();

  // Store the models in state
  const [parsedModels, setParsedModels] = useState<ParsedModel[]>([]);

  // Parse the models when the models are fetched
  useEffect(() => {
    setParsedModels(lmStudioModels.data.map((model) => parseModelId(model.id)));
  }, [lmStudioModels]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 w-1/2 h-1/2 mx-auto my-auto">
      <Card className="p-6">
        <h1>Model List</h1>
        <Button onClick={() => fetchModels()}>Refresh</Button>
        <div className="flex flex-col gap-2">
          {parsedModels.map((model) => (
            <ModelListRow key={model.original_model_id} model={model} />
          ))}
        </div>
      </Card>
    </div>,
    document.getElementById("portal-root")!
  );
};

export default ModelList;
