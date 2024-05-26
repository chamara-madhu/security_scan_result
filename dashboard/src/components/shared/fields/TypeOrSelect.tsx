import { forwardRef, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import classnames from "classnames";

interface OptionType {
  label: string;
  value: string;
}

interface TypeOrSelectProps {
  className?: string;
  labelClass?: string;
  inputClass?: string;
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  options: OptionType[];
  error?: string;
  showRequiredLabel?: boolean;
  onChange: (event: { target: { name: string; value: string } }) => void;
}

const TypeOrSelect = forwardRef<HTMLDivElement, TypeOrSelectProps>(
  function TypeOrSelectComponent(
    {
      className,
      labelClass,
      inputClass,
      label,
      name: fieldName,
      value,
      placeholder,
      options,
      error,
      showRequiredLabel = false,
      onChange,
    },
    ref
  ) {
    const [optionValue, setOptionValue] = useState<OptionType | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        setOptionValue({
          label: value,
          value: value,
        });
      };

      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const customStyles: StylesConfig<OptionType, false> = {
      control: (styles, { isFocused }) => ({
        ...styles,
        outline: "none",
        border: error
          ? "1px solid #e94848"
          : isFocused
          ? "1px solid #d8b4fe"
          : "1px solid #D0D5DD",
        borderRadius: 7,
        height: 40,
        width: "100%",
        cursor: "pointer",

        ":hover": {
          borderColor: "#D0D5DD",
        },
      }),
      menu: (styles) => ({
        ...styles,
        borderRadius: 7,
        zIndex: 999999,
      }),
    };

    return (
      <div
        className={classnames("flex flex-col gap-1.5", className)}
        style={{ position: "relative" }}
      >
        {label && (
          <label
            className={classnames(
              "text-sm font-medium leading-[20px]",
              labelClass
            )}
          >
            {label} {showRequiredLabel ? "*" : null}
          </label>
        )}
        <div
          className={classnames(
            "flex outline-none w-full h-11 bg-white shadow-xs",
            inputClass
          )}
          style={{ position: "relative" }}
        >
          <Select
            // ref={ref}
            onChange={(newValue) => {
              setOptionValue(newValue);
              onChange({
                target: {
                  name: fieldName,
                  value: newValue?.value || "",
                },
              });
            }}
            options={
              optionValue &&
              !options.some((option) => option.label === optionValue.label)
                ? [...options, optionValue]
                : [...options]
            }
            value={optionValue}
            className="w-full"
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#F4EBFF",
                primary: "#D6BBFB",
              },
            })}
            placeholder={placeholder}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

TypeOrSelect.displayName = "TypeOrSelect";

export default TypeOrSelect;
