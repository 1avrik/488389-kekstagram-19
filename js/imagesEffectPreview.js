'use strict';

(function () {

  var buttonsEffectPreview = document.querySelectorAll('.effects__radio'); // собираю все кнопки превью эффектов
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img'); // превью загружаемого изображения
  var filterName = ''; // переменная для записи значения фильтра
  var buttonChangingPhotoEffect = document.querySelector('.effect-level__pin'); // кнопка изменения глубины эффекта фотографии
  var effectLevelLine = document.querySelector('.effect-level__line'); // блок изменения глубины эффекта фотографии
  var effectLevel = document.querySelector('.effect-level__value'); // поле для записи уровня эффекта
  var effectLevelDepth = document.querySelector('.effect-level__depth'); // поле отображения полноты эффекта

  for (var i = 0; i < buttonsEffectPreview.length; i++) {
    buttonsEffectPreview[i].addEventListener('click', function (evt) {
      filterName = evt.target.value;
      imgPreview.className = '';
      imgPreview.classList.add('effects__preview--' + filterName);
      imgPreview.style = '';
    });
  }

  var onChangingDepthPhotoEffect = function () {

    if (filterName === 'chrome') {
      imgPreview.style.filter = 'grayscale(0.' + effectLevel.value + ')';
    } else if (filterName === 'sepia') {
      imgPreview.style.filter = 'sepia(' + effectLevel.value + '%)';
    } else if (filterName === 'marvin') {
      imgPreview.style.filter = 'invert(' + effectLevel.value + '%)';
    } else if (filterName === 'phobos') {
      imgPreview.style.filter = 'blur(' + effectLevel.value + 'px)';
    } else if (filterName === 'heat') {
      imgPreview.style.filter = 'brightness(' + effectLevel.value + '%)';
    } else {
      imgPreview.style = '';
    }
  };

  buttonChangingPhotoEffect.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;

      startCoords = moveEvt.clientX;

      if (buttonChangingPhotoEffect.offsetLeft - shift < 0) {
        buttonChangingPhotoEffect.style.left = '0';
        effectLevelDepth.style.width = '0';
        effectLevel.value = 0;
      } else if (buttonChangingPhotoEffect.offsetLeft - shift > effectLevelLine.offsetWidth) {
        buttonChangingPhotoEffect.style.left = effectLevelLine.offsetWidth + 'px';
        effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
        effectLevel.value = 100;
      } else {
        buttonChangingPhotoEffect.style.left = (buttonChangingPhotoEffect.offsetLeft - shift) + 'px';
        effectLevelDepth.style.width = (buttonChangingPhotoEffect.offsetLeft - shift) + 'px';
        effectLevel.value = Math.round((buttonChangingPhotoEffect.offsetLeft - shift) / effectLevelLine.offsetWidth * 100);
      }
    };

    var onMouseUp = function (upEvt) {

      upEvt.preventDefault();

      onChangingDepthPhotoEffect();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
