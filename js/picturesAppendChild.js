'use strict';

(function () {

  var pictures = document.querySelector('.pictures')
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content.querySelector('a');

  for (var j = 1; j < window.createPicturies.photos.length; j++) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = window.createPicturies.photos[j].url;
    element.querySelector('.picture__comments').textContent = window.createPicturies.photos[j].comments.length;
    element.querySelector('.picture__likes').textContent = window.createPicturies.photos[j].likes;
    fragment.appendChild(element);
  }

  pictures.appendChild(fragment);

})();
