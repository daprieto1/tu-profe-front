(function () {
  'use strict';
  angular.module('routeModule', [])

    .config(function ($routeProvider) {
      $routeProvider
        .when('/route/create', {
          templateUrl: 'views/route/create.html'
        })
    });
})();
