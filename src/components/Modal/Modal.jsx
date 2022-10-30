import React, { useEffect } from 'react';

import css from'./Modal.module.css';

export default function Modal({ onClose, largeImageImg }) {
  useEffect(() => {
     const handleKeyDown = evt => {
       if (evt.code === 'Escape') {
         onClose();
       }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeImageImg} alt='' />
      </div>
    </div>
  );
}
