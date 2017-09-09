'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    getRandomInt: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomObjProp: function (obj) {
      var arr = Object.keys(obj);
      return arr[window.utils.getRandomInt(0, arr.length - 1)];
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    showElement: function (elem) {
      elem.classList.remove('hidden');
    },
    hideElement: function (elem) {
      elem.classList.add('hidden');
    },
    focusElement: function (elem) {
      elem.focus();
    }
  };
})();
