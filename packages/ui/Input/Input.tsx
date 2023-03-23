import { ChangeEvent, FC } from "react";
import ClassNames from "classnames";

type InputProps = {
  value: string;
  isInvalid?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export const Input: FC<InputProps> = ({
  value,
  isInvalid,
  placeholder = "",
  onChange,
  onBlur,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClassName = ClassNames(
    "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150",
    {
      "outline-red-500": isInvalid,
    }
  );

  return (
    <input
      value={value}
      onChange={handleInputChange}
      onBlur={() => onBlur?.()}
      type="text"
      className={inputClassName}
      placeholder={placeholder}
    />
  );
};
