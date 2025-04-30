import { Card } from "../../components/Card";
import { FaChevronDown } from "react-icons/fa";
import { truncate } from "../../utils/stringUtils";

export const DefaultModel = () => {
  return (
    <Card type="dark">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-white/50">Default Model:</span>

        <span className="flex gap-2 items-center text-base text-white">
          {truncate("GPT-4", 10)}
          <FaChevronDown className="text-white/50 text-sm" />
        </span>
      </div>
    </Card>
  );
};
