import { cn } from "@/lib";
import { ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

export const Modal = ({ children, onClose, className }: Props) => {
  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed z-10 top-0 left-0 h-screen w-full bg-background bg-opacity-60 flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div
        className={cn(
          "relative p-6 rounded-lg bg-primary opacity-100",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
