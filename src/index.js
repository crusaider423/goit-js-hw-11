import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchService } from './js/fetchPixabayService';
import { markup } from './js/markup';
import { formRef, galleryRef, loadMoreBtnRef } from './js/refs';
const lightbox = new SimpleLightbox('.photo-card a');

const FAIL =
  'Sorry, there are no images matching your search query. Please try again.';
const END_RESULTS =
  "We're sorry, but you've reached the end of search results.";

let page = 1;
let lastValue = '';

formRef.addEventListener('submit', handleForm);
loadMoreBtnRef.addEventListener('click', handleBtnLoadMore);

function handleForm(e) {
  e.preventDefault();
  const inputValue = e.target.elements.searchQuery.value.trim();
  lastValue = inputValue;
  page = 1;
  loadMoreBtnRef.style.display = 'none';
  performSearch(inputValue, page);
}

function handleBtnLoadMore() {
  page += 1;
  loadMoreBtnRef.style.display = 'none';
  loadMoreImages(lastValue, page);
}

function slowScroll() {
  const { height: cardHeight } =
    galleryRef.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function performSearch(inputValue, page) {
  fetchService(inputValue, page)
    .then(({ hits, totalHits }) => {
      if (hits.length === 0 || !inputValue) {
        galleryRef.innerHTML = '';
        Notify.failure(FAIL);
        return;
      }

      galleryRef.innerHTML = markup(hits);
      Notify.success(`Hooray! We found ${totalHits} images.`);
      loadMoreBtnRef.style.display = 'block';
      lightbox.refresh();
    })
    .catch(er => console.log(er.message));
}

function loadMoreImages(lastValue, page) {
  fetchService(lastValue, page)
    .then(({ hits, totalHits }) => {
      galleryRef.insertAdjacentHTML('beforeend', markup(hits));

      if (galleryRef.children.length >= totalHits) {
        loadMoreBtnRef.style.display = 'none';
        Notify.warning(END_RESULTS);
      } else {
        loadMoreBtnRef.style.display = 'block';
      }
      lightbox.refresh();
      slowScroll();
    })
    .catch(er => console.log(er.message));
}
