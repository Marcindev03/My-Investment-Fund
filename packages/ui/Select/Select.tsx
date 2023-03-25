import { ChangeEvent, FC } from "react";
import ClassNames from "classnames";

export type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  availableOptions: Option[];
  isInvalid?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export const Select: FC<SelectProps> = ({
  value,
  availableOptions,
  isInvalid,
  placeholder = "",
  onChange,
  onBlur,
}) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const selectClassName = ClassNames(
    "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150",
    {
      "outline-red-500": isInvalid,
    }
  );

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      className={selectClassName}
      onBlur={() => onBlur?.()}
    >
      {!!placeholder && <option value="">{placeholder}</option>}
      {availableOptions.map(({ label, value }) => (
        <option key={`option_${value}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
