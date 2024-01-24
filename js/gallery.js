import { galleryItems } from './gallery-items.js';
const list = document.querySelector('.gallery');
let instance;
list.insertAdjacentHTML('beforeend', createGalleryItems());
function createGalleryItems() {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
                <a class="gallery__link" href="${original}">
                  <img class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}">
                </a>
              </li>`;
    })
    .join('');
}
list.addEventListener('click', onClick);
function onClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const imageURL = e.target.dataset.source;

  if (!instance) {
    instance = basicLightbox.create(`<img src="${imageURL}" width="800" height="600">`, {
      onShow: () => {
        document.addEventListener('keydown', keyEsc);
      },
      onClose: () => {
        document.removeEventListener('keydown', keyEsc);
      },
    });
  } else {
    instance.element().querySelector('img').src = imageURL;
  }

  instance.show();
}
function keyEsc(event) {
  if (event.code === 'Escape') {
    instance.close();
  }
}

console.log(galleryItems);
