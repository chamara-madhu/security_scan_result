import { useState, useMemo, forwardRef, ChangeEvent } from "react";
import classnames from "classnames";

type InputProps = {
  type?: string;
  label?: string;
  name?: string;
  value: string | number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelClass?: string;
  inputClass?: string;
  className?: string;
  showRequiredLabel?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  error?: string;
  info?: string;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function InputComponent(
  {
    type = "text",
    label,
    name,
    value,
    handleChange,
    labelClass,
    inputClass,
    className,
    showRequiredLabel = false,
    isDisabled = false,
    placeholder,
    error,
    info,
    maxLength,
    min,
    max,
  },
  ref
) {
  const [isFocus, setIsFocus] = useState(false);

  const focusClass = useMemo(
    () => (isFocus ? "border-purple-300" : ""),
    [isFocus]
  );

  return (
    <div className={classnames("flex w-full flex-col gap-1.5", className)}>
      <label
        className={classnames("text-sm font-medium text-gray-700", labelClass)}
      >
        {label} {showRequiredLabel ? "*" : null}
      </label>
      <div
        className={classnames(
          "flex relative outline-none w-full h-10 bg-white border rounded-lg shadow-xs",
          focusClass,
          inputClass,
          error ? "border-red-500" : "border-pp-gray-300"
        )}
      >
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          className="w-full px-3 h-full outline-none rounded-lg placeholder:text-pp-gray-500"
          onFocusCapture={() => setIsFocus(true)}
          onBlurCapture={() => setIsFocus(false)}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={isDisabled}
          maxLength={maxLength}
          min={min}
          max={max}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {info && <p className="text-xs text-pp-gray-600">{info}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
