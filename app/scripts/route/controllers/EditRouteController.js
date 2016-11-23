(function() {
    'use strict';

    angular.module('routeModule')
        .controller('EditRouteController', function($scope, $location, $cookies, ServiceUtils, ServiceRoute, HOUR_INIT_TYPES, DELIVERY_TYPES, ROUTE_TYPES, VEHICLE_TYPES, CITIES) {
            var vm = this;

            vm.update = function() {
                var newRoute = angular.copy(vm.route);
                newRoute.city = vm.route.city.id;
                newRoute.initHour = vm.route.initHour.name;
                newRoute.deliveryType = vm.route.deliveryType.name;
                newRoute.routeType = vm.route.routeType.name;

                ServiceRoute.update(newRoute)
                    .then(function() {
                        $location.path('/dashboard');
                    }, function(error) {
                        console.log(error);
                    });
            };

            function initCtrl() {
                vm.cities = CITIES;
                vm.hourInitTypes = angular.copy(HOUR_INIT_TYPES);
                vm.deliveryTypes = angular.copy(DELIVERY_TYPES);
                vm.routeTypes = angular.copy(ROUTE_TYPES);
                vm.vehicleTypes = angular.copy(VEHICLE_TYPES);

                vm.route = $cookies.getObject('selectedRoute');
                vm.route.city = _.findWhere(vm.cities, { id: vm.route.city });
                vm.route.deliveryType = _.findWhere(vm.deliveryTypes, { name: vm.route.deliveryType });
                vm.route.initHour = _.findWhere(vm.hourInitTypes, { name: vm.route.initHour });
                vm.route.routeType = _.findWhere(vm.routeTypes, { name: vm.route.routeType });
            }

            initCtrl();
        });
})();