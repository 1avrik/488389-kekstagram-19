'use strict';

(function () {

  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');
  var commentsLoader = document.querySelector('.comments-loader');
  var renderComments = window.commentsBigPicture.render;

  var renderImages = function (index, pictures) {

    var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
    var likes = bigPicture.querySelector('.likes-count');
    var description = bigPicture.querySelector('.social__caption');

    bigPictureImg.src = pictures[index].url;
    likes.textContent = pictures[index].likes;
    description.textContent = pictures[index].description;

  };

  var onCloseBigPicture = function () {

    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', window.commentsBigPicture.onUploading);

  };

  var getIndexPicturesArr = function (evt) {
    var index = evt.replace('.jpg', '');
    index = index.match(/\d+$/);
    index--;
    return index;
  };

  var onOpenBigPicture = function (index, pictures) {

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    renderImages(index, pictures);
    var commentsArr = pictures[index].comments;
    renderComments(commentsArr);
    bigPictureCansel.addEventListener('click', onCloseBigPicture);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        onCloseBigPicture();
      }
    });

  };

  window.viewBigPicture = function (pictures) {

    var renderedPictures = document.querySelectorAll('.picture');
    for (var i = 0; i < renderedPictures.length; i++) {
      renderedPictures[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        onOpenBigPicture(getIndexPicturesArr(evt.target.src), pictures);
      });

      renderedPictures[i].addEventListener('keydown', function (evt) {
        if (evt.key === ENTER_KEY) {
          evt.preventDefault();
          onOpenBigPicture(getIndexPicturesArr(evt.target.children[0].src), pictures);
        }
      });
    }

  };

})();
