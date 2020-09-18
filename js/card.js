(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var onEscapeCardKeydown = function (evt) {
    if (evt.key == 'Escape') {
      var mapCardOld = document.querySelector('.map__card');
      if (mapCardOld) {
        mapCardOld.remove();
      }
      document.removeEventListener('keydown', onEscapeCardKeydown);
    }
  };

  var renderMapCard = function (card) {
    var mapCardOld = document.querySelector('.map__card');
    if (mapCardOld) {
      mapCardOld.remove();
    }
    var mapCard = cardTemplate.cloneNode(true);

    mapCard.querySelector('img').setAttribute('src', card.author.avatar);
    mapCard.querySelector('.popup__title').textContent = card.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCard.querySelector('.popup__text--price').innerHTML = card.offer.price + ' &#x20bd;<span>/ночь</span>';
    mapCard.querySelector('.popup__type').textContent = card.offer.type;
    mapCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    mapCard.querySelector('.popup__description').textContent = card.offer.description;
    var mapCardFeatures = mapCard.querySelector('.popup__features');
    while (mapCardFeatures.firstChild) {
      mapCardFeatures.firstChild.remove();
    }
    for (i = 0; i < card.offer.features.length; i++) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + card.offer.features[i];
      mapCardFeatures.appendChild(li);
    }
    var mapCardPhotos = mapCard.querySelector('.popup__photos');
    while (mapCardPhotos.firstChild) {
      mapCardPhotos.firstChild.remove();
    }
    for (i = 0; i < card.offer.photos.length; i++) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.width = 45;
      img.height = 40;
      img.src = card.offer.photos[i];
      img.alt = 'Фотография жилья';
      mapCardPhotos.appendChild(img);
    }

    document.querySelector('.map__filters-container').before(mapCard);

    document.addEventListener('keydown', onEscapeCardKeydown);

    mapCard.querySelector('.popup__close').addEventListener('click', function () {
      mapCard.remove();
      document.removeEventListener('keydown', onEscapeCardKeydown);
    });
  };
  window.card = {
    renderMapCard: renderMapCard
  };
})();
