export const Divider = ({ className }: { className?: string }) => {
  if (className?.includes("bg-")) {
    return <div className={`w-full h-px ${className}`} />;
  }
  return <div className={`w-full h-px bg-gray-700 ${className}`} />;
};
