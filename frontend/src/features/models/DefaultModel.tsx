import { Card } from "../../components/Card";
import { FaChevronDown } from "react-icons/fa";
import { truncate } from "../../utils/stringUtils";

export const DefaultModel = ({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) => {
  return (
    <Card
      type="dark"
      padding="tight"
      className={`${orientation === "horizontal" ? "text-sm" : "text-base"} cursor-pointer`}
    >
      <div
        className={`flex gap-2 ${
          orientation === "horizontal" ? "flex-row items-center" : "flex-col"
        }`}
      >
        <span className="text-sm text-white/50">Default Model:</span>

        <span className={`flex gap-2 items-center  text-white`}>
          {truncate("GPT-4", 10)}
          <FaChevronDown className="text-white/50 text-xs" />
        </span>
      </div>
    </Card>
  );
};
