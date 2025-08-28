import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './search-box.css';

const SearchBox: React.FC = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams<{ keyword?: string }>();

  // Controlled input with fallback to URL param or empty string
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="search-box">
      <input
        type="text"
        name="q"
        placeholder="Search Products..."
        value={keyword}
        className="search-input"
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="Search products"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
