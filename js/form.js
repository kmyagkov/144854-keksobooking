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
  var GUEST_ROOMS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var adForm = document.querySelector('.notice__form');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var houseType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var guestCount = adForm.querySelector('#capacity');
  var guestCountOptions = guestCount.querySelectorAll('option');
  var roomsCount = adForm.querySelector('#room_number');

  var changeTimeOut = function (evt) {
    timeOut.value = evt.target.value;
  };

  var changeMinPrice = function (evt) {
    price.setAttribute('min', HOUSING_TYPES[evt.target.value].minPrice);
    price.value = HOUSING_TYPES[evt.target.value].minPrice;
  };

  var changeGuestCount = function () {
    for (var i = 0; i < guestCountOptions.length; i++) {
      guestCountOptions[i].disabled = !GUEST_ROOMS[roomsCount.value].includes(guestCountOptions[i].value);
      if (!guestCountOptions[i].disabled) {
        guestCount.value = guestCountOptions[i].value;
      }
    }
  };

  var renderInvalid = function (evt) {
    if (!evt.target.validity.valid) {
      evt.target.style.border = '2px solid red';
    }
  };

  var formReset = function () {
    adForm.reset();
  };

  timeIn.addEventListener('change', changeTimeOut);
  houseType.addEventListener('change', changeMinPrice);
  roomsCount.addEventListener('change', changeGuestCount);
  adForm.addEventListener('invalid', renderInvalid, true);
  adForm.addEventListener('submit', function () {
    setTimeout(formReset, 1000);
  });

})();
