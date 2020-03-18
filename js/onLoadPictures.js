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
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 7px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onSuccess, onError);
})();
