"use client";

import clsx from "clsx";
import { HTMLProps } from "react";
import "./style.css";
interface Props {
  children?: React.ReactNode;
  className?: HTMLProps<HTMLButtonElement>["className"];
  variant?: "contained" | "outline" | "text";
  color?: "primary" | "secondary" | "gray";
  title?: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"; // Explicitly define valid button types
  isLoading?: boolean;
}

const Button = (props: Props) => {
  const {
    className,
    children,
    title = "Button",
    variant = "contained",
    color = "primary",
    disabled,
    onClick,
    type = "button",
    isLoading = false,
  } = props;

  const baseStyles =
    "flex h-9 min-w-[80px] w-fit cursor-pointer items-center max-sm:text-xs max-sm:px-2 justify-center rounded-md px-4 transition-all duration-300";

  // Styling object for variants and colors
  const variantStyles: Record<string, Record<string, string>> = {
    contained: {
      primary: "bg-primary text-white active:scale-90",
      secondary: "bg-secondary text-white hover:opacity-80 active:scale-90",
      gray: "bg-gray-300 text-black hover:opacity-80 active:scale-90",
    },
    outline: {
      primary:
        "border border-primary text-primary hover:bg-primary hover:text-white active:scale-90",
      secondary:
        "border border-secondary text-secondary hover:bg-secondary hover:text-white active:scale-90",
      gray: "border border-gray-300 text-gray-600 hover:bg-gray-300 hover:text-black active:scale-90",
    },
    text: {
      primary: "text-primary hover:underline active:scale-90",
      secondary: "text-secondary hover:underline active:scale-90",
      gray: "text-gray-600 hover:underline active:scale-90",
    },
  };

  const disabledStyles =
    "cursor-not-allowed opacity-50 hover:opacity-50 active:scale-100";

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant][color],
        disabled && disabledStyles,
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {isLoading ? (
        // Default values shown
        <svg className="container" viewBox="0 0 40 40" height="40" width="40">
          <circle
            className="track"
            cx="20"
            cy="20"
            r="17.5"
            // pathlength="100"
            stroke-width="5px"
            fill="none"
          />
          <circle
            className="car"
            cx="20"
            cy="20"
            r="17.5"
            // pathlength="100"
            stroke-width="5px"
            fill="none"
          />
        </svg>
      ) : (
        <p className="text-sm font-semibold">{title}</p>
      )}

      {children}
    </button>
  );
};

export default Button;
