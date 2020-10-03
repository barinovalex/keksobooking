'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var toggleFieldsets = function (isDisable) {
    var formFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = isDisable;
    }
  };

  toggleFieldsets(true);

  var setAddress = function (xCoordinate, yCoordinate) {
    document.querySelector('#address').value = xCoordinate + ', ' + yCoordinate;
  };
  var formRooms = document.querySelector('#room_number');
  var formGuests = document.querySelector('#capacity');

  var validateGuests = function () {
    if (formRooms.value == 100) {
      if (formGuests.value != 0) {
        formGuests.setCustomValidity('Для 100 комнат должно быть значение "без гостей"');
      } else {
        formGuests.setCustomValidity('');
      }
    } else if (formGuests.value == 0) {
      formGuests.setCustomValidity('Значение "не для гостей" только для 100 комнат');
    } else if (formRooms.value < formGuests.value) {
      formGuests.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else {
      formGuests.setCustomValidity('');
    }
  };

  validateGuests();

  formRooms.addEventListener('change', function () {
    validateGuests();
  });

  formGuests.addEventListener('change', function () {
    validateGuests();
  });

  var formPrice = document.querySelector('#price');
  var formType = document.querySelector('#type');

  var validatePrice = function () {
    formPrice.min = window.data.typeMap[formType.value].minPrice;
    formPrice.placeholder = window.data.typeMap[formType.value].minPrice;
  };

  validatePrice();

  formType.addEventListener('change', function () {
    validatePrice();
  });

  var formTimein = document.querySelector('#timein');
  var formTimeout = document.querySelector('#timeout');

  formTimein.addEventListener('change', function () {
    formTimeout.value = formTimein.value;
  });

  formTimeout.addEventListener('change', function () {
    formTimein.value = formTimeout.value;
  });

  form.querySelector('.ad-form__reset').addEventListener('click', function () {
    form.reset();
  });

  var onLoad = function (response) {
    form.reset();
    form.classList.add('ad-form--disabled');
    toggleFieldsets(true);
    window.map.resetMap();
    var successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    window.util.showMessagePopup(successPopup);
  };

  var onError = function (message) {
    var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    window.util.showMessagePopup(errorPopup);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onLoad, onError);
    evt.preventDefault();
  });

  window.form = {
    toggleFieldsets: toggleFieldsets,
    setAddress: setAddress
  };
})();

