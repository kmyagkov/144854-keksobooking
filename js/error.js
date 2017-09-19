'use strict';

(function () {
  var onError = function (error) {
    var body = document.querySelector('body');
    var element = document.createElement('div');

    element.classList.add('error-message');
    element.textContent = error;

    body.insertAdjacentElement('afterbegin', element);

    var closeBtn = document.createElement('span');
    var closeBtnImg = document.createElement('img');

    closeBtnImg.src = 'img/close.svg';
    closeBtnImg.width = '22';
    closeBtnImg.height = '22';

    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.cursor = 'pointer';

    closeBtn.insertAdjacentElement('afterbegin', closeBtnImg);
    element.insertAdjacentElement('afterbegin', closeBtn);

    closeBtn.addEventListener('click', function (evt) {
      evt.stopPropagation();
      window.utils.hideElement(element);
    });

    setTimeout(function () {
      window.utils.hideElement(element);
    }, 3000);
  };
  window.error = {
    showError: onError
  };
})();
