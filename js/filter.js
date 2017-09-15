'use strict';

(function () {

  var pinContainer = document.querySelector('.tokyo__pin-map');
  var filters = document.querySelector('.tokyo__filters');
  var filterType = filters.querySelector('#housing_type');
  var filterPrice = filters.querySelector('#housing_price');
  var filterRooms = filters.querySelector('#housing_room-number');
  var filterGuests = filters.querySelector('#housing_guests-number');
  var filterFeatures = filters.querySelectorAll('input[name="feature"]');

  var clearPins = function () {
    var pins = document.querySelectorAll('.pin:not(.pin__main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

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

  var setFilters = function () {
    var houseFeatures = [].filter.call(filterFeatures, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.data.ads.filter(function (item) {
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
    });
  };

  var renderFilterPins = function () {
    window.data.ads = window.data.adsFilter;
    clearPins();
    window.data.ads = setFilters();
    window.pin.renderPins(window.data.ads, pinContainer, window.data.ads.length);
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
