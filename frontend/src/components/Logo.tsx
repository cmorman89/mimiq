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
            : "text-gray-300"
        }`}
      >
        MIM
      </span>
      <span
        className={`${
          type === "color"
            ? "bg-gradient-to-r from-rose-400 via-orange-500 to-pink-500 bg-clip-text text-transparent"
            : "text-gray-300"
        }`}
      >
        IQ
      </span>
    </div>
  );
};
