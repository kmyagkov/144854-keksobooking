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
  var roomsCount = adForm.querySelector('#room_number');

  var syncValues = function (elem, value) {
    elem.value = value;
  };

  var syncValuesWithMin = function (elem, value) {
    elem.min = value.minPrice;
    elem.value = value.minPrice;
  };

  var syncValuesWithGuest = function (elem, value) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = !value.includes(elem[i].value);
      if (!elem[i].disabled) {
        elem.value = elem[i].value;
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
    window.synchronizeFields.syncFields(timeIn, timeOut, window.data.times, window.data.times, syncValues);
  });
  houseType.addEventListener('change', function () {
    window.synchronizeFields.syncFields(houseType, price, window.data.houseTypes, window.data.houseTypes, syncValuesWithMin);
  });
  roomsCount.addEventListener('change', function () {
    window.synchronizeFields.syncFields(roomsCount, guestCount, GUEST_ROOMS, GUEST_ROOMS, syncValuesWithGuest);
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
