'use strict';

(function () {

  var buttonsEffectPreview = document.querySelectorAll('.effects__radio'); // собираю все кнопки превью эффектов
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img'); // превью загружаемого изображения
  var filterName = ''; // переменная для записи значения фильтра
  var buttonChangingPhotoEffect = document.querySelector('.effect-level__pin'); // кнопка изменения глубины эффекта фотографии
  var effectLevelLine = document.querySelector('.effect-level__line'); // блок изменения глубины эффекта фотографии
  var effectLevel = document.querySelector('.effect-level__value'); // поле для записи уровня эффекта

  for (var i = 0; i < buttonsEffectPreview.length; i++) {
    buttonsEffectPreview[i].addEventListener('click', function (evt) {
      filterName = evt.target.value;
      imgPreview.className = '';
      imgPreview.classList.add('effects__preview--' + filterName);
      imgPreview.style = '';
    });
  }

  var onChangingDepthPhotoEffect = function () {
    effectLevel.value = Math.round(buttonChangingPhotoEffect.offsetLeft / effectLevelLine.offsetWidth * 100); // определение глубины эффекта
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
  buttonChangingPhotoEffect.addEventListener('mouseup', onChangingDepthPhotoEffect);

})();
