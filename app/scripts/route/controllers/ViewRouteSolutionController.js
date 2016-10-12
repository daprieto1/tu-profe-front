(function () {
    'use strict';

    angular.module('routeModule')
        .controller('ViewRouteSolutionController', function ($scope, $location, $cookies, ServiceRoute, CITIES) {
            var vm = this;

            vm.changeSelected = function (solution) {
                if (angular.isDefined(solution)) {
                    console.log(vm.route);
                    console.log(solution);
                    solution.selected = !solution.selected;            
                    console.log(solution);
                }
            };

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
                                    cost: 3000,
                                    points: [
                                        {
                                            address: 'Carrera 19'
                                        }
                                    ]
                                }
                            ];

                            _.each(vm.route.solution, function (solution) { solution.selected = false; });

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