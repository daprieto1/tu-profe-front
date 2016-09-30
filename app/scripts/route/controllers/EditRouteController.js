(function () {
  'use strict';

  angular.module('routeModule')
    .controller('EditRouteController', function ($scope, $location, $cookies, ServiceUtils, HOUR_INIT_TYPES, DELIVERY_TYPES, ROUTE_TYPES, VEHICLE_TYPES, CITIES) {
      var vm = this;

      function initCtrl() {
        vm.cities = CITIES;
        vm.hourInitTypes = angular.copy(HOUR_INIT_TYPES);
        vm.deliveryTypes = angular.copy(DELIVERY_TYPES);
        vm.routeTypes = angular.copy(ROUTE_TYPES);
        vm.vehicleTypes = angular.copy(VEHICLE_TYPES);

        vm.route = $cookies.getObject('selectedRoute');
      }

      initCtrl();
    });
})();
