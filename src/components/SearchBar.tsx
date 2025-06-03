import React, { useState, KeyboardEvent } from 'react';

interface Props { onSearch: (term: string) => void; }

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const handleSearch = () => onSearch(term.trim());
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Busque aqui..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;