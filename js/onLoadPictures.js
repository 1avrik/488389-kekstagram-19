'use strict';

(function () {

  var onSuccess = function (pictures) {
    var imageFiltres = document.querySelector('.img-filters');
    var renderPictures = window.renderPictures;
    var imgFiltres = window.imgFiltres;
    var viewBigPicture = window.viewBigPicture;

    renderPictures(pictures);
    imageFiltres.classList.remove('img-filters--inactive');
    imgFiltres(pictures);
    viewBigPicture(pictures);

  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onSuccess, onError);

})();
