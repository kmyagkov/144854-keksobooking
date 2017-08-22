'use strict';

var SIMILAR_ADS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSING_TYPES = ['flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 75;
var IMAGE_WIDTH = 40;
var IMAGE_HEIGHT = 40;

var similarAds = [];

var getRandomInt = function (min, max) {
  var random;
  random = Math.floor(min + Math.random() * (max + 1 - min));
  return random;
};

var getSimilarAds = function (titles, types, times, features, adsCount) {
  var array = [];
  var typesLength = types.length;
  var timesLength = times.length;
  var featuresLength = features.length;
  for (var i = 0; i < adsCount; i++) {
    var locationX = getRandomInt(300, 900);
    var locationY = getRandomInt(100, 500);
    array.push({
      'author': {
        'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      'offer': {
        'title': titles[i],
        'adress': locationX + ', ' + locationY,
        'price': getRandomInt(1000, 1000000),
        'type': types[getRandomInt(0, typesLength - 1)],
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(0, 100),
        'checkin': times[getRandomInt(0, timesLength - 1)],
        'checkout': times[getRandomInt(0, timesLength - 1)],
        'features': features.slice(0, getRandomInt(1, featuresLength - 1)),
        'description': '',
        'photos': []

      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return array;
};

similarAds = getSimilarAds(SIMILAR_ADS_TITLES, HOUSING_TYPES, CHECK_TIMES, FEATURES_ITEMS, SIMILAR_ADS_TITLES.length);

var createPin = function (similarItem, pinWidth, pinHeight, imageWidth, imageHeight) {
  var pin = document.createElement('div');
  pin.classList.add('pin');
  pin.style.left = similarItem.location.x - pinWidth / 2 + 'px';
  pin.style.top = similarItem.location.y - pinHeight + 'px';
  var image = document.createElement('img');
  image.className = 'rounded';
  image.src = similarItem.author.avatar;
  image.alt = 'Pin';
  image.width = imageWidth;
  image.height = imageHeight;
  pin.appendChild(image);
  return pin;
};

var renderPins = function (array) {
  var pinContainer = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPin(array[i], PIN_WIDTH, PIN_HEIGHT, IMAGE_WIDTH, IMAGE_HEIGHT));
  }
  pinContainer.appendChild(fragment);
};

renderPins(similarAds);

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

var createOffer = function (array, index) {
  var dialog = document.querySelector('.dialog');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  var template = document.querySelector('#lodge-template').content;
  var adTitle = template.querySelector('.lodge__title');
  var adAdress = template.querySelector('.lodge__address');
  var adPrice = template.querySelector('.lodge__price');
  var adType = template.querySelector('.lodge__type');
  var adRoomGuest = template.querySelector('.lodge__rooms-and-guests');
  var adCheck = template.querySelector('.lodge__checkin-time');
  var adFeatures = template.querySelector('.lodge__features');
  var adDescription = template.querySelector('.lodge__description');
  var adAvatar = document.querySelector('.dialog__title > img');

  adTitle.textContent = array[index].offer.title;
  adAdress.textContent = array[index].offer.adress;
  adPrice.innerHTML = array[index].offer.price + ' &#x20bd;/ночь';
  if (array[index].offer.type === 'house') {
    adType.textContent = 'Дом';
  } else if (array[index].offer.type === 'flat') {
    adType.textContent = 'Квартира';
  } else {
    adType.textContent = 'Бунгало';
  }
  adRoomGuest.innerHTML = 'Для ' + array[index].offer.guests + ' гостей в ' + array[index].offer.rooms + ' комнатах';
  adCheck.innerHTML = 'Заезд после ' + array[index].offer.checkin + ', выезд до ' + array[index].offer.checkout;
  adFeatures.appendChild(renderFeatures(array[index].offer.features));
  adDescription.innerHTML = array[index].offer.description;
  adAvatar.setAttribute('src', array[index].author.avatar);

  dialog.replaceChild(template, dialogPanel);
};

createOffer(similarAds, 1);
