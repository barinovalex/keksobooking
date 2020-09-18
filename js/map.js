'use strict';

(function () {
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 86;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 704;
  var MainMapPin = document.querySelector('.map__pin--main');
  var cards = window.data.generateData(8);
  var isMapActive = false;

  var activeMapAndForm = function () {

    isMapActive = true;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(window.pin.renderPin(cards[i], i));
    }

    document.querySelector('.map__pins').appendChild(fragment);
    document.querySelector('.map').classList.remove('map--faded');

    window.form.setAddress(MainMapPin.offsetLeft + (MAIN_PIN_WIDTH / 2), MainMapPin.offsetTop + MAIN_PIN_HEIGHT);
    window.form.toggleFieldsets(false);

    MainMapPin.removeEventListener('keydown', onMapPinMousedown);

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
      if (!isMapActive) {
        activeMapAndForm();
      }

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords.x = moveEvt.clientX;
        startCoords.y = moveEvt.clientY;
        var currentX = (MainMapPin.offsetLeft - shift.x);
        var currentY = (MainMapPin.offsetTop - shift.y);
        if (currentX < 0) {
          currentX = 0;
        } else if (currentX > (MAP_WIDTH - MAIN_PIN_WIDTH)) {
          currentX = MAP_WIDTH - MAIN_PIN_WIDTH;
        }

        if (currentY < 0) {
          currentY = 0;
        } else if (currentY > (MAP_HEIGHT - MAIN_PIN_HEIGHT)) {
          currentY = MAP_HEIGHT - MAIN_PIN_HEIGHT;
        }
        MainMapPin.style.left = currentX + 'px';
        MainMapPin.style.top = currentY + 'px';
        window.form.setAddress(currentX + (MAIN_PIN_WIDTH / 2), currentY + MAIN_PIN_HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onMapPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      if (!isMapActive) {
        activeMapAndForm();
      }
    }
  };

  MainMapPin.addEventListener('mousedown', onMapPinMousedown);
  MainMapPin.addEventListener('keydown', onMapPinKeydown);
})();
