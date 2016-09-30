(function () {
  'use strict';
  angular.module('routeModule')
    .controller('RoutesController', function ($scope, $cookies, $location, ServiceRoute) {
      var vm = this;

      vm.goToViewRoute = function (route) {
        $cookies.putObject('selectedRoute', route);
        $location.path('/route/view');
      };

      function initCtrl() {
        vm.user = $cookies.getObject('user');
        console.log(vm.user);
        ServiceRoute.getRoutesByUser(vm.user.id)
          .then(function (response) {
            vm.routes = response;
          }, function (error) {
            console.log(error);
          });
      }

      initCtrl();
    });
})();
