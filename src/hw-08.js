import images from "./gallery-items.js";


// const makeGalleryItemMarkup = ({preview, original, description}) => {
//     return `
//     <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${original}"
//   >
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </li>
//     `};

// const makeGalleryItemsMarkup = images.map(makeGalleryItemMarkup).join("");
// galleryEl.insertAdjacentHTML('afterbegin', makeGalleryItemsMarkup);

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const closeBtnEl = document.querySelector('[data-action="close-lightbox"]');
const lightboxImgEl = document.querySelector('.lightbox__image');
const overlayEl = document.querySelector('div.lightbox__overlay');

function createGalleryItemsMarkup(images) {
  return images.map(({preview, original, description}) => {
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
    `;
  })
    .join('')
}

const galleryMarkup = createGalleryItemsMarkup(images);
galleryEl.insertAdjacentHTML('afterbegin', galleryMarkup);


galleryEl.addEventListener('click', onGalleryElClick);
closeBtnEl.addEventListener('click', onCloseBtnClick);
overlayEl.addEventListener('click', onOverlayClick);

let currentIndex = 0;

function onGalleryElClick(e) {
  const isGalleryImg = e.target.classList.contains('gallery__image');
  if (!isGalleryImg) {
    return;
  }

  e.preventDefault();
  modalEl.classList.add('is-open');
  lightboxImgEl.src = e.target.dataset.source;
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress);
  const currentLi = e.target.closest('.gallery__item');
  const ulArray = Array.from(galleryEl.children);
  currentIndex = ulArray.indexOf(currentLi);
}

function onArrowKeyPress(e) {
  const RIGHT_KEY_CODE = "ArrowRight";
  const LEFT_KEY_CODE = "ArrowLeft";
  const isArrowKey = e.code === RIGHT_KEY_CODE || e.code === LEFT_KEY_CODE;
  if (!isArrowKey) {
    return;
  }

  if (e.code === RIGHT_KEY_CODE) {
    currentIndex += 1;
    if (currentIndex > images.length - 1) {
      currentIndex = 0;
    }
  } else if (e.code === LEFT_KEY_CODE) {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
  }
  setModalImg(currentIndex);
}

function setModalImg(index) {
  lightboxImgEl.src = images[index].original;
}

function onCloseBtnClick(e) {
  modalEl.classList.remove('is-open');
  lightboxImgEl.src = '';
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);
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