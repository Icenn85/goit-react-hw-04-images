import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onLoadMoreClick }) => {
  return (
    <button type="Button" onClick={onLoadMoreClick} className={css.button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
