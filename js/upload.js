'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.status);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var form = document.querySelector('.img-upload__form');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var fieldEditImage = document.querySelector('.img-upload__overlay');
  var ESC_KEY = 'Escape';

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (status) {
      if (status === 200) {
        fieldEditImage.classList.add('hidden');
        var elementSuc = success.cloneNode(true);
        main.appendChild(elementSuc);
        var successButton = document.querySelector('.success__button');
        var successMain = document.querySelector('.success');
        successButton.addEventListener('click', function () {
          successMain.remove();
        });
        document.addEventListener('keydown', function (keyEvt) {
          if (keyEvt.key === ESC_KEY) {
            successMain.remove();
          }
        });
        successMain.addEventListener('click', function () {
          successMain.remove();
        });
      } else {
        fieldEditImage.classList.add('hidden');
        var elementErr = error.cloneNode(true);
        main.appendChild(elementErr);
        var errorButton = document.querySelector('.error__button');
        var errorMain = document.querySelector('.error');
        errorButton.addEventListener('click', function () {
          errorMain.remove();
        });
        document.addEventListener('keydown', function (keyEvt) {
          if (keyEvt.key === ESC_KEY) {
            errorMain.remove();
          }
        });
        errorMain.addEventListener('click', function () {
          errorMain.remove();
        });
      }
    });
    evt.preventDefault();
  });

})();
