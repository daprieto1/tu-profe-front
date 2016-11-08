(function() {
    'use strict';

    angular.module('routeModule')
        .controller('ViewRouteController', function($scope, $cookies, $location, $route, ServiceRoute, ServicePoints, ServiceUtils, CITIES) {
            var vm = this;

            vm.isPossibleEdit = function() {
                if (vm.route.state === 'created' || vm.route.state === 'solved'){
                    return true;
                }else{
                    return false;
                }
            }

            vm.delete = function() {
                ServiceRoute.delete(vm.route.id)
                    .then(function() {
                        $location.path('/dashboard');
                    }, function(error) {
                        console.log(error);
                    });
            };

            vm.solve = function() {
                ServiceRoute.solve(vm.route.id)
                    .then(function(response) {
                        vm.route.solution = response;
                        $location.path('/route/view-solution');
                    }, function(error) {
                        vm.alert.show = true;
                        vm.alert.msg = angular.isDefined(error.data.message) ? error.data.message : 'Error solucionando el ruteo, contacte al administrador.';
                        vm.alert.type = 'alert';
                    });
            };

            vm.thereIsAddressSelected = function() {
                return angular.isUndefined(_.findWhere(vm.geolocalized, { selected: true })) && angular.isUndefined(_.findWhere(vm.noGeolocalized, { selected: true }));
            };

            vm.downloadAddress = function() {
                function parsePointToArray(point) {
                    var array = [];
                    array.push(point.address);
                    array.push(point.receiver);
                    return array;
                }

                Promise.resolve(_.map(vm.noGeolocalized, function(point) {
                        return parsePointToArray(point).join();
                    }))
                    .then(ServiceUtils.parseArrayToCSV)
                    .then(function(value) {
                        ServiceUtils.downloadData(value, 'noGeolocalized', 'csv');
                    });

            };

            /**
             * Make a bulk delete with the selected points but only in the tab selected.
             */
            vm.deleteAddressClose = function(deleteOption) {
                if (deleteOption) {
                    if (vm.tabSelected === 1) {
                        var array = _.where(vm.geolocalized, { selected: true });
                        array = _.map(array, function(point) { return { id: point.id }; });
                        ServicePoints.bulkDelete(vm.route.id, array)
                            .then(function() {
                                $route.reload();
                            });
                    } else if (vm.tabSelected === 2) {
                        var array = _.where(vm.noGeolocalized, { selected: true });
                        array = _.map(array, function(point) { return { id: point.id }; });
                        ServicePoints.bulkDelete(vm.route.id, array)
                            .then(function() {
                                $route.reload();
                            });
                    }
                }
                vm.deletePopup.close();
            };

            vm.deleteAddressOpen = function() {
                vm.numDeleteAddress = 0;
                if (vm.tabSelected === 1) {
                    vm.numDeleteAddress = _.filter(vm.geolocalized, function(point) {
                        return point.selected;
                    }).length;
                } else if (vm.tabSelected === 2) {
                    vm.numDeleteAddress = _.filter(vm.noGeolocalized, function(point) {
                        return point.selected;
                    }).length;
                }
                vm.deletePopup = new Foundation.Reveal($('#delete-address'));
                vm.deletePopup.open();
            };

            /**
             * Search .csv file from pc.
             */
            vm.searchFile = function() {
                vm.realInputFile.click();
            };

            vm.cancelLoad = function() {
                vm.totalUnits = 0;
                vm.newPoints = [];
                vm.fileContent = undefined;
                vm.popup.close();
            };

            vm.loadAddress = function() {

                vm.popup.close();

                ServicePoints.bulkSave(vm.route.id, vm.newPoints)
                    .then(function(response) {
                        $route.reload();
                    }, function(error) {
                        vm.alert.show = true;
                        vm.alert.msg = angular.isDefined(error.data.message) ? error.data.message : 'Error solucionando el ruteo, contacte al administrador.';
                        vm.alert.type = 'alert';
                    });

                vm.fileContent = undefined;

            };

            /**
             * Listen for changes in the selected file.
             */
            $scope.$watch('vm.fileContent', function(newValue) {
                if (angular.isDefined(newValue)) {
                    loadData();
                    vm.popup = new Foundation.Reveal($('#summary-load'));
                    vm.popup.open();
                }
            });

            $scope.$watch('vm.selectGeolocalized', function(value) {

                if (value) {
                    _.each(vm.geolocalized, function(point) {
                        point.selected = true;
                    });
                } else {
                    _.each(vm.geolocalized, function(point) {
                        point.selected = false;
                    });
                }

            });

            $scope.$watch('vm.selectNoGeolocalized', function(value) {

                if (value) {
                    _.each(vm.noGeolocalized, function(point) {
                        point.selected = true;
                    });
                } else {
                    _.each(vm.noGeolocalized, function(point) {
                        point.selected = false;
                    });
                }

            });

            function loadData() {
                vm.totalUnits = 0;
                vm.newPoints = _.map(ServiceUtils.parseCSVFileToArray(vm.fileContent).slice(1), function(point) {
                    vm.totalUnits += parseInt(point[1]);
                    return {
                        address: point[0],
                        units: parseInt(point[1]),
                        receiver: point[2],
                        receiverPhone: point[3],
                        comments: point[4],
                        city: vm.route.city.internalName,
                        route: vm.route.id
                    }
                });
                console.log(vm.newPoints);
            }

            function initCtrl() {

                vm.alert = {};
                vm.route = $cookies.getObject('selectedRoute');
                vm.newPoints = [];
                vm.realInputFile = angular.element('#real-input-file');
                vm.fileContent = undefined;
                vm.tabSelected = 1;

                vm.selectGeolocalized = false;

                if (angular.isDefined(vm.route)) {
                    ServiceRoute.getRoute(vm.route.id)
                        .then(function(response) {
                            vm.route = response;
                            moment.locale('es');
                            vm.route.initDate = moment(vm.route.initDate).format('dddd, D MMMM YYYY');
                            vm.route.city = _.find(CITIES, function(city) { return city.id == vm.route.city; });

                            var result = _.groupBy(vm.route.points, function(point) {
                                point.selected = false;
                                return angular.isUndefinedOrNull(point.coordinate);
                            });

                            vm.geolocalized = result.false;
                            vm.noGeolocalized = result.true;

                            console.log(vm.route);

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