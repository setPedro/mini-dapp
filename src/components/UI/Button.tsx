import { cn } from "@/lib"

type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  size: "icon" | "md" | "lg"
  color: "primary" | "accent"
}

export default function Button({ children, onClick, size, color }: ButtonProps) {
  const classNames = {
    common: "rounded-md font-bold hover:opacity-70 transition duration-300",
    sizes: {
      icon: "p-[7px] sm:p-[9px] md:p-[13px]",
      md: "text-sm sm:text-base px-4 py-2",
      lg: "text-base sm:text-lg px-8 py-4"
    },
    colors: {
      accent: "bg-accent",
      primary: "bg-primary",
    },
  }

  return (
    <div className={cn(classNames.common, classNames.sizes[size], classNames.colors[color])} onClick={onClick}>
      {children}
    </div>
  )
}

