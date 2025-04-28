export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col overflow-auto w-full h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
      {children}
    </div>
  );
};
