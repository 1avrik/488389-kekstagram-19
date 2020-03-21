'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var MIN_IMAGE_SIZE = 25;
  var MAX_IMAGE_SIZE = 100;
  var STEP_IMAGE_SIZE = 25;
  var body = document.querySelector('body');
  var formImageEditing = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var buttonUploadCancel = document.querySelector('.img-upload__cancel'); // кнопка, закрывающая форму редактирования изображения
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img'); // превью загружаемого изображения
  var uploadFile = document.querySelector('#upload-file'); // кнопка загрузки изображения
  var effectLevelSlider = document.querySelector('.img-upload__effect-level'); // весь слайдер с эффектами
  var buttonImageSmaller = document.querySelector('.scale__control--smaller'); // кнопка уменьшения изображения
  var buttonImageBigger = document.querySelector('.scale__control--bigger'); // кнопка увеличения изображения
  var imageSizeValue = document.querySelector('.scale__control--value'); // поле, хранящее тукущий размер изображения
  var imageSize; // размер изображения по умолчанию;

  var onReducePicture = function () {

    if (imageSize > MIN_IMAGE_SIZE) {
      imageSize -= STEP_IMAGE_SIZE;
      imgPreview.style.transform = 'scale(0.' + imageSize + ')';
      imageSizeValue.value = imageSize + '%';
    }

  };

  var onIncreasePicture = function () {

    if (imageSize < MAX_IMAGE_SIZE) {
      imageSize += STEP_IMAGE_SIZE;
      if (imageSize === MAX_IMAGE_SIZE) {
        imgPreview.style.transform = 'scale(1)';
      } else {
        imgPreview.style.transform = 'scale(0.' + imageSize + ')';
      }
      imageSizeValue.value = imageSize + '%';
    }

  };

  var onCloseFormImageEditing = function () {
    body.classList.remove('modal-open');
    formImageEditing.classList.add('hidden');
    buttonUploadCancel.removeEventListener('click', onCloseFormImageEditing);
    document.removeEventListener('keydown', onPopupEscPress);
    buttonImageSmaller.removeEventListener('click', onReducePicture);
    buttonImageBigger.removeEventListener('click', onIncreasePicture);
    imgPreview.style = '';
    imgPreview.className = '';
    uploadFile.value = '';
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      onCloseFormImageEditing();
    }
  };

  var onOpenFormImageEditing = function () {
    body.classList.add('modal-open');
    formImageEditing.classList.remove('hidden');
    imageSize = MAX_IMAGE_SIZE;
    imageSizeValue.value = imageSize + '%';
    buttonImageSmaller.addEventListener('click', onReducePicture);
    buttonImageBigger.addEventListener('click', onIncreasePicture);
    buttonUploadCancel.addEventListener('click', onCloseFormImageEditing);
    document.addEventListener('keydown', onPopupEscPress);
    effectLevelSlider.classList.add('hidden');
  };

  uploadFile.addEventListener('change', onOpenFormImageEditing);

  window.fieldEditImage = {
    onPopupEscPress: onPopupEscPress,
  };

})();


