import React, { useState, useRef, useEffect } from "react";
import s from "./MyDropdown.module.scss";
import { typeDropdownOption as Option } from "../../types/typeDropdownOption";

type Props = {
  options: Option[];
  placeholder?: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<Option | null>>;
  selectedOption: Option | null;
};

export default function Dropdown({
  options,
  placeholder = "Select an option",
  setSelectedOption,
  selectedOption,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className={s.dropdown} ref={dropdownRef}>
      <div
        className={
          isOpen ? `${s.dropdownControl} ${s.open}` : `${s.dropdownControl}`
        }
        onClick={toggleDropdown}
      >
        <span className={s.dropdownValue}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className={`${s.dropdownArrow} ${isOpen ? s.open : ""}`}>▼</div>
      </div>
      {isOpen && (
        <div className={s.dropdownMenu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={
                selectedOption?.label === option.label
                  ? `${s.dropdownOption} ${s.active}`
                  : s.dropdownOption
              }
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
