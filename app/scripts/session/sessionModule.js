(function () {

  'use strict';

  angular.module('sessionModule', [])

    .run(function ($cookies, $location, $rootScope, $route) {

      $rootScope.isAuthenticated = function () {
        return angular.isDefined($cookies.getObject('user'));
      };

      $rootScope.logout = function () {
        $cookies.remove('user');
        delete $rootScope.user;
        $location.path('/login');
      };

      var user = $cookies.getObject('user');
      if (angular.isDefined(user)) {
        $rootScope.user = user;
        $route.reload();
      } else {
        $location.path('/login');
      }

    });
})();
