(function () {
  'use strict';
  angular.module('routeModule', [])

    .config(function ($routeProvider) {
      $routeProvider
        .when('/route/create', {
          templateUrl: 'views/route/create.html'
        })
        .when('/route/view', {
          templateUrl: 'views/route/view.html'
        })
        .when('/route/view-solution', {
          templateUrl: 'views/route/viewSolution.html'
        })
        .when('/route/edit', {
          templateUrl: 'views/route/edit.html'
        })
    });
})();
