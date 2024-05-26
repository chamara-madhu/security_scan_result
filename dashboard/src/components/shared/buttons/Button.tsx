import React, {
  forwardRef,
  useMemo,
  ReactNode,
  CSSProperties,
  MouseEventHandler,
} from "react";
import classnames from "classnames";
import { ClipLoader } from "react-spinners";

type ButtonProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "light" | "primary" | "dark";
  isLoading?: boolean;
  handleButton?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  cusStyle?: CSSProperties;
  isDisabled?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonComponent(
    {
      id,
      children,
      className,
      variant,
      isLoading,
      handleButton,
      type = "button",
      cusStyle = {},
      isDisabled,
    },
    ref
  ) {
    const variantClass = useMemo(() => {
      switch (variant) {
        case "light":
          return `
          outline-none bg-white shadow-xs border border-purple-400 text-purple-400 text-sm font-medium
          hover:border-purple hover:bg-purple-50 hover:text-purple-500
          focus:border-purple focus:bg-white focus:text-purple
          disabled:border-purple-200 disabled:bg-white disabled:text-purple
        `;
        case "primary":
          return `
          border text-white text-sm font-semibold shadow-xs bg-purple-500 border-purple-500
          hover:border-purple-700 hover:bg-purple-700
          focus:border-purple-500 focus:bg-purple-500 focus:shadow-sm-focused-primary-100
          disabled:border-purple-200 disabled:bg-purple-200
        `;
        case "dark":
          return "bg-black text-white text-sm font-medium";
        default:
          return "bg-red-700 text-white text-sm font-medium";
      }
    }, [variant]);

    return (
      <button
        ref={ref}
        id={id}
        type={type}
        className={classnames(
          "flex justify-center rounded-lg relative px-5 items-center gap-1 h-10",
          variantClass,
          className
        )}
        onClick={handleButton}
        style={cusStyle}
        disabled={isLoading || isDisabled}
      >
        {isLoading ? (
          <ClipLoader
            color={"#fff"}
            loading={true}
            size={16}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
