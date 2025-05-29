import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
            />
            {query && (
                <button
                    type="button"
                    className="ml-2 p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none"
                    aria-label="Clear search"
                    onClick={() => {
                        setQuery('');
                        onSearch('');
                    }}
                >
                    &#10005;
                </button>
            )}
            <button className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                Search
            </button>
        </div>
    );
};

export default SearchBar;