'use strict';

(function () {

  var COMMENTS_LOADING_STEP = 5;
  var bigPicture = document.querySelector('.big-picture');
  var quantityComents = bigPicture.querySelector('.comments-count');
  var quantityLoadedComents = bigPicture.querySelector('.comments-count-loaded');
  var comments = bigPicture.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  var numberOfComments = 5;
  var commentsLoader = document.querySelector('.comments-loader');

  var uploadingComments = function (numberofcomments, commentsArr) {

    if (numberOfComments > commentsArr.length) {
      numberOfComments = commentsArr.length;
      commentsLoader.classList.add('hidden');
    }

    for (var j = 0; j < numberOfComments; j++) {
      var element = comments.querySelector('li').cloneNode(true);
      element.querySelector('img').src = commentsArr[j].avatar;
      element.querySelector('img').alt = commentsArr[j].name;
      element.querySelector('p').textContent = commentsArr[j].message;
      fragment.appendChild(element);
    }

    comments.innerHTML = '';
    comments.appendChild(fragment);
    quantityLoadedComents.textContent = numberOfComments;

  };

  var onUploading = function () {

    var commentsArr = window.commentsBigPicture.commentsArr;

    numberOfComments += COMMENTS_LOADING_STEP;
    if (numberOfComments < commentsArr.length) {
      uploadingComments(numberOfComments, commentsArr);
    } else {
      uploadingComments(commentsArr.length, commentsArr);
      commentsLoader.classList.add('hidden');
    }

  };

  var render = function (commentsArr) {

    window.commentsBigPicture = {
      commentsArr: commentsArr
    };
    numberOfComments = 5;
    quantityComents.textContent = commentsArr.length;
    commentsLoader.classList.remove('hidden');
    uploadingComments(numberOfComments, commentsArr);
    commentsLoader.addEventListener('click', onUploading);

  };

  window.commentsBigPicture = {
    render: render,
    onUploading: onUploading
  };

})();
