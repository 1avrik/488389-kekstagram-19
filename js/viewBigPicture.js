'use strict';

(function () {

  var renderImages = function (index, pictures) {

    var bigPicture = document.querySelector('.big-picture');
    var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
    var likes = bigPicture.querySelector('.likes-count');
    var quantityComents = bigPicture.querySelector('.comments-count');
    var description = bigPicture.querySelector('.social__caption');

    bigPictureImg.src = pictures[index].url;
    likes.textContent = pictures[index].likes;
    quantityComents.textContent = pictures[index].comments.length;
    description.textContent = pictures[index].description;

  };

  var renderComments = function (commentsArr) {

    var bigPicture = document.querySelector('.big-picture');
    var comments = bigPicture.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < commentsArr.length; j++) {
      var element = comments.querySelector('li').cloneNode(true);
      element.querySelector('img').src = commentsArr[j].avatar;
      element.querySelector('img').alt = commentsArr[j].name;
      element.querySelector('p').textContent = commentsArr[j].message;
      fragment.appendChild(element);
    }
    comments.innerHTML = '';
    comments.appendChild(fragment);

  };

  var onCloseBigPicture = function () {

    var bigPicture = document.querySelector('.big-picture');
    var body = document.querySelector('body');

    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  var getIndexPicturesArr = function (evt) {
    var index = evt.replace('.jpg', '');
    index = index.match(/\d+$/);
    index--;
    return index;
  };

  var onOpenBigPicture = function (index, pictures) {

    var body = document.querySelector('body');
    var bigPicture = document.querySelector('.big-picture');
    var comentsCount = bigPicture.querySelector('.social__comment-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    var bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
    var ESC_KEY = 'Escape';

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    renderImages(index, pictures);
    var commentsArr = pictures[index].comments;
    renderComments(commentsArr);
    comentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureCansel.addEventListener('click', onCloseBigPicture);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        onCloseBigPicture();
      }
    });

  };

  window.viewBigPicture = function (pictures) {

    var renderedPictures = document.querySelectorAll('.picture');
    var ENTER_KEY = 'Enter';

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
