import { ChangeEvent, FC } from "react";
import ClassNames from "classnames";

type NumberInputProps = {
  value: number;
  isInvalid?: boolean;
  placeholder?: string;
  onChange: (value: number) => void;
  onBlur?: () => void;
};

export const NumberInput: FC<NumberInputProps> = ({
  value,
  isInvalid,
  placeholder = "",
  onChange,
  onBlur,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
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
      type="number"
      className={inputClassName}
      placeholder={placeholder}
    />
  );
};
