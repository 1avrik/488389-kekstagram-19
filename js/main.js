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

var onPopupEscPress = function(evt) {
  if (evt.key === ESC_KEY) {
    onCloseFormImageEditing();
  }
}

var onOpenFormImageEditing = function() {
  body.classList.add('modal-open');
  formImageEditing.classList.remove('hidden');
  buttonUploadCancel.addEventListener('click', onCloseFormImageEditing);
  document.addEventListener('keydown', onPopupEscPress);
}

var onCloseFormImageEditing = function () {
  body.classList.remove('modal-open');
  formImageEditing.classList.add('hidden');
  uploadFile.value = ""; // сброс поля загрузки файла
  buttonUploadCancel.removeEventListener('click', onCloseFormImageEditing);
  document.removeEventListener('keydown', onPopupEscPress);
}

uploadFile.addEventListener('change', onOpenFormImageEditing);


var onChangingDepthPhotoEffect = function() {
  var depthPhotoEffect = effectLevelLine.offsetWidth / buttonChangingPhotoEffect.offsetLeft * 100; //определение глубины эффекта
  // тут не очень понял, нужно ли дописывать какие то изменения или это нужно делать в будущих домашках?
}

buttonChangingPhotoEffect.addEventListener('mouseup', onChangingDepthPhotoEffec);

// Валидация хештэгов

var inputFieldHashtag = document.querySelector('.text__hashtags'); // записываю в переменную поле ввода хештега

var textHashtags = inputFieldHashtag.split(' '); // создаю массив с хештегами, разделенными пробелом

var validityFieldHashtag = inputFieldHashtag.validity;

if (textHashtags.length > 5) {
  validityFieldHashtag.valid = false;
  inputFieldHashtag.setCustomValidity('Максимальное количество хештегов - 5')
}

for (x = 0; x < textHashtags.length; i++) {
  // тут собираюсь проверять каждый отдельных хештег
}
