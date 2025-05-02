import { Card } from "../../components/Card";
import { FaChevronDown } from "react-icons/fa";
import { ModelDisplay } from "./components/ModelDisplay";
import { useState } from "react";
// import { useState } from "react";

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
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="text-sm text-white/50">Default Model:</span>

        <div className={`flex gap-2 items-center text-white`}>
          <ModelDisplay modelId="default" isParentHovering={isHovering} />
          <FaChevronDown className="text-white/50 transition-transform duration-200" />
        </div>
      </div>
    </Card>
  );
};
