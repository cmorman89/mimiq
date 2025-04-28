import { Link } from "react-router-dom";
import { Card } from "../../../components/Card";

export const KnowledgeTypeCard = ({
  to = "",
  icon,
  children,
  className = "",
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link to={to}>
      <Card className={className}>
        <div className="flex gap-4 items-center">
          <div className="p-4 rounded-lg bg-teal-900 bg-gradient-to-br from-white/40 to-transparent">{icon}</div>
          {children}
        </div>
      </Card>
    </Link>
  );
};
