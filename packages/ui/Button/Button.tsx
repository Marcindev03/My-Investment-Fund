import { FC, ReactNode } from "react";
import ClassNames from "classnames";
import { CgSpinner } from "react-icons/cg";

type ButtonProps = {
  primary?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  primary = false,
  disabled = false,
  isLoading = false,
  size = "md",
  children,
  onClick,
}) => {
  const buttonClassName = ClassNames(
    "font-bold py-3 uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150",
    {
      "bg-blueGray-800 text-white active:bg-blueGray-600": primary,
      "inline-flex items-center justify-center": isLoading,
      "opacity-50": disabled,
      "text-xs": size === "sm",
      "text-sm px-6": size === "md",
      "text-base px-6": size === "lg",
    }
  );

  return (
    <>
      <button
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        className={buttonClassName}
        onClick={!disabled ? onClick : undefined}
      >
        {isLoading ? (
          <>
            <CgSpinner className="animate-spin mr-3" size="1.5em" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    </>
  );
};
