import React, { useState } from "react";
import { Input } from "@nextui-org/react";

type NumberInputProps = {
  onChange: (value: string) => void;
};

// Utility function to convert Persian numbers to English numbers
const convertPersianToEnglish = (persianNumber: string) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  return persianNumber.replace(
    /[۰-۹]/g,
    (d) => englishDigits[persianDigits.indexOf(d)]
  );
};

const NumberInput: React.FC<NumberInputProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Convert Persian numbers to English numbers
    inputValue = convertPersianToEnglish(inputValue);

    // Validate and set the value if it's a number
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <Input
      fullWidth
      placeholder="Enter number"
      value={value}
      onChange={handleChange}
    />
  );
};

export default NumberInput;
