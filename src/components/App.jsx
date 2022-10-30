import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../service/api';
import { Button } from './Button/Button';
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

export function App() {
   const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fullSizeImg, setFullSizeImg] = useState('');
  const [isEndOfArray, setIsEndOfArray] = useState(true);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { data } = await getImages(searchQuery, page);
        setImages(images => [...images, ...data.hits]);
        setIsLoading(false);

        if (data.totalHits === 0) {
          toast.error('Cannot find your request! Please try again');
        }

        if (data.totalHits !== 0 && page === 1) {
          toast.success(`We find ${data.totalHits} images`);
        }

        if (page > data.totalHits / 12 && data.totalHits !== 0) {
          toast.warn(
            'We are sorry, but you have reached the end of search results.'
          );
          return setIsEndOfArray(false);
        }
      } catch (error) {
        toast.error('sorry, try again later');
      }
    };
    fetchImages();
  }, [searchQuery, page]);

  const onHandleFormSubmit = imageName => {
    setImages([]);
    setSearchQuery(imageName);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = fullSizeImg => {
    setFullSizeImg(fullSizeImg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

    return (
      <div className={css.app}>
        <Searchbar onSubmit={onHandleFormSubmit} />
        {isLoading && (
          <div className={css.loader}>
            <Circles
              color="#f07416"
              arialLabel="loading-indicator"
              height={80}
              width={80}
            />
          </div>
        )}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={openModal} />
        )}
        {isEndOfArray && images.length > 0 && (
          <Button type="button" onLoadMoreClick={onLoadMore} />
        )}
        {showModal && (
          <Modal
            fullSizeImg={fullSizeImg}
            searchQuery={searchQuery}
            onClose={closeModal}
          ></Modal>
        )}
        <ToastContainer position="top-center" theme="colored" />
      </div>
    );
  }
