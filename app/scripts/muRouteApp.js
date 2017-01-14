(function() {

    'use strict';
    angular.isUndefinedOrNull = function(val) {
        return angular.isUndefined(val) || val === null
    }

    angular.module('muRouteApp', [
        'ngRoute',
        'ngCookies',
        'ngResource',
        'mm.foundation',
        'sessionModule',
        'teacherProfileModule'
    ])

    .config(function($routeProvider, $cookiesProvider) {


        $cookiesProvider.defaults.path = '/';

        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html'
            })
            .when('/login', {
                templateUrl: 'views/session/login.html'
            })
            .when('/teacher-sign-up', {
                templateUrl: 'views/session/teacherSignUp.html'
            })
            .when('/teacher-profile', {
                templateUrl: 'views/teacherProfile/teacherProfile.html'
            })
            .otherwise({
                templateUrl: '/'
            });

    })

    .run(function($rootScope) {

        $rootScope.$apply(function() {
            $rootScope.routeApi = 'http://localhost:8080'
            angular.element(document).foundation();
        });

    });

})();