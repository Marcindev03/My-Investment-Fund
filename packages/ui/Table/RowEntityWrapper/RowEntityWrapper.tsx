import { FC, ReactNode } from "react";

type RowEntityWrapperProps = {
  children: ReactNode;
};

export const RowEntityWrapper: FC<RowEntityWrapperProps> = ({ children }) => (
  <div className="h-full w-full flex justify-center items-center">
    {children}
  </div>
);
