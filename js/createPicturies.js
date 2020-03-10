'use strict';

(function () {
  var photos = []; // массив фото

  var createPicturies = function () {
    for (var i = 1; i < 26; i++) {
      photos[i] = {
        url: 'photos/' + i + '.jpg',
        description: '',
        likes: window.getRandomNumber(15, 200),
        comments: window.getRandomCommets,
      };
    }
    return photos;
  };

  createPicturies();

  window.createPicturies = {
    photos: photos,
  };

})();
