import { Card } from "../../../components/Card";
import { ParsedModel } from "../../../utils/parseModelId";

export const ModelListRow = ({ model }: { model: ParsedModel }) => {
  return <Card type="dark">{model.model_family}</Card>;
};
