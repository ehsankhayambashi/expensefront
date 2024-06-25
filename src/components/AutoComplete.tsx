import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";

// Custom hook to handle outside clicks
function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

interface Option {
  id: string;
  value: string;
}

interface AutocompleteProps {
  options: Option[];
  onChange?: (selectedOptions: Option[]) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options, onChange }) => {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [allOptions, setAllOptions] = useState<Option[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredOptions(
        allOptions.filter((option) =>
          option.value.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 300); // Debounce input by 300ms

    return () => clearTimeout(timer);
  }, [query, allOptions]);

  useOutsideClick(containerRef, () => setShowOptions(false));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowOptions(true);
  };

  const handleSelect = (option: Option) => {
    if (!selectedOptions.find((selected) => selected.id === option.id)) {
      const newSelectedOptions = [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
      setQuery("");
      if (onChange) onChange(newSelectedOptions);
    }
    setShowOptions(false);
  };

  const handleRemove = (option: Option) => {
    const newSelectedOptions = selectedOptions.filter(
      (selected) => selected.id !== option.id
    );
    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const matchingOptions = filteredOptions.filter(
        (option) => option.value.toLowerCase() === query.toLowerCase()
      );
      if (matchingOptions.length === 0 && query.trim() !== "") {
        const newOption: Option = {
          id: `${allOptions.length + 1}`,
          value: query,
        };
        handleSelect(newOption);
        setAllOptions([...allOptions, newOption]);
      } else if (matchingOptions.length > 0) {
        handleSelect(matchingOptions[0]);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-wrap items-center border border-gray-300 rounded-md p-2">
        {selectedOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center bg-blue-100 rounded-md p-1 m-1"
          >
            <span className="mr-2">{option.value}</span>
            <button
              onClick={() => handleRemove(option)}
              className="text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow p-2"
          value={query}
          onChange={handleChange}
          onClick={() => setShowOptions(true)}
          onKeyDown={handleKeyDown}
          aria-label="Autocomplete input"
        />
      </div>
      {showOptions && (
        <ul
          className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-60 overflow-y-auto"
          aria-label="Autocomplete options"
        >
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
