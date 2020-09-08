var avatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var titles = ['Помещение 1', 'Уютная квартира', 'Двухэтажный коттедж', 'Апартаменты в новом билдинге', 'Номер в отеле', 'Уютно и не дорого', 'Все включено', 'Помещение 3'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

var renderPin = function(card) {
  var map_pin = mapPinTemplate.cloneNode(true);
  map_pin.style.left = (card.location.x + 25) + 'px';
  map_pin.style.top = (card.location.y + 70) + 'px';
  var map_pin_img = map_pin.querySelector('img');
  map_pin_img.setAttribute('src', card.author.avatar);
  map_pin_img.setAttribute('alt', card.offer.title);

  return map_pin;
};

var fragment = document.createDocumentFragment();
var cards = generateData(8);

for (i = 0;i < cards.length;i++) {
  fragment.appendChild(renderPin(cards[i]));
}

document.querySelector('.map__pins').appendChild(fragment);
document.querySelector('.map').classList.remove('map--faded');

var map_card = cardTemplate.cloneNode(true);

map_card.querySelector('img').setAttribute('src', cards[0].author.avatar);
map_card.querySelector('.popup__title').textContent = cards[0].offer.title;
map_card.querySelector('.popup__text--address').textContent = cards[0].offer.address;
map_card.querySelector('.popup__text--price').innerHTML = cards[0].offer.price + ' &#x20bd;<span>/ночь</span>';
map_card.querySelector('.popup__type').textContent = cards[0].offer.type;
map_card.querySelector('.popup__text--capacity').textContent = cards[0].offer.rooms + ' комнаты для ' + cards[0].offer.guests + ' гостей';
map_card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cards[0].offer.checkin + ', выезд до ' + cards[0].offer.checkout;
map_card.querySelector('.popup__description').textContent = cards[0].offer.description;
var mapCardFeatures = map_card.querySelector('.popup__features');
while (mapCardFeatures.firstChild) {
  mapCardFeatures.firstChild.remove();
}
for (i = 0;i < cards[0].offer.features.length; i++) {
  var li = document.createElement('li');
  li.className = "popup__feature popup__feature--" + cards[0].offer.features[i];
  mapCardFeatures.appendChild(li);
}
var mapCardPhotos = map_card.querySelector('.popup__photos');
while (mapCardPhotos.firstChild) {
  mapCardPhotos.firstChild.remove();
}
for (i = 0;i < cards[0].offer.photos.length; i++) {
  var img = document.createElement('img');
  img.className = "popup__photo";
  img.width = 45;
  img.height = 40;
  img.src = cards[0].offer.photos[i];
  img.alt = 'Фотография жилья';
  mapCardPhotos.appendChild(img);
}

document.querySelector('.map__filters-container').before(map_card);
