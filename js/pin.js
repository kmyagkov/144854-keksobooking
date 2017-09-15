'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 75;
  var IMAGE_WIDTH = 40;
  var IMAGE_HEIGHT = 40;

  var createPin = function (similarItem, pinWidth, pinHeight, imageWidth, imageHeight, index) {
    var pin = document.createElement('div');
    pin.classList.add('pin');
    pin.setAttribute('data-id', index);
    pin.setAttribute('tabindex', index + 2);
    pin.style.left = similarItem.location.x - pinWidth / 2 + 'px';
    pin.style.top = similarItem.location.y - pinHeight + 'px';

    var image = document.createElement('img');
    image.className = 'rounded';
    image.src = similarItem.author.avatar;
    image.alt = 'Pin';
    image.width = imageWidth;
    image.height = imageHeight;

    pin.appendChild(image);

    return pin;
  };

  window.pin = {
    renderPins: function (array, element, pinsCount) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pinsCount; i++) {
        fragment.appendChild(createPin(array[i], PIN_WIDTH, PIN_HEIGHT, IMAGE_WIDTH, IMAGE_HEIGHT, i));
      }
      element.appendChild(fragment);
    },
    activatePin: function (node, activeElem) {
      var pinId = node.getAttribute('data-id');
      if (activeElem) {
        activeElem.classList.remove('pin--active');
      }
      activeElem = node;
      activeElem.classList.add('pin--active');

      window.card.createOffer(window.data.ads[pinId]);

      return activeElem;
    },
    deactivatePin: function (activeElem) {
      activeElem.classList.remove('pin--active');
    }
  };
})();
