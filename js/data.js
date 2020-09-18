'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 704;
  var avatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var titles = ['Помещение 1', 'Уютная квартира', 'Двухэтажный коттедж', 'Апартаменты в новом билдинге', 'Номер в отеле', 'Уютно и не дорого', 'Все включено', 'Помещение 3'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var generateData = function (count) {
    var cards = [];
    window.util.shuffle(avatarNumbers);
    window.util.shuffle(titles);
    for (var i = 0; i < count; i++) {
      cards.push(
          {
            author: {
              avatar: 'img/avatars/user' + avatarNumbers[i] + '.png'
            },
            offer: {
              title: titles[i],
              address: '600, 350',
              price: Math.floor(Math.random() * 10000),
              type: window.util.getRandomArrElement(types),
              rooms: Math.floor(Math.random() * 5) + 1,
              guests: Math.floor(Math.random() * 10) + 1,
              checkin: window.util.getRandomArrElement(times),
              checkout: window.util.getRandomArrElement(times),
              features: window.util.getRandomArr(features),
              description: 'Строка с описанием. Здесь будет очень длинное и занудное описание',
              photos: window.util.getRandomArr(photos)
            },
            location: {
              x: Math.floor(Math.random() * (MAP_WIDTH - (PIN_WIDTH / 2))),
              y: Math.floor(Math.random() * (MAP_HEIGHT - 100 - PIN_HEIGHT)) + 100
            },
          }
      );
    }
    return cards;
  };
  window.data = {
    generateData: generateData
  };
})();
