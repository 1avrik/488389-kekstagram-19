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
  var elementImg = element.querySelector('.picture__img');
  var elementComments = element.querySelector('.picture__comments');
  var elementLikes = element.querySelector('.picture__likes');
  elementImg.src = photos[j].url;
  elementComments.textContent = photos[j].comments.length;
  elementLikes.textContent = photos[j].likes;
  fragment.appendChild(element);
}


pictures.appendChild(fragment);
