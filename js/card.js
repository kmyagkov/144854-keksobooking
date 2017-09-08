'use strict';

(function () {

  var HOUSING_TYPES = {
    'bungalo': {
      'title': 'Лачуга',
      'minPrice': 0
    },
    'flat': {
      'title': 'Квартира',
      'minPrice': 1000
    },
    'house': {
      'title': 'Дом',
      'minPrice': 5000
    },
    'palace': {
      'title': 'Дворец',
      'minPrice': 10000
    }
  };
  var renderFeatures = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var container = document.createElement('span');
      container.className = 'feature__image';
      container.classList.add('feature__image--' + array[i]);
      fragment.appendChild(container);
    }
    return fragment;
  };

  var dialog = document.querySelector('.dialog');

  window.card = {
    createOffer: function (arrayElement) {
      var dialogPanel = dialog.querySelector('.dialog__panel');
      var template = document.querySelector('#lodge-template').content;
      var offerItem = template.cloneNode(true);
      var adTitle = offerItem.querySelector('.lodge__title');
      var adAdress = offerItem.querySelector('.lodge__address');
      var adPrice = offerItem.querySelector('.lodge__price');
      var adType = offerItem.querySelector('.lodge__type');
      var adRoomGuest = offerItem.querySelector('.lodge__rooms-and-guests');
      var adCheck = offerItem.querySelector('.lodge__checkin-time');
      var adFeatures = offerItem.querySelector('.lodge__features');
      var adDescription = offerItem.querySelector('.lodge__description');
      var adAvatar = document.querySelector('.dialog__title > img');

      adTitle.textContent = arrayElement.offer.title;
      adAdress.textContent = arrayElement.offer.adress;
      adPrice.textContent = arrayElement.offer.price + ' \u20BD' + ' /ночь';
      adType.textContent = HOUSING_TYPES[arrayElement.offer.type].title;
      adRoomGuest.textContent = 'Для ' + arrayElement.offer.guests + ' гостей в ' + arrayElement.offer.rooms + ' комнатах';
      adCheck.textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;
      adFeatures.appendChild(renderFeatures(arrayElement.offer.features));
      adDescription.textContent = arrayElement.offer.description;
      adAvatar.setAttribute('src', arrayElement.author.avatar);

      dialog.replaceChild(offerItem, dialogPanel);
    }
  };

})();
