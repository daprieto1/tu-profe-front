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
                            vm.route.solution = vm.route.solution[0];
                            vm.route.city = _.find(CITIES, function (city) {
                                return city.id = vm.route.city;
                            });

                            console.log(vm.route);

                            _.each(vm.route.solution.routes, function (solution) {
                                solution.selected = false;
                                solution.distance = Math.round(solution.distance/1000);
                            });
                            var sum = _.reduce(vm.route.solution.routes, function (memo, route) { return memo + route.points.length; }, 0);
                            vm.avgPoints = sum / (vm.route.solution.routes.length === 0 ? 1 : vm.route.solution.routes.length);
                            vm.avgPoints = Math.round(vm.avgPoints);

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