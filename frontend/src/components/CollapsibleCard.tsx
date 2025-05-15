import { Card } from "./Card";

/**
 * A card component with a header section and collapsible content area.
 *
 * Features:
 * - Consistent card styling through Card component
 * - Header section with title
 * - Flexible content area
 * - Semantic HTML structure
 *
 * This component provides a standardized way to display collapsible content
 * sections with headers throughout the application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be displayed in the collapsible area
 * @param {React.ReactNode} props.header - Content to be displayed in the header section
 * @returns {JSX.Element} A card component with header and content sections
 */
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
