'use strict';

(function () {

  var filters = document.querySelector('.tokyo__filters');
  var filterType = filters.querySelector('#housing_type');
  var filterPrice = filters.querySelector('#housing_price');
  var filterRooms = filters.querySelector('#housing_room-number');
  var filterGuests = filters.querySelector('#housing_guests-number');
  var filterFeatures = filters.querySelectorAll('input[name="feature"]');

  var setFilterTypes = function (filterValue, itemValue) {
    return filterValue === 'any' || itemValue === filterValue;
  };

  var setFilterPrice = function (filterValue, price) {
    switch (filterValue) {
      case 'middle':
        return price >= 10000 && price < 50000;
      case 'low':
        return price < 10000;
      case 'high':
        return price >= 50000;
      default:
        return true;
    }
  };

  var setFilterFeatures = function (filteredFeatures, itemFeatures) {
    for (var i = 0; i < filteredFeatures.length; i++) {
      if (itemFeatures.indexOf(filteredFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var checkVisibility = function (item) {
    var houseFeatures = [].filter.call(filterFeatures, function (featureItem) {
      return featureItem.checked;
    }).map(function (featureItem) {
      return featureItem.value;
    });

    return setFilterTypes(filterType.value, item.offer.type) &&
    setFilterTypes(filterRooms.value, item.offer.rooms) &&
    setFilterPrice(filterPrice.value, item.offer.price) &&
    setFilterTypes(filterRooms.value, String(item.offer.rooms)) &&
    setFilterTypes(filterGuests.value, String(item.offer.guests)) &&
    setFilterFeatures(houseFeatures, item.offer.features);
  };

  var renderFilterPins = function () {
    window.data.ads.forEach(function (pin) {
      var isVisible = checkVisibility(pin);
      var filteredPin = document.querySelector('div[data-id="' + pin.id + '"]');
      if (isVisible) {
        window.utils.showElement(filteredPin);
      } else {
        window.utils.hideElement(filteredPin);
      }
    });
  };

  var onFilterChange = function (evt) {
    if (!evt.target.classList.contains('tokyo__filter') &&
      evt.target.name !== 'feature') {
      return;
    }
    window.debounce(renderFilterPins);
  };

  filters.addEventListener('change', onFilterChange);

})();
