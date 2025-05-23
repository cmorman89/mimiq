import { FaExclamationTriangle } from "react-icons/fa";
import { Card } from "./Card";

export const UnderDev = ({ name }: { name: string }) => {
  return (
    <Card className="flex-col gap-4 items-center justify-center">
      <div className="flex lg:flex-col lg:text-center gap-2 items-center justify-center my-4 ">
        <div className="flex items-center gap-2 ">
          <FaExclamationTriangle className="text-xl text-yellow-500" />
          <span className="font-bold text-yellow-500 text-lg">Note: </span>
        </div>
        <p>{name} page under development.</p>
      </div>
    </Card>
  );
};
