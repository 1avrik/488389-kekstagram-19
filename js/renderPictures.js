'use strict';

(function () {

  window.renderPictures = function (pictures) {

    var picturesTag = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#picture').content.querySelector('a');

    for (var j = 0; j < pictures.length; j++) {
      var element = template.cloneNode(true);
      element.querySelector('.picture__img').src = pictures[j].url;
      element.querySelector('.picture__comments').textContent = pictures[j].comments.length;
      element.querySelector('.picture__likes').textContent = pictures[j].likes;
      fragment.appendChild(element);
    }

    picturesTag.appendChild(fragment);

  };

})();
