import { Link } from "react-router-dom";
import { Card } from "../../../components/Card";

/**
 * A card component used for navigating to different knowledge content types.
 *
 * Features:
 * - Navigation using React Router
 * - Icon display with gradient background
 * - Consistent card styling
 * - Flexible content area
 * - Customizable styling through className prop
 *
 * This component is used in the knowledge type selection grid to provide
 * visual navigation cards for different content categories.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.to - Navigation target path
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {React.ReactNode} props.children - Content to display (typically the category name)
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} A navigation card for a knowledge content type
 */
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
    <Card
      className={`${className} h-fit`}
      type="dark"
      padding="tight"
      overrideDims={true}
    >
      <Link to={to} className="flex flex-col flex-shrink w-full">
        <div className="flex gap-4 items-center">
          <div className="p-4 rounded-lg bg-neutral-800 bg-gradient-to-br from-white/40 to-transparent">
            {icon}
          </div>
          {children}
        </div>
      </Link>
    </Card>
  );
};
