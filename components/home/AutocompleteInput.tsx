"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type AutocompleteInputProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
  maxSuggestions?: number;
};

export default function AutocompleteInput({
  value,
  onChange,
  options,
  placeholder,
  className,
  maxSuggestions = 8,
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return [];
    return options
      .filter((option) => option.toLowerCase().includes(query))
      .sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(query) ? 0 : 1;
        const bStarts = b.toLowerCase().startsWith(query) ? 0 : 1;
        return aStarts - bStarts || a.length - b.length;
      })
      .slice(0, maxSuggestions);
  }, [options, value, maxSuggestions]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = isOpen && suggestions.length > 0;

  function selectOption(option: string) {
    onChange(option);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      if (activeIndex >= 0) {
        event.preventDefault();
        selectOption(suggestions[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function highlightMatch(option: string) {
    const query = value.trim().toLowerCase();
    const index = option.toLowerCase().indexOf(query);
    if (index === -1 || !query) return option;

    return (
      <>
        {option.slice(0, index)}
        <span className="text-saffron font-semibold">
          {option.slice(index, index + query.length)}
        </span>
        {option.slice(index + query.length)}
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={listId}
        aria-autocomplete="list"
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />

      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-white/15 bg-neutral-900/95 py-1 shadow-xl shadow-black/40 backdrop-blur-sm"
        >
          {suggestions.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => {
                event.preventDefault();
                selectOption(option);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className={`cursor-pointer px-3 py-2 text-sm transition-colors ${
                index === activeIndex
                  ? "bg-saffron/20 text-white"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              {highlightMatch(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
