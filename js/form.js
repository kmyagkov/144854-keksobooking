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

  var onError = function (error) {
    var element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.bottom = '40px';
    element.style.left = '50%';
    element.style.width = '540px';
    element.style.background = 'url(http://img2.wikia.nocookie.net/__cb20140809161659/tannericus/images/c/cd/Famous-characters-Troll-face-Bad-Poker-Face-564817.png) 20px 20px no-repeat, #ED4545';
    element.style.backgroundSize = '50px 50px';
    element.style.margin = 'auto';
    element.style.padding = '20px 0 20px 30px';
    element.style.marginLeft = '-270px';
    element.style.textAlign = 'center';
    element.style.borderRadius = '20px';
    element.style.fontSize = '22px';
    element.style.color = '#fff';
    element.textContent = error;

    adForm.insertAdjacentElement('afterbegin', element);

    var closeBtn = document.createElement('span');
    closeBtn.innerHTML = '<img src="img/close.svg" width="22" height="22">';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.cursor = 'pointer';

    element.insertAdjacentElement('afterbegin', closeBtn);

    closeBtn.addEventListener('click', function (evt) {
      evt.stopPropagation();
      window.utils.hideElement(element);
    });

    setTimeout(function () {
      window.utils.hideElement(element);
    }, 3000);
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
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), setTimeout(formReset, 1000), onError);
  });

  window.form = {
    changeAdress: function (x, y) {
      addAdress.value = 'x: ' + parseInt(x, 10) + ', y: ' + parseInt(y, 10);
    }
  };

})();
