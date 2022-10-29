import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  picture,
  tags,
  largeImageURL,
  onOpenImage,
}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        src={picture}
        alt={tags}
              className={css.imageGalleryItem__image}
        onClick={() => {
          onOpenImage(largeImageURL);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenImage: PropTypes.func.isRequired,
};
