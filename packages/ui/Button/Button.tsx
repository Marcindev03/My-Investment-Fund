import { FC, ReactNode } from "react";
import ClassNames from "classnames";
import { CgSpinner } from "react-icons/cg";

type ButtonProps = {
  primary?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  primary = false,
  disabled = false,
  isLoading = false,
  children,
  onClick,
}) => {
  const buttonClassName = ClassNames(
    "text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150",
    {
      "bg-blueGray-800 text-white active:bg-blueGray-600": primary,
      "inline-flex items-center justify-center": isLoading,
      "opacity-50": disabled,
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
