'use strict';

var HOUSING_TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 75;
var IMAGE_WIDTH = 40;
var IMAGE_HEIGHT = 40;
var similarAdsTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var getRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomObjProp = function (obj) {
  var arr = Object.keys(obj);
  return arr[getRandomInt(0, arr.length - 1)];
};

var getSimilarAds = function (titles, types, times, features, adsCount) {
  var array = [];
  var timesLength = times.length;
  var featuresLength = features.length;
  for (var i = 0; i < adsCount; i++) {
    var locationX = getRandomInt(300, 900);
    var locationY = getRandomInt(200, 600);
    array.push({
      'author': {
        'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      'offer': {
        'title': titles[i],
        'adress': locationX + ', ' + locationY,
        'price': getRandomInt(1000, 1000000),
        'type': getRandomObjProp(types),
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

var similarAds = getSimilarAds(similarAdsTitles, HOUSING_TYPES, CHECK_TIMES, FEATURES_ITEMS, similarAdsTitles.length);

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

var pinContainer = document.querySelector('.tokyo__pin-map');
var renderPins = function (array, element) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPin(array[i], PIN_WIDTH, PIN_HEIGHT, IMAGE_WIDTH, IMAGE_HEIGHT));
  }
  element.appendChild(fragment);
};

renderPins(similarAds, pinContainer);

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

var createOffer = function (arrayElement) {
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

  adTitle.textContent = arrayElement.offer.title;
  adAdress.textContent = arrayElement.offer.adress;
  adPrice.textContent = arrayElement.offer.price + ' \u20BD' + ' /ночь';
  adType.textContent = HOUSING_TYPES[arrayElement.offer.type];
  adRoomGuest.textContent = 'Для ' + arrayElement.offer.guests + ' гостей в ' + arrayElement.offer.rooms + ' комнатах';
  adCheck.textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;
  adFeatures.appendChild(renderFeatures(arrayElement.offer.features));
  adDescription.textContent = arrayElement.offer.description;
  adAvatar.setAttribute('src', arrayElement.author.avatar);

  dialog.replaceChild(template, dialogPanel);
};

createOffer(similarAds[0]);
