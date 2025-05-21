/**
 * A versatile card component that provides a consistent container with customizable styling.
 *
 * Features:
 * - Configurable background type (light/dark)
 * - Adjustable padding options
 * - Optional transparency
 * - Click handler support
 * - Responsive design with rounded corners and border
 * - Backdrop blur effect for modern UI aesthetics
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Content to be rendered inside the card
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {'light' | 'dark'} [props.type='light'] - Card theme type
 * @param {'default' | 'tight' | 'none'} [props.padding='default'] - Padding configuration
 * @param {boolean} [props.transparent=true] - Whether the card should have a transparent background
 * @param {() => void} [props.onClick] - Click event handler
 * @returns {JSX.Element} A styled card container
 */
export const Card = ({
  children = null,
  className = "",
  type = "light",
  padding = "default",
  transparent = true,
  onClick = () => {},
  overrideDims = false,
}: {
  children?: React.ReactNode;
  className?: string;
  type?: "light" | "dark";
  padding?: "default" | "tight" | "none";
  transparent?: boolean;
  onClick?: () => void;
  overrideDims?: boolean;
}) => {
  const bgColor =
    type === "light"
      ? transparent
        ? "bg-white/5"
        : "bg-white"
      : transparent
      ? "bg-black/20"
      : "bg-slate-950/80";
  const paddingClass = {
    default: "p-6",
    tight: "px-6 py-3",
    none: "px-6 py-0",
  }[padding];
  return (
    <div
      className={`relative flex overflow-auto ${overrideDims ? "" : "w-full h-full"} rounded-xl border border-white/10 ${bgColor} backdrop-blur-md ${paddingClass} ${className} shadow-lg`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
