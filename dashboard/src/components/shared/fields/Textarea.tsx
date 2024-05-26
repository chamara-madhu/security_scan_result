import { useState, useMemo, forwardRef, ChangeEvent } from "react";
import classnames from "classnames";

interface TextareaProps {
  label?: string;
  name?: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  labelClass?: string;
  inputClass?: string;
  className?: string;
  showRequiredLabel?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  error?: string;
  info?: string;
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function TextareaComponent(
    {
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
      rows = 3,
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
          className={classnames(
            "text-sm font-medium text-gray-700",
            labelClass
          )}
        >
          {label} {showRequiredLabel ? "*" : null}
        </label>
        <div
          className={classnames(
            "flex relative outline-none w-full bg-white border rounded-lg shadow-xs",
            focusClass,
            inputClass,
            error ? "border-red-500" : "border-pp-gray-300"
          )}
        >
          <textarea
            ref={ref}
            name={name}
            value={value}
            className="w-full h-full p-3 rounded-lg outline-none placeholder:text-pp-gray-500"
            onFocusCapture={() => setIsFocus(true)}
            onBlurCapture={() => setIsFocus(false)}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={isDisabled}
            rows={rows}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {info && <p className="text-xs text-pp-gray-600">{info}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
