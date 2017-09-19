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

  var syncValuesWithGuest = function (elems, value) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = !value.includes(elems[i].value);
      if (!elems[i].disabled) {
        elems.value = elems[i].value;
      }
    }
  };

  var formInvalidHandler = function (evt) {
    if (!evt.target.validity.valid) {
      evt.target.style.border = '2px solid red';
    }
  };

  var formReset = function () {
    setTimeout(function () {
      adForm.reset();
    }, 1000)
    ;
  };

  timeIn.addEventListener('change', function () {
    window.synchronizeFields.syncFields(timeIn, timeOut, window.data.times, window.data.times, syncValues);
  });
  timeOut.addEventListener('change', function () {
    window.synchronizeFields.syncFields(timeOut, timeIn, window.data.times, window.data.times, syncValues);
  });
  houseType.addEventListener('change', function () {
    window.synchronizeFields.syncFields(houseType, price, window.data.houseTypes, window.data.houseTypes, syncValuesWithMin);
  });
  roomsCount.addEventListener('change', function () {
    window.synchronizeFields.syncFields(roomsCount, guestCount, GUEST_ROOMS, GUEST_ROOMS, syncValuesWithGuest);
  });
  adForm.addEventListener('invalid', formInvalidHandler, true);
  adForm.addEventListener('submit', function (evt) {
    if (addAdress.value === '') {
      evt.preventDefault();
      addAdress.style.border = '2px solid red';
      addAdress.setCustomValidity('Заполните поле');
    }
    evt.preventDefault();
    window.backend.save(new FormData(adForm), formReset, window.error.showError);
  });

  window.form = {
    changeAdress: function (x, y) {
      addAdress.value = 'x: ' + parseInt(x, 10) + ', y: ' + parseInt(y, 10);
    }
  };

})();
