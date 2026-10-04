import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const variants = {
  primary: clsx(
    "bg-accent-strong text-white shadow-glow",
    "bg-linear-to-b from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-600",
  ),
  secondary:
    "border border-line-strong bg-white/[0.06] text-fg hover:bg-white/[0.1]",
  ghost: "text-fg-muted hover:bg-white/[0.06] hover:text-fg",
  icon: "size-9 border border-line bg-white/[0.03] px-0! text-fg-muted hover:border-line-strong hover:bg-white/[0.08] hover:text-fg",
  ringlessGhost: "px-0! text-fg-muted hover:text-fg",
};

export type ButtonVariant = keyof typeof variants;

/** Button styles for elements that are not <button>, e.g. a <Link>. */
export const buttonClassName = (
  variant: ButtonVariant = "primary",
  className?: string,
) =>
  clsx(
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-medium",
    "transition duration-150 select-none active:scale-[0.98]",
    variants[variant],
    className,
  );

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    className={buttonClassName(
      variant,
      clsx({ "pointer-events-none opacity-50": props.disabled }, className),
    )}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
