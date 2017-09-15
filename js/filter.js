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

  var setFilterPrice = function (price) {
    var currentValue = filterPrice.value;
    switch (currentValue) {
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

    if (!setFilterTypes(filterType.value, item.offer.type)) {
      return false;
    }
    if (!setFilterPrice(item.offer.price)) {
      return false;
    }
    if (!setFilterTypes(filterRooms.value, item.offer.rooms + '')) {
      return false;
    }
    if (!setFilterTypes(filterGuests.value, item.offer.guests + '')) {
      return false;
    }
    if (!setFilterFeatures(houseFeatures, item.offer.features)) {
      return false;
    }
    return true;
  };

  var renderFilterPins = function () {
    var pins = document.querySelectorAll('.pin:not(.pin__main)');
    window.data.ads.forEach(function (pin, i) {
      var isVisible = checkVisibility(pin);
      if (isVisible) {
        window.utils.showElement(document.querySelector('div[data-id="' + pin.id + '"]'));
      } else {
        window.utils.hideElement(pins[i]);
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
