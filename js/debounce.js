// Файл debounce.js
'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 1000; // ms
  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
