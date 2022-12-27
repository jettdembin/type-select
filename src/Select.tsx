import { useEffect, useState } from "react";
import styles from "./select.module.css";

type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value?: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[] & (SingleSelectProps | MultipleSelectProps);
};

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(true);

  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o: SelectOption) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) {
        onChange(option);
      }
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      className={styles.container}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v: any) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
              >
                {v.label}
              </button>
            ))
          : value?.label}
      </span>
      <button
        className={styles["clear-btn"]}
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : null}`}>
        {options.map((option, i) => (
          <li
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : null
            } ${i === highlightedIndex ? styles.highlighted : null}`}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(i)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
