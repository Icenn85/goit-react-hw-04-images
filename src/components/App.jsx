import React, { Component } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../service/api';
import { Button } from './Button/Button';
import { Circles } from 'react-loader-spinner';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    isLoading: false,
    images: [],
    showModal: false,
    fullSizeImg: '',
    isEndOfArray: true,
  };

  onHandleFormSubmit = data => {
    this.setState({ images: [], searchQuery: data, page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });
    const { searchQuery, page } = this.state;
    try {
      const { data } = await getImages(searchQuery, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
      }));

      if (data.totalHits === 0) {
        alert(
          'Cannot find your request! Please try again'
        );
        return;
      }
      if (this.state.page > data.totalHits / 12 && data.totalHits !== 0) {
        alert('We are sorry, but you have reached the end of search results.');
        this.setState({ isEndOfArray: false });
        return;
      }
      if (data.totalHits !== 0 && page === 1) {
        alert(`We find ${data.totalHits} images`);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      fullSizeImg: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, fullSizeImg: '' });
  };

  render() {
    const {
      searchQuery,
      images,
      isLoading,
      fullSizeImg,
      showModal,
      isEndOfArray,
    } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onHandleFormSubmit} />
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
          <ImageGallery images={images} onImageClick={this.openModal} />
        )}
        {images.length > 0 && isEndOfArray && (
          <Button onLoadMoreClick={this.onLoadMore} />
        )}
        {showModal && (
          <Modal
            fullSizeImg={fullSizeImg}
            searchQuery={searchQuery}
            onClose={this.closeModal}
          ></Modal>
        )}
      </div>
    );
  }
}
