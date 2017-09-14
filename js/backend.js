'use strict';

(function () {

  var GET_URL = 'https://1510.dump.academy/keksobooking/data';
  var POST_URL = 'https://1510.dump.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', GET_URL);

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Ошибка ' + xhr.status + ': Неверный запрос';
            break;
          case 404:
            error = 'Ошибка ' + xhr.status + ': Ничего не найдено';
            break;
          case 500:
            error = 'Ошибка ' + xhr.status + ': Внутренняя ошибка сервера';
            break;
          default:
            error = 'Ошибка ' + xhr.status + ': ' + xhr.statusText;
            break;
        }
        if (error) {
          onError(error);
        }
      });

      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', POST_URL);

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Ошибка ' + xhr.status + ': Неверный запрос';
            break;
          case 404:
            error = 'Ошибка ' + xhr.status + ': Ничего не найдено';
            break;
          case 500:
            error = 'Ошибка ' + xhr.status + ': Внутренняя ошибка сервера';
            break;
          default:
            error = 'Ошибка ' + xhr.status + ': ' + xhr.statusText;
            break;
        }
        if (error) {
          onError(error);
        }
      });

      xhr.send(data);
    }
  };
})();
