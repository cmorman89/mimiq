import { Card } from "./Card";

export const CollapsibleCard = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{header}</h2>
      </div>
      {children}
    </Card>
  );
};
