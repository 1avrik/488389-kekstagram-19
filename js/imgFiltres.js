'use strict';

(function () {

  var showRandomPictures = function (pictures) {
    var QUANTITY_PICTURES = 10;
    var picturesCopy = pictures.slice();
    var randomePictures = [];
    for (var i = 0; i < QUANTITY_PICTURES; i++) {
      var index = window.getRandomNumber(0, picturesCopy.length);
      randomePictures.push(picturesCopy[index]);
      picturesCopy.splice(index, 1);
    }
    return randomePictures;
  };

  var showDiscussedPictures = function (pictures) {
    var picturesCopy = pictures.slice();
    picturesCopy.sort(function (first, second) {
      if (first.comments.length > second.comments.length) {
        return -1;
      } else if (first.comments.length < second.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });
    return picturesCopy;
  };

  var deleteRenderedPictures = function () {
    var renderedPictures = document.querySelectorAll('.picture');
    for (var y = 0; y < renderedPictures.length; y++) {
      renderedPictures[y].remove();
    }
  };

  var doFilterButtonsNotActive = function () {
    var buttonsFilter = document.querySelectorAll('.img-filters__button');
    for (var j = 0; j < buttonsFilter.length; j++) {
      buttonsFilter[j].classList.remove('img-filters__button--active');
    }
  };

  window.imgFiltres = function (pictures) {

    var buttonsFilter = document.querySelectorAll('.img-filters__button');
    var debounce = window.debounce;
    var renderPictures = window.renderPictures;
    var viewBigPicture = window.viewBigPicture;

    for (var i = 0; i < buttonsFilter.length; i++) {
      buttonsFilter[i].addEventListener('click', function (evt) {
        doFilterButtonsNotActive();
        evt.target.classList.add('img-filters__button--active');
        if (evt.target.id === 'filter-random') {
          debounce(function () {
            deleteRenderedPictures();
            renderPictures(showRandomPictures(pictures));
            viewBigPicture(pictures);
          });
        } else if (evt.target.id === 'filter-discussed') {
          debounce(function () {
            deleteRenderedPictures();
            renderPictures(showDiscussedPictures(pictures));
            viewBigPicture(pictures);
          });
        } else {
          debounce(function () {
            deleteRenderedPictures();
            renderPictures(pictures);
            viewBigPicture(pictures);
          });
        }
      });
    }
  };

})();
