'use strict';

(function () {

  var HOUSING_TYPES = {
    'bungalo': {
      'title': 'Лачуга',
      'minPrice': 0
    },
    'flat': {
      'title': 'Квартира',
      'minPrice': 1000
    },
    'house': {
      'title': 'Дом',
      'minPrice': 5000
    },
    'palace': {
      'title': 'Дворец',
      'minPrice': 10000
    }
  };
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var similarAdsTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  var getSimilarAds = function (titles, types, times, features, adsCount) {
    var array = [];
    var timesLength = times.length;
    var featuresLength = features.length;
    for (var i = 0; i < adsCount; i++) {
      var locationX = window.utils.getRandomInt(300, 900);
      var locationY = window.utils.getRandomInt(200, 600);
      array.push({
        'author': {
          'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
        },
        'offer': {
          'title': titles[i],
          'adress': locationX + ', ' + locationY,
          'price': window.utils.getRandomInt(1000, 1000000),
          'type': window.utils.getRandomObjProp(types),
          'rooms': window.utils.getRandomInt(1, 5),
          'guests': window.utils.getRandomInt(0, 100),
          'checkin': times[window.utils.getRandomInt(0, timesLength - 1)],
          'checkout': times[window.utils.getRandomInt(0, timesLength - 1)],
          'features': features.slice(0, window.utils.getRandomInt(1, featuresLength - 1)),
          'description': '',
          'photos': []
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      });
    }
    return array;
  };

  var similarAds = getSimilarAds(similarAdsTitles, HOUSING_TYPES, CHECK_TIMES, FEATURES_ITEMS, similarAdsTitles.length);

  window.data = {
    ads: similarAds,
    adsFilter: [],
    houseTypes: HOUSING_TYPES,
    times: CHECK_TIMES
  };

})();
