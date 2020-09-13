var MAIN_PIN_WIDTH = 64;
var MAIN_PIN_HEIGHT = 86;

var avatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var titles = ['Помещение 1', 'Уютная квартира', 'Двухэтажный коттедж', 'Апартаменты в новом билдинге', 'Номер в отеле', 'Уютно и не дорого', 'Все включено', 'Помещение 3'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var MainMapPin = document.querySelector('.map__pin--main');


function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
}

var getRandomArrElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomArr = function (arr) {
  shuffle(arr);
  return arr.slice(0, Math.floor(Math.random() * arr.length));
};


var generateData = function (count) {
  var cards = [];
  shuffle(avatarNumbers);
  shuffle(titles);
  for (var i = 0; i < count; i++) {
    cards.push(
      {
        author: {
          avatar: 'img/avatars/user' + avatarNumbers[i] +'.png'
        },
        offer: {
          title: titles[i],
          address: "600, 350",
          price: Math.floor(Math.random() * 10000),
          type: getRandomArrElement(types),
          rooms: Math.floor(Math.random() * 5) + 1,
          guests: Math.floor(Math.random() * 10) + 1,
          checkin: getRandomArrElement(times),
          checkout: getRandomArrElement(times),
          features: getRandomArr(features),
          description: 'Строка с описанием. Здесь будет очень длинное и занудное описание',
          photos: getRandomArr(photos)
        },
        location: {
          x: Math.floor(Math.random() * 1000),
          y: Math.floor(Math.random() * 760) - 130
        },
      }
    );
  }
  return cards;
};

var renderPin = function(card, i) {
  var map_pin = mapPinTemplate.cloneNode(true);
  map_pin.style.left = (card.location.x + 25) + 'px';
  map_pin.style.top = (card.location.y + 70) + 'px';
  var map_pin_img = map_pin.querySelector('img');
  map_pin_img.setAttribute('src', card.author.avatar);
  map_pin_img.setAttribute('alt', card.offer.title);
  map_pin.setAttribute('data-index', i);
  return map_pin;
};

var onEscapeCardKeydown = function (evt) {
  if (evt.key = 'Escape') {
    var mapCardOld = document.querySelector('.map__card');
    if(mapCardOld) {
      mapCardOld.remove();
    }
    document.removeEventListener('keydown', onEscapeCardKeydown);
  }
}

var renderMapCard = function (card) {
  var mapCardOld = document.querySelector('.map__card');
  if(mapCardOld) {
    mapCardOld.remove();
  }
  var map_card = cardTemplate.cloneNode(true);

  map_card.querySelector('img').setAttribute('src', card.author.avatar);
  map_card.querySelector('.popup__title').textContent = card.offer.title;
  map_card.querySelector('.popup__text--address').textContent = card.offer.address;
  map_card.querySelector('.popup__text--price').innerHTML = card.offer.price + ' &#x20bd;<span>/ночь</span>';
  map_card.querySelector('.popup__type').textContent = card.offer.type;
  map_card.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  map_card.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  map_card.querySelector('.popup__description').textContent = card.offer.description;
  var mapCardFeatures = map_card.querySelector('.popup__features');
  while (mapCardFeatures.firstChild) {
    mapCardFeatures.firstChild.remove();
  }
  for (i = 0;i < card.offer.features.length; i++) {
    var li = document.createElement('li');
    li.className = "popup__feature popup__feature--" + card.offer.features[i];
    mapCardFeatures.appendChild(li);
  }
  var mapCardPhotos = map_card.querySelector('.popup__photos');
  while (mapCardPhotos.firstChild) {
    mapCardPhotos.firstChild.remove();
  }
  for (i = 0;i < card.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.className = "popup__photo";
    img.width = 45;
    img.height = 40;
    img.src = card.offer.photos[i];
    img.alt = 'Фотография жилья';
    mapCardPhotos.appendChild(img);
  }

  document.querySelector('.map__filters-container').before(map_card);

  document.addEventListener('keydown', onEscapeCardKeydown);

  map_card.querySelector('.popup__close').addEventListener('click', function () {
    map_card.remove();
    document.removeEventListener('keydown', onEscapeCardKeydown);
  })
};

var formFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');

for (var i = 0;i < formFieldsets.length; i++) {
  formFieldsets[i].disabled = true;
}

var cards = generateData(8);

var activeMapAndForm = function () {
  var fragment = document.createDocumentFragment();

  for (i = 0;i < cards.length;i++) {
    fragment.appendChild(renderPin(cards[i], i));
  }

  document.querySelector('.map__pins').appendChild(fragment);
  document.querySelector('.map').classList.remove('map--faded');

  for (var i = 0;i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = false;
  }

  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  var mapPinButtons = document.querySelectorAll('.map__pin[type="button"]');
  for (i = 0;i < mapPinButtons.length; i++) {
    mapPinButtons[i].addEventListener('click', function (evt) {
      renderMapCard(cards[this.getAttribute('data-index')]);
    })
  }
};

var setAddress = function () {
  var xCoordinate = MainMapPin.offsetLeft + (MAIN_PIN_WIDTH/2);
  var yCoordinate = MainMapPin.offsetTop + MAIN_PIN_HEIGHT;
  document.querySelector('#address').value = xCoordinate + ', ' + yCoordinate;
};

var onMapPinMousedown = function (evt) {
  if (evt.which === 1) {
    activeMapAndForm();
    setAddress();
    MainMapPin.removeEventListener('mousedown',onMapPinMousedown);
    MainMapPin.removeEventListener('mousedown',onMapPinKeydown);
  }
};

var onMapPinKeydown = function (evt) {
  if (evt.key === 'Enter') {
    activeMapAndForm();
    setAddress();
    MainMapPin.removeEventListener('mousedown',onMapPinKeydown);
    MainMapPin.removeEventListener('mousedown',onMapPinMousedown);
  }
};

MainMapPin.addEventListener('mousedown',onMapPinMousedown);
MainMapPin.addEventListener('keydown',onMapPinKeydown);

var formRooms = document.querySelector('#room_number');
var formGuests = document.querySelector('#capacity');

var validateGuests = function () {
  if (formRooms.value == 100) {
    if (formGuests.value != 0) {
      formGuests.setCustomValidity('Для 100 комнат должно быть значение "без гостей"');
    }
    else {
      formGuests.setCustomValidity('');
    }
  }
  else if (formGuests.value == 0) {
    formGuests.setCustomValidity('Значение "не для гостей" только для 100 комнат');
  }
  else if (formRooms.value < formGuests.value) {
    formGuests.setCustomValidity('Количество гостей не должно превышать количество комнат');
  }
  else {
    formGuests.setCustomValidity('');
  }
};

formRooms.addEventListener('change', function () {
  validateGuests();
});

formGuests.addEventListener('change', function () {
  validateGuests();
});




