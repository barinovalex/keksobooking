'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderPin = function (card, i) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.left = (card.location.x) + 'px';
    mapPin.style.top = (card.location.y) + 'px';
    var mapPinImg = mapPin.querySelector('img');
    mapPinImg.setAttribute('src', card.author.avatar);
    mapPinImg.setAttribute('alt', card.offer.title);
    mapPin.setAttribute('data-index', i);
    return mapPin;
  };
  window.pin = {
    renderPin: renderPin
  };
})();
