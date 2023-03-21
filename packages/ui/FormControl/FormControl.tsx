import { FC, cloneElement, ReactElement, useState } from "react";

type FormControlProps = {
  labelTitle: string;
  errorMessage?: string;
  isInvalid?: boolean;
  children: ReactElement;
};

export const FormControl: FC<FormControlProps> = ({
  labelTitle,
  errorMessage = "",
  isInvalid = false,
  children,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const onInputBlur = () => setShowErrors(true);

  return (
    <div className="relative w-full mb-3">
      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
        {labelTitle}
      </label>
      {cloneElement(children, {
        isInvalid: showErrors && isInvalid,
        onBlur: onInputBlur,
      })}
      {showErrors && isInvalid && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};
