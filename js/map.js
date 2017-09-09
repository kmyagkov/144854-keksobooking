'use strict';

(function () {

  var dialog = document.querySelector('.dialog');
  var dialogCloseBtn = dialog.querySelector('.dialog__close');
  var pinContainer = document.querySelector('.tokyo__pin-map');
  var clickedPin = null;

  window.pin.renderPins(window.data.getAds, pinContainer);

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
    window.utils.showElement(dialog);
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
})();
