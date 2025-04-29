import { Logo } from "./Logo";

export const LogoButton = ({
  type = "primary",
}: {
  type?: "primary" | "inverted";
}) => {
  const buttonClass = {
    primary: "bg-white/5 backdrop-blur-sm border border-white/10",
    inverted: "bg-gradient-mimiq border border-white/10",
  };
  return (
    <div
      className={`flex flex-1 items-center justify-center px-2 py-2 rounded-md ${buttonClass[type]}`}
    >
      <Logo className="text-3xl" type={type === "primary" ? "color" : "gray"} />
    </div>
  );
};
