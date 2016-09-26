(function () {

  'use strict';

  angular.module('sessionModule')

    .controller('LoginController', function ($scope, $location) {

      var vm = this;

      vm.login = function () {
        $location.path('dashboard');
      };

      function initCtrl() {
        vm.email = undefined;
        vm.password = undefined;
      }

      initCtrl();
    });
})();
