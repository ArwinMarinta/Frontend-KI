import React from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit, placeholder = "Cari sesuatu..." }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="w-full mx-auto" onSubmit={handleSubmit}>
      <div className="flex">
        <div className="relative w-full">
          <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
          <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-PRIMARY01 rounded-e-lg border border-PRIMARY01 hover:bg-PRIMARY01 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
