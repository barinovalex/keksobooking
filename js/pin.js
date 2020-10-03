'use strict';

(function () {
  var renderPin = function (card, i) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.left = (card.location.x) + 'px';
    mapPin.style.top = (card.location.y) + 'px';
    var mapPinImg = mapPin.querySelector('img');
    mapPinImg.setAttribute('src', card.author.avatar);
    mapPinImg.setAttribute('alt', card.offer.title);
    mapPin.setAttribute('data-index', i);
    return mapPin;
  };

  var renderPins = function (cards, length) {
    var fragment = document.createDocumentFragment();
    if ((!(length > 0) || (length > cards.length))) {
      length = cards.length;
    }
    for (var i = 0; i < length; i++) {
      fragment.appendChild(renderPin(cards[i], i));
    }

    document.querySelector('.map__pins').appendChild(fragment);

    var mapPinButtons = document.querySelectorAll('.map__pin[type="button"]');
    for (i = 0; i < mapPinButtons.length; i++) {
      mapPinButtons[i].addEventListener('click', function () {
        window.card.renderMapCard(cards[this.getAttribute('data-index')]);
      });
    }
  };

  var removePins = function () {
    var mapPins = document.querySelector('.map__pins');
    var MainMapPin = document.querySelector('.map__pin--main');
    while (mapPins.lastChild) {
      if (MainMapPin.isEqualNode(mapPins.lastChild)) {
        break;
      }
      mapPins.lastChild.remove();
    }
  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins,
    removePins: removePins
  };
})();
