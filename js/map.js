'use strict';

(function () {

  var MAIN_PIN_WIDTH = 75;
  var MAIN_PIN_HEIGHT = 94;

  var DRAG_LIMITS = {
    xMin: 0,
    xMax: 1130,
    yMin: 100,
    yMax: 570
  };

  var dialog = document.querySelector('.dialog');
  var dialogCloseBtn = dialog.querySelector('.dialog__close');
  var pinContainer = document.querySelector('.tokyo__pin-map');
  var clickedPin = null;
  var mainPin = pinContainer.querySelector('.pin__main');

  var onLoad = function (ads) {
    window.pin.renderPins(ads, pinContainer);
    window.data.ads = ads;
  };

  var onError = function (error) {
    var element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.top = '140px';
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

    pinContainer.insertAdjacentElement('afterbegin', element);

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

  window.backend.load(onLoad, onError);

  var closeDialog = function () {
    window.utils.hideElement(dialog);
    window.pin.deactivatePin(clickedPin);
  };

  var pinContainerClickHandler = function (evt) {
    var target = evt.target;
    if (target.className === 'rounded') {
      window.pin.activatePin(target.parentNode, clickedPin);
      clickedPin = window.pin.activatePin(target.parentNode, clickedPin);
    } else if (target.className === 'pin') {
      window.pin.activatePin(target, clickedPin);
      clickedPin = window.pin.activatePin(target, clickedPin);
    }
    window.showCard.showCard(dialog);
    window.utils.focusElement(dialogCloseBtn);
  };

  pinContainer.addEventListener('keydown', function (evt) {
    window.utils.enterEvent(evt, function () {
      pinContainerClickHandler(evt);
    });

  });

  pinContainer.addEventListener('click', pinContainerClickHandler);

  dialogCloseBtn.addEventListener('click', function () {
    closeDialog();
  });

  dialogCloseBtn.addEventListener('keydown', function (evt) {
    window.utils.enterEvent(evt, closeDialog);
  });

  document.addEventListener('keydown', function (evt) {
    window.utils.escEvent(evt, closeDialog);
  });

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var limitDrag = function (dragValue, minLimit, maxLimit) {
      if (dragValue > minLimit && dragValue < maxLimit) {
        return dragValue;
      } else if (dragValue <= minLimit) {
        return minLimit;
      } else {
        return maxLimit;
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.left = limitDrag(mainPin.offsetLeft - shift.x, DRAG_LIMITS.xMin, DRAG_LIMITS.xMax) + 'px';
      mainPin.style.top = limitDrag(mainPin.offsetTop - shift.y, DRAG_LIMITS.yMin, DRAG_LIMITS.yMax) + 'px';

      window.form.changeAdress(mainPin.style.left + MAIN_PIN_WIDTH / 2, mainPin.style.top + MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
