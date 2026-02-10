
import { useState, useEffect, useRef } from "react";
import Search from "../assets/images/icon-search.svg";
import { searchCities } from "../api/geocoding";
import type { CitySuggestion } from "../api/geocoding";

type SearchBarProps = {
  onSearch: (city: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query.trim());
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setIsLoading(false);
      }
    }; 

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city: CitySuggestion) => {
    onSearch(`${city.name}, ${city.country}`);
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <section className="text-white mt-15">
      <div className="flex justify-center">
        <div className="w-full max-w-sm lg:max-w-xl flex flex-col gap-4 lg:flex-row lg:gap-2">
          <div className="relative w-full" ref={dropdownRef}>
            <img
              src={Search}
              alt="Search icon"
              className="absolute left-3 top-1/3 -translate-y-1/3 w-4 h-4 pointer-events-none"
            />

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a place..."
              className="unit w-full px-10 py-2 font-bold rounded-md focus:ring-1 focus:outline-none text-xl lg:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
                if (e.key === "Escape") setShowDropdown(false);
              }}
            />

            {/* Dropdown suggestions */}
            {showDropdown && suggestions.length > 0 && (
              <ul className="unit absolute z-50 w-full mt-2 rounded-md overflow-hidden shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((city, index) => (
                  <li
                    key={`${city.name}-${city.latitude}-${index}`}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors duration-150"
                    onClick={() => handleSelect(city)}
                  >
                    <div className="font-semibold">{city.name}</div>
                    <div className="text-sm text-gray-400">{city.country}</div>
                  </li>
                ))}
              </ul>
            )}

            {/* Loading indicator */}
            {isLoading && query.length >= 2 && (
              <div className="unit absolute z-50 w-full mt-2 rounded-md shadow-lg px-4 py-3 text-center text-gray-400">
                Searching...
              </div>
            )}

            {/* No results message */}
            {!isLoading &&
              query.length >= 2 &&
              suggestions.length === 0 &&
              showDropdown && (
                <div className="unit absolute z-50 w-full mt-2 rounded-md shadow-lg px-4 py-3 text-center text-gray-400">
                  No cities found
                </div>
              )}
          </div>

          <button
            className="search w-full px-5 py-2 mt-2 font-semibold rounded-md lg:mt-0 lg:w-1/4 lg:shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
