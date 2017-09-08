'use strict';

(function () {

  // var ENTER_KEYCODE = 13;

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

  //  Проблема при открытии попапа по enter. На первой метке работает, если переходить табом к следующим, просто открывается попап
  //  для первого пина.

  pinContainer.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, pinContainerClickHandler(evt));
    //    if (evt.keyCode === ENTER_KEYCODE) {
    //     pinContainerClickHandler(evt);
    //   }
  });

  pinContainer.addEventListener('click', pinContainerClickHandler);

  dialogCloseBtn.addEventListener('click', function () {
    closeDialog();
  });

  dialogCloseBtn.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closeDialog);
  });

  document.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, closeDialog);
  });
})();
