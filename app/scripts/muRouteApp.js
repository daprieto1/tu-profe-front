(function () {

  'use strict';

  angular.module('muRouteApp', ['ngRoute', 'mm.foundation', 'sessionModule', 'routeModule'])

    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/session/login.html'
        })
        .when('/dashboard', {
          templateUrl: 'views/route/list.html'
        })
        .otherwise({
          templateUrl: '/'
        });

    })

    .run(function ($rootScope) {
      $rootScope.$apply(function () {
        angular.element(document).foundation();
      });

    });

})();
