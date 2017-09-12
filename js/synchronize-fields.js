'use strict';

(function () {

  window.synchronizeFields = {
    syncFields: function (elem1, elem2, action) {
      if (elem1.value !== elem2.value) {
        action(elem2, elem1.value);
      }
    }
  };
})();
