import React, { ReactNode, MouseEvent } from "react";
import cn from "classnames";

import css from "./button.module.scss";

interface IButtonProps {
  bstyle?: "rounded" | "iconed" | "secondary";
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: ReactNode;
}

export const Button: React.FC<IButtonProps> = ({
  className,
  bstyle = "rounded",
  children,
  disabled,
  onClick,
  icon,
  type = "button",
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={cn(
      css.button,
      {
        [css.rounded]: bstyle === "rounded",
        [css.secondary]: bstyle === "secondary",
        [css.iconed]: bstyle === "iconed",
        [css.disabled]: disabled,
      },
      className
    )}
    {...props}
    onClick={onClick}
  >
    {icon}
    {children}
  </button>
);
