/**
 * Application logo component that displays the MIMIQ brand name.
 *
 * Features:
 * - Gradient text effects for color mode
 * - Monochrome option for gray mode
 * - Customizable styling through className prop
 * - Responsive text sizing
 * - Split color treatment for brand name
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {'color' | 'gray'} [props.type='color'] - Logo style variant
 * @returns {JSX.Element} A styled logo component
 */
export const Logo = ({
  className = "",
  type = "color",
}: {
  className?: string;
  type?: "color" | "gray";
}) => {
  return (
    <div
      className={`flex-shrink-0 text-3xl font-bold text-white tracking-tight ${className}`}
    >
      <span
        className={`${
          type === "color"
            ? "bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent"
            : "text-gray-100/70"
        }`}
      >
        MIM
      </span>
      <span
        className={`${
          type === "color"
            ? "bg-gradient-to-r from-rose-400 via-orange-500 to-pink-500 bg-clip-text text-transparent"
            : "text-gray-100/90"
        }`}
      >
        IQ
      </span>
    </div>
  );
};
