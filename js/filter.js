'use strict';

(function () {
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuests = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features').querySelectorAll('input[name="features"]');
  var lowPrice = 10000;
  var highPrice = 50000;

  var getFilterSelectFlag = function (selectValue, cardValue, flag) {
    if ((selectValue === 'any') && (flag)) {
      return (true);
    } else if ((selectValue == cardValue) && (flag)) {
      return (true);
    }

    return (false);
  };

  var onChangeType = function () {
    var cards = window.map.loadCards().slice();
    var filteredCards = [];

    filteredCards = cards.filter(function (card) {
      if (!getFilterSelectFlag(filterType.value, card.offer.type, true)) {
        return false;
      }
      if (!getFilterSelectFlag(filterRooms.value, card.offer.rooms, true)) {
        return false;
      }
      if (!getFilterSelectFlag(filterGuests.value, card.offer.guests, true)) {
        return false;
      }

      switch (filterPrice.value) {
        case 'middle':
          if ((card.offer.price < lowPrice) || (card.offer.price > highPrice)) {
            return false;
          }
          break;
        case 'low':
          if (card.offer.price >= lowPrice) {
            return false;
          }
          break;
        case 'high':
          if (card.offer.price <= highPrice) {
            return false;
          }
          break;
      }

      var filterFeaturesChecked = document.querySelector('#housing-features').querySelectorAll('input[name="features"]:checked');

      for (var i = 0; i < filterFeaturesChecked.length; i++) {
        if (!card.offer.features.some(function (value) {
          return value == filterFeaturesChecked[i].value;
        })) {
          return false;
        }
      }

      return true;
    });
    window.pin.removePins();
    window.card.removeMapCard();
    window.pin.renderPins(filteredCards, 5);
  };

  filterType.addEventListener('change', onChangeType);
  filterRooms.addEventListener('change', onChangeType);
  filterGuests.addEventListener('change', onChangeType);
  filterPrice.addEventListener('change', onChangeType);
  filterFeatures.forEach(function (item) {
    item.addEventListener('change', onChangeType);
  });
})();
