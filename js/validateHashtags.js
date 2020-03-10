'use strict';

(function () {

  var MAX_HASHTAGS = 5; // максимальное кол-во Х-Т
  var MIN_LENGTH_HASHTAG = 2;
  var MAX_LENGTH_HASHTAG = 20;
  var inputFieldHashtag = document.querySelector('.text__hashtags'); // записываю в переменную поле ввода хештега

  var checkValidCharacters = function (hashTag) {
    var regex = /^[0-9A-Za-zа-яА-ЯёЁ]*$/;
    var error = false;
    var noSharp = hashTag.substr(1);
    var matches = noSharp.match(regex);
    if (matches === null && hashTag !== '') {
      error = true;
    }
    return error;
  };

  var validateHashtags = function (value) {

    var errorMessage = '';

    value = value.toLowerCase();
    value = value.trim()
    console.log(value);
    var array = value.split(/\s+/);

    // проверка количества Ш-Т
    if (array.length > MAX_HASHTAGS) {
      errorMessage += 'Не больше 5 хэш-тегов.\n';
    }

    for (var i = 0; i < array.length; i++) {
      if (array[i].charAt(0) !== '#') {
        errorMessage += 'Хэш-тег не начинается с символа #.\n';
      }

      for (var j = i + 1; j < array.length; i++) {
        if (array[i] === array[j]) {
          errorMessage += 'Один и тот же хэш-тег не может быть использован дважды.\n';
        }
          break;
      }

      if (array[i].length < MIN_LENGTH_HASHTAG) {
        errorMessage += 'хеш-тег не может состоять только из одной решётки.\n';
      }

      if (array[i].length > MAX_LENGTH_HASHTAG) {
        errorMessage += 'максимальная длина одного хэш-тега 20 символов, включая решётку\n';
      }

      if (checkValidCharacters(array[i])) {
        errorMessage += 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.\n';
      };

    }

    if (errorMessage && inputFieldHashtag.value !== '') {
      inputFieldHashtag.setCustomValidity(errorMessage);
    } else {
      inputFieldHashtag.setCustomValidity('');
      inputFieldHashtag.style.border = '';
    }
  };
  // Шаг 2 навесить на него обработчик ошибки
  inputFieldHashtag.addEventListener('input', function () {
    // Шаг 3 проверять значение ввода в ф-ии
    validateHashtags(inputFieldHashtag.value);
  });

})();
