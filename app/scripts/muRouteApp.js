(function () {

  'use strict';

  angular.module('muRouteApp', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'mm.foundation',
    'sessionModule',
    'routeModule'])

    .config(function ($routeProvider, $cookiesProvider) {

      $cookiesProvider.defaults.path = '/';

      $routeProvider
        .when('/', {
          templateUrl: 'views/session/login.html'
        })
        .when('/login', {
          templateUrl: 'views/session/login.html'
        })
        .when('/dashboard', {
          templateUrl: 'views/route/list.html'
        })
        .otherwise({
          templateUrl: '/'
        });

    })

    .run(function ($rootScope, CITIES) {
      console.log(CITIES); 
      $rootScope.$apply(function () {
        angular.element(document).foundation();
      });

    });

})();
