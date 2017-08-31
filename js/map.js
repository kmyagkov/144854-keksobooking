'use strict';

var HOUSING_TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
  'palace': 'Дворец'
};
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 75;
var IMAGE_WIDTH = 40;
var IMAGE_HEIGHT = 40;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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

var createPin = function (similarItem, pinWidth, pinHeight, imageWidth, imageHeight, index) {
  var pin = document.createElement('div');
  pin.classList.add('pin');
  pin.setAttribute('data-id', index);
  pin.setAttribute('tabindex', index + 2);
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
    fragment.appendChild(createPin(array[i], PIN_WIDTH, PIN_HEIGHT, IMAGE_WIDTH, IMAGE_HEIGHT, i));
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

var dialog = document.querySelector('.dialog');
var createOffer = function (arrayElement) {
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
  adType.textContent = HOUSING_TYPES[arrayElement.offer.type];
  adRoomGuest.textContent = 'Для ' + arrayElement.offer.guests + ' гостей в ' + arrayElement.offer.rooms + ' комнатах';
  adCheck.textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;
  adFeatures.appendChild(renderFeatures(arrayElement.offer.features));
  adDescription.textContent = arrayElement.offer.description;
  adAvatar.setAttribute('src', arrayElement.author.avatar);

  dialog.replaceChild(offerItem, dialogPanel);
};

var clickedPin = null;
var dialogCloseBtn = dialog.querySelector('.dialog__close');

var pinContainerClickHandler = function (evt) {
  var target = evt.target;

  if (target.className === 'rounded') {
    activatePin(target.parentNode);
  } else if (target.className === 'pin') {
    activatePin(target);
  }
};

var activatePin = function (node) {
  var pinId = node.getAttribute('data-id');
  if (clickedPin) {
    clickedPin.classList.remove('pin--active');
  }
  clickedPin = node;
  clickedPin.classList.add('pin--active');

  dialog.classList.remove('hidden');
  dialogCloseBtn.focus();

  createOffer(similarAds[pinId]);
};

pinContainer.addEventListener('click', pinContainerClickHandler);

pinContainer.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pinContainerClickHandler(evt);
  }
});

var dialogClose = function () {
  dialog.classList.add('hidden');
  clickedPin.classList.remove('pin--active');
};

dialogCloseBtn.addEventListener('click', function () {
  dialogClose();
});

dialogCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    dialogClose();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    dialogClose();
  }
});

var adForm = document.querySelector('.notice__form');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var houseType = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var guestCount = adForm.querySelector('#capacity');
var roomsCount = adForm.querySelector('#room_number');

var changeTimeOut = function (evt) {
  timeOut.value = evt.target.value;
};

var changeMinPrice = function (evt) {
  if (evt.target.value === 'bungalo') {
    price.setAttribute('min', '0');
    price.value = 0;
  } else if (evt.target.value === 'flat') {
    price.setAttribute('min', '1000');
    price.value = 1000;
  } else if (evt.target.value === 'house') {
    price.setAttribute('min', '5000');
    price.value = 5000;
  } else {
    price.setAttribute('min', '10000');
    price.value = 10000;
  }
};

var changeGuestCount = function (evt) {
  for (var i = 0; i < guestCount.options.length; i++) {
    guestCount.options[i].disabled = false;
  }
  if (evt.target.value === '1') {
    guestCount.value = '1';
    for (i = 0; i < guestCount.options.length; i++) {
      if (i === 2) {
        continue;
      }
      guestCount.options[i].disabled = true;
    }
  } else if (evt.target.value === '2') {
    guestCount.value = '2';
    for (i = 0; i < guestCount.options.length; i++) {
      if (i === 1 || i === 2) {
        continue;
      }
      guestCount.options[i].disabled = true;
    }
  } else if (evt.target.value === '3') {
    guestCount.value = '3';
    for (i = 0; i < guestCount.options.length; i++) {
      if (i !== 3) {
        continue;
      }
      guestCount.options[i].disabled = true;
    }
  } else {
    guestCount.value = '0';
    for (i = 0; i < guestCount.options.length; i++) {
      if (i === 3) {
        continue;
      }
      guestCount.options[i].disabled = true;
    }
  }
};

var renderInvalid = function (evt) {
  if (!evt.target.validity.valid) {
    evt.target.style.border = '2px solid red';
  }
};

timeIn.addEventListener('change', changeTimeOut);
houseType.addEventListener('change', changeMinPrice);
roomsCount.addEventListener('change', changeGuestCount);
adForm.addEventListener('invalid', renderInvalid, true);
adForm.addEventListener('submit', function () {
  adForm.reset();
});
