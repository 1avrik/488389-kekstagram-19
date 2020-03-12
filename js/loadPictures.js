'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send();
  };

  window.load(function (pictures) {
    var picturesTag = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#picture').content.querySelector('a');

    for (var j = 1; j < pictures.length; j++) {
      var element = template.cloneNode(true);
      element.querySelector('.picture__img').src = pictures[j].url;
      element.querySelector('.picture__comments').textContent = pictures[j].comments.length;
      element.querySelector('.picture__likes').textContent = pictures[j].likes;
      fragment.appendChild(element);
    }

    picturesTag.appendChild(fragment);
  });

})();
