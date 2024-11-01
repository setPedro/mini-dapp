import { cn } from "@/lib";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  size: "icon" | "md" | "lg";
  color: "primary" | "accent" | "deposit" | "withdraw";
  className?: string;
};

export default function Button({
  children,
  onClick,
  size,
  color,
  className,
}: ButtonProps) {
  const classNames = {
    common:
      "flex items-center rounded-md font-bold hover:opacity-70 transition duration-300 hover:cursor-pointer",
    sizes: {
      icon: "p-[7px] sm:p-[9px] md:p-[13px]",
      md: "text-sm sm:text-base px-4 py-2",
      lg: "text-base sm:text-lg px-8 py-4",
    },
    colors: {
      accent: "bg-accent text-background",
      primary: "bg-primary",
      deposit: "bg-deposit",
      withdraw: "bg-withdraw",
    },
  };

  return (
    <div
      className={cn(
        classNames.common,
        classNames.sizes[size],
        classNames.colors[color],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
