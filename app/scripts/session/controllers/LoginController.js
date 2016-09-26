(function () {

  'use strict';

  angular.module('sessionModule')

    .controller('LoginController', function ($scope, $location, $cookies, ServiceSession) {

      var vm = this;

      vm.login = function () {
        ServiceSession.login(vm.email, vm.password)
          .then(function (response) {
            $cookies.put('user', vm.email);
            $location.path('dashboard');
          }, function (error) {
            console.log(error);
          });
      };

      function initCtrl() {
        vm.email = undefined;
        vm.password = undefined;
      }

      initCtrl();
    });
})();
