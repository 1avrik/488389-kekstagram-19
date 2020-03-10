'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var body = document.querySelector('body');
  var formImageEditing = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
  var buttonUploadCancel = document.querySelector('.img-upload__cancel'); // кнопка, закрывающая форму редактирования изображения
  var imageSizeValue = document.querySelector('.scale__control--value'); // поле, хранящее тукущий размер изображения
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img'); // превью загружаемого изображения
  var uploadFile = document.querySelector('#upload-file'); // кнопка загрузки изображения
  var imageSize = 100; // размер изображения по умолчанию

  var onCloseFormImageEditing = function () {
    body.classList.remove('modal-open');
    formImageEditing.classList.add('hidden');
    buttonUploadCancel.removeEventListener('click', onCloseFormImageEditing);
    document.removeEventListener('keydown', onPopupEscPress);
    imgPreview.style = ''; // сброс стилей
    imgPreview.className = ''; // сброс классов
    uploadFile.value = ''; // сброс поля загрузки файла
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      onCloseFormImageEditing();
    }
  };

  var onOpenFormImageEditing = function () {
    body.classList.add('modal-open');
    formImageEditing.classList.remove('hidden');
    buttonUploadCancel.addEventListener('click', onCloseFormImageEditing);
    document.addEventListener('keydown', onPopupEscPress);
    imageSize = 100;
    imageSizeValue.value = imageSize + '%';
  };

  uploadFile.addEventListener('change', onOpenFormImageEditing);

  window.fieldEditImage = {
    imageSize: imageSize,
    onPopupEscPress: onPopupEscPress,
  };

})();


