//main

import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { createMarkup } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

// Import styles
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const imgContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn');

let searchQuery = '';
let page = 1;
let limit = 15;
let lightbox = null;

async function fetchAndRenderPhotos() {
  try {
    const imagesData = await fetchPhotos(searchQuery, page);

    if (imagesData.hits.length === 0 && page === 1) {
      iziToast.error({
        position: 'topRight',
        timeout: 2000,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loadMoreBtn.classList.add('is-hidden');
      return;
    }

    const initialHeight = imgContainer.getBoundingClientRect().height;
    imgContainer.innerHTML += createMarkup(imagesData.hits);
    const newHeight = imgContainer.getBoundingClientRect().height;
    const scrollByHeight = newHeight - initialHeight;

    window.scrollBy({
      top: scrollByHeight,
      behavior: 'smooth',
    });

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
    } else {
      lightbox.refresh();
    }

    if (imagesData.hits.length < limit) {
      loaderEl.classList.add('is-hidden');
    } else {
      loaderEl.classList.remove('is-hidden');
    }

    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
    iziToast.error({
      position: 'topRight',
      timeout: 2000,
      message: 'Sorry, something went wrong. Please try again!',
    });
  } finally {
    loaderEl.classList.add('is-hidden');
  }
}

async function onSearch(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchKeyword.value.trim();
  imgContainer.innerHTML = '';
  page = 1;
  loadMoreBtn.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');

  if (searchQuery === '') {
    iziToast.error({
      position: 'topRight',
      timeout: 2000,
      message: 'Please enter a search query!',
    });
    loaderEl.classList.add('is-hidden');
    return;
  }
  await fetchAndRenderPhotos();
  event.target.reset();
}

async function onLoadMore() {
  page += 1;
  const totalPages = Math.ceil(100 / limit);
  if (page > totalPages) {
    loadMoreBtn.classList.add('is-hidden');
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }
  loaderEl.classList.remove('is-hidden');
  await fetchAndRenderPhotos();
}

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
