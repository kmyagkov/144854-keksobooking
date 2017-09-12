'use strict';

(function () {

  var GUEST_ROOMS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var adForm = document.querySelector('.notice__form');
  var addAdress = adForm.querySelector('#address');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var houseType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var guestCount = adForm.querySelector('#capacity');
  var guestCountOptions = guestCount.querySelectorAll('option');
  var roomsCount = adForm.querySelector('#room_number');

  var syncValues = function (elem, value) {
    elem.value = value;
  };

  var syncValuesWithMin = function (elem, value) {
    elem.setAttribute('min', window.data.houseTypes[value].minPrice);
    elem.value = window.data.houseTypes[value].minPrice;
  };

  var syncValuesWithGuest = function (elem, value) {
    for (var i = 0; i < guestCountOptions.length; i++) {
      guestCountOptions[i].disabled = !GUEST_ROOMS[value].includes(guestCountOptions[i].value);
      if (!guestCountOptions[i].disabled) {
        elem.value = guestCountOptions[i].value;
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

  timeIn.addEventListener('change', function () {
    window.synchronizeFields.syncFields(timeIn, timeOut, syncValues);
  });
  houseType.addEventListener('change', function () {
    window.synchronizeFields.syncFields(houseType, price, syncValuesWithMin);
  });
  roomsCount.addEventListener('change', function () {
    window.synchronizeFields.syncFields(roomsCount, guestCount, syncValuesWithGuest);
  });
  adForm.addEventListener('invalid', renderInvalid, true);
  adForm.addEventListener('submit', function () {
    setTimeout(formReset, 1000);
  });

  window.form = {
    changeAdress: function (x, y) {
      addAdress.value = 'x: ' + parseInt(x, 10) + ', y: ' + parseInt(y, 10);
    }
  };

})();
