import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = evt => {
    setSearchQuery(evt.currentTarget.value.toLowerCase());
  };

    const handleSubmit = evt => {
        evt.preventDefault();
      
        if (searchQuery.trim() === '') {
            alert('Please enter your search term');
            return;
        };

        onSubmit(searchQuery);
        setSearchQuery('');
    }

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchForm__button}>
            <ImSearch />
          </button>

          <input
            className={css.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleQueryChange}
          />
        </form>
      </header>
    );
  }

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
