'use strict';

(function () {
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 86;
  var MainMapPin = document.querySelector('.map__pin--main');
  var cards = window.data.generateData(8);

  var activeMapAndForm = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(window.pin.renderPin(cards[i], i));
    }

    document.querySelector('.map__pins').appendChild(fragment);
    document.querySelector('.map').classList.remove('map--faded');

    window.form.toggleFieldsets(false);

    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    var mapPinButtons = document.querySelectorAll('.map__pin[type="button"]');
    for (i = 0; i < mapPinButtons.length; i++) {
      mapPinButtons[i].addEventListener('click', function (evt) {
        window.card.renderMapCard(cards[this.getAttribute('data-index')]);
      });
    }
  };

  var onMapPinMousedown = function (evt) {
    if (evt.which === 1) {
      activeMapAndForm();
      window.form.setAddress(MainMapPin.offsetLeft + (MAIN_PIN_WIDTH / 2), MainMapPin.offsetTop + MAIN_PIN_HEIGHT);
      MainMapPin.removeEventListener('mousedown', onMapPinMousedown);
      MainMapPin.removeEventListener('keydown', onMapPinKeydown);
    }
  };

  var onMapPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      activeMapAndForm();
      window.form.setAddress(MainMapPin.offsetLeft + (MAIN_PIN_WIDTH / 2), MainMapPin.offsetTop + MAIN_PIN_HEIGHT);
      MainMapPin.removeEventListener('mousedown', onMapPinKeydown);
      MainMapPin.removeEventListener('keydown', onMapPinMousedown);
    }
  };

  MainMapPin.addEventListener('mousedown', onMapPinMousedown);
  MainMapPin.addEventListener('keydown', onMapPinKeydown);
})();
