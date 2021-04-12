import images from "./gallery-items.js";


const makeGalleryItemMarkup = ({preview, original, description}) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `};

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
const lightboxImgEl = document.querySelector('.lightbox__image');
const overlayEl = document.querySelector('div.lightbox__overlay');

const makeGalleryItemsMarkup = images.map(makeGalleryItemMarkup).join("");
galleryEl.insertAdjacentHTML('afterbegin', makeGalleryItemsMarkup);

galleryEl.addEventListener('click', onGalleryElClick);
closeBtnEl.addEventListener('click', onCloseBtnClick);
overlayEl.addEventListener('click', onOverlayClick);


function onGalleryElClick(e) {
  const isGalleryImg = e.target.classList.contains('gallery__image');
  if (!isGalleryImg) {
    return;
  }

  e.preventDefault();
  modalEl.classList.add('is-open');
  lightboxImgEl.src = e.target.dataset.source;
  window.addEventListener('keydown', onEscKeyPress);
  
}
  
function onCloseBtnClick(e) {
  modalEl.classList.remove('is-open');
  lightboxImgEl.src = '';
  window.removeEventListener('keydown', onEscKeyPress);
}

function onOverlayClick(e) {
    if (e.target === e.currentTarget) {
        onCloseBtnClick();
    }
}

function onEscKeyPress(e) {
    const ESC_KEY_CODE = `Escape`;

    if (e.code === ESC_KEY_CODE) {
        onCloseBtnClick();
    }
    
}