import { FC, ReactNode } from "react";
import ClassNames from "classnames";

type CardContainerProps = {
  variant?: "light" | "dark";
  children: ReactNode;
};

export const CardContainer: FC<CardContainerProps> = ({
  variant = "light",
  children,
}) => {
  return (
    <section
      className={ClassNames(
        "w-full rounded p-4 break-words shadow-lg relative",
        {
          "bg-white": variant === "light",
          "bg-blueGray-700": variant === "dark",
        }
      )}
    >
      {children}
    </section>
  );
};
