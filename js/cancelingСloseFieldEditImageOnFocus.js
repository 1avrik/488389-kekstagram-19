'use strict';

(function () {

  var inputFieldHashtag = document.querySelector('.text__hashtags'); // записываю в переменную поле ввода хештега
  var inputFieldComment = document.querySelector('.text__description'); // записываю в переменную поле ввода комментаря
  var onPopupEscPress = window.fieldEditImage.onPopupEscPress;

  inputFieldHashtag.onfocus = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  }; // убираем обработчик, закрывающий окно по Esc

  inputFieldHashtag.onblur = function () {
    document.addEventListener('keydown', onPopupEscPress);
  }; // добавляет обработчик, закрывающий окно по Esc

  inputFieldComment.onfocus = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  }; // убираем обработчик, закрывающий окно по Esc

  inputFieldComment.onblur = function () {
    document.addEventListener('keydown', onPopupEscPress);
  }; // добавляет обработчик, закрывающий окно по Esc

})();
