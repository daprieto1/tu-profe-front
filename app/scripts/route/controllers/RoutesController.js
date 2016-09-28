(function () {
  'use strict';
  angular.module('routeModule')
    .controller('RoutesController', function ($scope, $cookies, ServiceRoute) {
      var vm = this;

      function initCtrl() {
        vm.user = $cookies.getObject('user');
        console.log(vm.user);
        ServiceRoute.getRoutesByUser(vm.user.id)
          .then(function (response) {
            vm.routes = response;
            console.log(response);
          }, function (error) {
            console.log(error);
          });
      }

      initCtrl();
    });
})();
