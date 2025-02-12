import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/countries?name=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar países', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por país"
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {results.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
