(function () {
    'use strict';

    angular.module('routeModule')
        .controller('ViewRouteSolutionController', function ($scope, $location, $cookies, ServiceRoute, CITIES) {
            var vm = this;

            function initCtrl() {

                vm.route = $cookies.getObject('selectedRoute');

                if (angular.isDefined(vm.route)) {
                    ServiceRoute.getRoute(vm.route.id)
                        .then(function (response) {
                            vm.route = response;
                            vm.route.city = _.find(CITIES, function (city) {
                                return city.id = vm.route.city;
                            });

                            console.log(vm.route);

                            vm.route.solution = [
                                {
                                    name: 'Ruta 1',
                                    points: [
                                        {
                                            address: 'Carrera 19'
                                        }
                                    ]
                                }
                            ];

                        }, function (error) {
                            console.log(error);
                        });
                } else {
                    $location.path('/dashboard');
                }
            }

            initCtrl();
        });
})();