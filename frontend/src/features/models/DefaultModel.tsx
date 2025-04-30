import { Card } from "../../components/Card";
import { FaChevronDown } from "react-icons/fa";
import { truncate } from "../../utils/stringUtils";
import { ModelNameRenderer } from "./components/ModelNameRenderer";
import { useState } from "react";

export const DefaultModel = ({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
  }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Card
      type="dark"
      padding="tight"
      className={`${
        orientation === "horizontal" ? "text-sm" : "text-base"
      } cursor-pointer`}
    >
      <div
        className={`flex items-center gap-2 ${
          orientation === "horizontal" ? "flex-row items-center" : "flex-col"
        }`}
      >
        <span className="text-sm text-white/50">Default Model:</span>

        <div className={`flex gap-2 items-center text-white`}>
          <ModelNameRenderer
            modelName="llama"
            color={true}
            label={false}
            className="text-lg"
          />
          {truncate("Llama 3.2", 10)}
          <FaChevronDown className="text-white/50 transition-transform duration-200" />
        </div>
      </div>
    </Card>
  );
};
