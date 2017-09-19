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
    window.data.ads.forEach(function (it, i) {
      it.id = i;
    });

    var pins = document.querySelectorAll('.pin:not(.pin__main)');
    for (var i = 3; i < pins.length; i++) {
      window.utils.hideElement(pins[i]);
    }
  };

  window.backend.load(onLoad, window.error.showError);

  var closeDialog = function () {
    window.utils.hideElement(dialog);
    window.pin.deactivatePin(clickedPin);
  };

  var pinContainerClickHandler = function (evt) {
    var target = evt.target;
    if (target.className === 'rounded' && target.parentNode !== mainPin) {
      window.pin.activatePin(target.parentNode, clickedPin);
      clickedPin = window.pin.activatePin(target.parentNode, clickedPin);
      window.showCard.showCard(dialog);
      window.utils.focusElement(dialogCloseBtn);
    } else if (target.className === 'pin' && !target.classList.contains('pin__main')) {
      window.pin.activatePin(target, clickedPin);
      clickedPin = window.pin.activatePin(target, clickedPin);
      window.showCard.showCard(dialog);
      window.utils.focusElement(dialogCloseBtn);
    }
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
