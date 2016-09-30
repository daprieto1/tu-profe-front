(function () {
  'use strict';

  angular.module('routeModule')
    .controller('CreateRouteController', function ($scope, $location, $cookies, ServiceUtils, ServiceRoute, HOUR_INIT_TYPES, DELIVERY_TYPES, ROUTE_TYPES, VEHICLE_TYPES, CITIES) {
      var vm = this;

      vm.createRoute = function () {
        var newRoute = angular.copy(vm.newRoute);
        newRoute.city = vm.newRoute.city.id;
        newRoute.initHour = vm.newRoute.initHour.name;
        newRoute.deliveryType = vm.newRoute.deliveryType.name;
        newRoute.routeType = vm.newRoute.routeType.name;
        newRoute.owner = vm.user.id;

        ServiceRoute.saveRoute(newRoute)
          .then(function () {
            $location.path('/dashboard')
          }, function (error) {
            console.log(error);
          });
      };

      function initCtrl() {
        vm.user = $cookies.getObject('user');

        vm.cities = CITIES;
        vm.hourInitTypes = angular.copy(HOUR_INIT_TYPES);
        vm.deliveryTypes = angular.copy(DELIVERY_TYPES);
        vm.routeTypes = angular.copy(ROUTE_TYPES);
        vm.vehicleTypes = angular.copy(VEHICLE_TYPES);
        vm.newRoute = {};

      }

      initCtrl();
    });
})();
