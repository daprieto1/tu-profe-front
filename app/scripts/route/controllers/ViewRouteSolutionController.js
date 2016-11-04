(function() {
    'use strict';

    angular.module('routeModule')
        .controller('ViewRouteSolutionController', function($scope, $location, $cookies, ServiceSolution, ServiceUtils, CITIES) {
            var vm = this;

            vm.createSelectedRoutes = function() {
                var routesToCreate = vm.route.solution.routes.filter(function(route) {
                        return route.selected
                    })
                    .map(function(route) {
                        return { id: route.id };
                    });
                ServiceSolution.createRoutesInMu(vm.route.id, routesToCreate)
                    .then(function(response) {
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    });
                console.log(routesToCreate);
            };

            vm.sortBy = function(propertyName) {
                vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
                vm.propertyName = propertyName;
            };

            vm.downloadRoutes = function(flag) {

                function parseRouteToArray(route) {
                    var array = [];
                    var title = [];
                    var summary = [];

                    title.push('Cost');
                    title.push('Distance');
                    title.push('State');
                    title.push('Number of points');
                    array.push(title.join());

                    summary.push(route.cost);
                    summary.push(route.distance);
                    summary.push(route.isCreated ? 'created' : 'uncreated');
                    summary.push(route.points.length);
                    array.push(summary.join());

                    _.each(route.points, function(point) {
                        var pointArray = [];
                        pointArray.push(point.address);
                        pointArray.push(point.units);
                        pointArray.push(point.receiver);
                        pointArray.push(point.receiverPhone);
                        pointArray.push(point.comments);
                        array.push(pointArray.join());
                    });
                    array.push([' ']);
                    return array;
                }

                var routes;
                if (flag) {
                    var routes = _.filter(vm.route.solution.routes, function(route) { return route.selected });
                } else {
                    var routes = vm.route.solution.routes;
                }

                if (angular.isDefined(routes) && routes.length > 0) {
                    Promise.resolve(routes.map(parseRouteToArray).reduce(function(mem, route) { return mem.concat(route); }))
                        .then(ServiceUtils.parseArrayToCSV)
                        .then(function(value) {
                            ServiceUtils.downloadData(value, vm.route.id + 'routes', 'csv');
                        });
                } else {
                    vm.alert.show = true;
                    vm.alert.msg = 'No hay rutas seleccionadas para descargar';
                    vm.alert.type = 'alert';
                }
            };

            vm.changeSelected = function(route) {
                if (angular.isDefined(route)) {
                    route.selected = !route.selected;
                }
            };

            function initCtrl() {

                vm.route = $cookies.getObject('selectedRoute');
                vm.alert = {};
                vm.propertyName = 'distance';
                vm.reverse = false;

                if (angular.isDefined(vm.route)) {
                    ServiceSolution.getSolutionByRoute(vm.route.id)
                        .then(function(response) {
                            console.log(response);
                            vm.route.solution = response;
                            vm.route.city = _.find(CITIES, function(city) { return city.id == vm.route.city; });
                            moment.locale('es');
                            vm.route.initDate = moment(vm.route.initDate).format('dddd, D MMMM YYYY');

                            _.each(vm.route.solution.routes, function(route) {
                                route.selected = false;
                                route.show = false;
                                route.distance = Math.round(route.distance / 1000);
                            });

                            var sum = _.reduce(vm.route.solution.routes, function(memo, route) { return memo + route.points.length; }, 0);
                            vm.avgPoints = sum / (vm.route.solution.routes.length === 0 ? 1 : vm.route.solution.routes.length);
                            vm.avgPoints = Math.round(vm.avgPoints);

                            vm.route.cost = _.reduce(vm.route.solution.routes, function(memo, route) { return memo + route.cost; }, 0);
                            vm.avgCost = vm.route.cost / (vm.route.solution.routes.length === 0 ? 1 : vm.route.solution.routes.length);
                            vm.avgCost = Math.round(vm.avgCost);

                        }, function(error) {
                            console.log(error);
                        });
                } else {
                    $location.path('/dashboard');
                }
            }

            initCtrl();
        });
})();