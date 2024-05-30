import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
   
      navigate('/search',
        {
          // state: {
          //  'bdl':'abc'
          // }
          state: (query)
        }
      )
     
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search query"
        className="topSearchBox"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;