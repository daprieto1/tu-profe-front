(function() {
    'use strict';
    angular.module('routeModule')
        .controller('RoutesController', function($scope, $cookies, $location, ServiceRoute) {
            var vm = this;

            vm.goToViewRoute = function(route) {
                $cookies.putObject('selectedRoute', route);
                $location.path('/route/view');
            };

            function initCtrl() {
                vm.loader = {
                    show: true,
                    message: 'Estamos recuperando la infromación de los ruteos.'
                };
                vm.user = $cookies.getObject('user');
                ServiceRoute.getRoutesByUser(vm.user.id)
                    .then(function(response) {
                        vm.routes = response;
                        vm.routes.forEach(function(route) {
                            route.initDate = moment(route.initDate).format('dddd, D MMMM YYYY');
                        });
                        console.log(vm.routes);
                        vm.loader.show = false;
                    }, function(error) {
                        console.log(error);
                    });
            }

            initCtrl();
        });
})();