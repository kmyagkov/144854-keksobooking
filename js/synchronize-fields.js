'use strict';

(function () {

  window.synchronizeFields = {
    syncFields: function (sourceElement, targetElement, sourceElementValues, targetElementValues, action) {
      var sourceElementValue = sourceElement.value;
      var targetElementValue;
      if (Array.isArray(sourceElementValues) && Array.isArray(targetElementValues)) {
        targetElementValue = targetElementValues[sourceElementValues.indexOf(sourceElementValue)];
      } else {
        targetElementValue = targetElementValues[sourceElementValue];
      }
      action(targetElement, targetElementValue);
    }
  };
})();
