'use strict';
var photos = []; // массив фото

var messages = [ // тексты комментариев для массива с фото
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var names = [ // имена для комментаторов массива с фото
  'Артём',
  'Дима',
  'Яна',
  'Вася',
  'Петя',
  'Валерий',
  'Константин',
  'Григорий'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomCommets = function () {
  var comments = [];
  for (var y = 0; y < getRandomNumber(1, 8); y++) {
    comments[y] = {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: messages[getRandomNumber(1, messages.length)],
      name: names[getRandomNumber(1, names.length)]
    };
  }
  return comments;
};

var createElementsPhotos = function () {
  for (var i = 1; i < 26; i++) {
    photos[i] = {
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: getRandomNumber(15, 200),
      comments: getRandomCommets(),
    };
  }
  return photos;
};

createElementsPhotos();

var pictures = document.querySelector('.pictures');

var fragment = document.createDocumentFragment();

var template = document.querySelector('#picture').content.querySelector('a');

for (var j = 1; j < photos.length; j++) {
  var element = template.cloneNode(true);
  element.querySelector('.picture__img').src = photos[j].url;
  element.querySelector('.picture__comments').textContent = photos[j].comments.length;
  element.querySelector('.picture__likes').textContent = photos[j].likes;
  fragment.appendChild(element);
}

pictures.appendChild(fragment);

// module4-task2

var body = document.querySelector('body');
var uploadFile = document.querySelector('#upload-file'); // кнопка загрузки изображения
var formImageEditing = document.querySelector('.img-upload__overlay'); // форма редактирования изображения
var buttonUploadCancel = document.querySelector('.img-upload__cancel'); // кнопка, закрывающая форму редактирования изображения
var buttonChangingPhotoEffect = document.querySelector('.effect-level__pin'); // кнопка изменения глубины эффекта фотографии
var effectLevelLine = document.querySelector('.effect-level__line'); // блок изменения глубины эффекта фотографии
var ESC_KEY = 'Escape';
var effectLevel = document.querySelector('.effect-level__value'); // поле для записи уровня эффекта
var imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
var buttonsEffectPreview = document.querySelectorAll('.effects__radio'); // собираю все кнопки превью эффектов
var filterName = 'none'; // фильтр изображения по умолчанию
var buttonImageSmaller = document.querySelector('.scale__control--smaller'); // кнопка уменьшения изображения
var buttonImageBigger = document.querySelector('.scale__control--bigger'); // кнопка увеличения изображения
var imageSizeValue = document.querySelector('.scale__control--value'); // поле, хранящее тукущий размер изображения
var imageSize = 100; // размер изображения, по умолчанию 100
var inputFieldHashtag = document.querySelector('.text__hashtags'); // записываю в переменную поле ввода хештега
var MAX_HASHTAGS = 5; // максимальное кол-во Х-Т
var errorMessage = ''; // сообщение о ошибке валидации Х-Т
var errorMessageComment = ''; // сообщение о ошибке валидации комментария
var textComment = document.querySelector('.text__description'); // записываю в переменную поле ввода комментария

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

var onCloseFormImageEditing = function () {
  body.classList.remove('modal-open');
  formImageEditing.classList.add('hidden');
  uploadFile.value = ''; // сброс поля загрузки файла
  buttonUploadCancel.removeEventListener('click', onCloseFormImageEditing);
  document.removeEventListener('keydown', onPopupEscPress);
  imgPreview.style = '';
  imgPreview.className = '';
};

uploadFile.addEventListener('change', onOpenFormImageEditing);

// ФИЛЬТРЫ ИЗОБРАЖЕНИЯ

// нажатие кнопок с превью фильтра
for (var i = 0; i < buttonsEffectPreview.length; i++) {
  buttonsEffectPreview[i].addEventListener('click', function (evt) {
    filterName = evt.target.value;
    imgPreview.className = '';
    imgPreview.classList.add('effects__preview--' + filterName);
    imgPreview.style = '';
    return filterName;
  });
}

// отпускание ползунка уровня эффекта
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

// изменение размеров изображение

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

// ВАЛИДАЦИЯ Х-Т И КОММЕНТАРИЯ

inputFieldHashtag.onfocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

textComment.onfocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

inputFieldHashtag.onblur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

textComment.onblur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var validateHashtags = function (value) {

  value = value.toLowerCase();
  var array = value.split(/\s+/);

  // проверка количества Ш-Т
  if (array.length > MAX_HASHTAGS) {
    errorMessage += 'Не больше 5 хэш-тегов.\n';
  }

  var presenceHashSign = false; // переменная для проверки # в начале
  var presenceDuplicates = false; // переменная для проверки повторяющихъся ХТ
  var minLengthHash = false; // переменная для проверки мин. длинны
  var maxLengthHash = false; // переменная для проверки макс. длинны
  var presenceSpecialCharacters = false; // переменная для проверки наличия спецсимволов

  for (var p = 0; p < array.length; p++) {
    if (array[p] !== '' && array[p].charAt(0) !== '#') {
      presenceHashSign = true;
    } // проверка # в начале
    for (var y = p + 1; y < array.length; y++) {
      if (array[p] === array[y]) {
        presenceDuplicates = true;
      } // проверка повторяющихъся ХТ
    }
    if (array[p].length < 2) {
      minLengthHash = true;
    } // проверка мин. длинны
    if (array[p].length > 20) {
      maxLengthHash = true;
    } // проверка макс. длинны
    var noSharp = array[i].substr(1);
    if (/[\p{P}\p{M}\p{S}p{Z}p{C}]/u.test(noSharp)){
      presenceSpecialCharacters = true;
    } // корректно работает в Chrome, не работает в Firefox и Edge из-за отсутствия поддержки регулярных выражений в юникоде
  }
  if (presenceHashSign) {
    errorMessage += 'Хэш-тег начинается с символа # (решётка).\n';
  }
  if (presenceDuplicates) {
    errorMessage += 'Один и тот же хэш-тег не может быть использован дважды.\n';
  }
  if (minLengthHash) {
    errorMessage += 'Хеш-тег не может состоять только из одной решётки.\n';
  } else {
    errorMessage -= 'Хеш-тег не может состоять только из одной решётки.\n';
  }
  if (maxLengthHash) {
    errorMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку.\n';
  }
  if (presenceSpecialCharacters) {
    errorMessage += 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т.д.\n';
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

var validateComment = function (comment) {
  if (comment.length > 140) {
    errorMessageComment += 'длина комментария не может составлять больше 140 символов';
  }

  if (errorMessageComment && textComment.value !== '') {
    textComment.setCustomValidity(errorMessageComment);
  } else {
    textComment.setCustomValidity('');
    textComment.style.border = '';
  }
};

textComment.addEventListener('input', function () {
  validateComment(textComment.value);
});
