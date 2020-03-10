'use strict';

(function () {

  var buttonImageSmaller = document.querySelector('.scale__control--smaller'); // кнопка уменьшения изображения
  var buttonImageBigger = document.querySelector('.scale__control--bigger'); // кнопка увеличения изображения
  var imageSizeValue = document.querySelector('.scale__control--value'); // поле, хранящее тукущий размер изображения
  var imgPreview = document.querySelector('.img-upload__preview').querySelector('img'); // превью загружаемого изображения
  var imageSize = window.fieldEditImage.imageSize;

  buttonImageSmaller.addEventListener('click', function () {
    if (imageSize > 25) {
      imageSize -= 25;
      imgPreview.style.transform = 'scale(0.' + imageSize + ')';
      imageSizeValue.value = imageSize + '%';
    }
  });

  buttonImageBigger.addEventListener('click', function () {
    if (imageSize < 100) {
      imageSize += 25;
      if (imageSize === 100) {
        imgPreview.style.transform = 'scale(1)';
      } else {
        imgPreview.style.transform = 'scale(0.' + imageSize + ')';
      }
      imageSizeValue.value = imageSize + '%';
    }
  });

})();
