'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';

  var isEscapeEvent = function (key, action) {
    if (key === ESCAPE_KEY) {
      action();
    }
  };

  var isEnterEvent = function (key, action) {
    if (key === ENTER_KEY) {
      action();
    }
  };

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  var getRandomArrElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomArr = function (arr) {
    shuffle(arr);
    return arr.slice(0, Math.floor(Math.random() * arr.length));
  };

  var showMessagePopup = function (domElement) {
    document.body.appendChild(domElement);
    var removePopup = function () {
      domElement.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    };
    var onDocumentClick = function () {
      removePopup();
    };
    var onDocumentKeydown = function (evt) {
      window.util.isEscapeEvent(evt.key, removePopup);
    };
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  window.util = {
    shuffle: shuffle,
    getRandomArrElement: getRandomArrElement,
    getRandomArr: getRandomArr,
    isEscapeEvent: isEscapeEvent,
    isEnterEvent: isEnterEvent,
    showMessagePopup: showMessagePopup
  }
})();
