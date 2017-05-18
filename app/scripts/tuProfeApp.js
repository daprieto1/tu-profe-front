(function () {

    'use strict';
    angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null
    }

    angular.module('tuProfeApp', [
        'ngRoute',
        'ngCookies',
        'ngResource',
        'mm.foundation',
        'multipleSelect',
        'rzModule',
        'environment',
        'file-model',
        'sessionModule',
        'courseModule',
        'schoolModule',
        'professionModule',
        'interviewModule',
        'trainingModule',
        'teacherProfileModule',
        'studentProfileModule',
        'advisoryServiceModule',
        'notificationModule'
    ])

        .config(function ($routeProvider, $locationProvider, $cookiesProvider, envServiceProvider) {


            $cookiesProvider.defaults.path = '/';

            $routeProvider
                .when('/', {
                    templateUrl: 'views/home/home.html'
                })
                .when('/team', {
                    templateUrl: 'views/home/team.html'
                })
                .when('/quote', {
                    templateUrl: 'views/home/priceQuote.html'
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
                .when('/student-profile', {
                    templateUrl: 'views/studentProfile/studentProfile.html'
                })
                .otherwise({
                    templateUrl: '/'
                });

            envServiceProvider.config({
                domains: {
                    local: ['localhost'],
                    c9: ['tu-profe-front-diegoprieto.c9users.io'],
                    heroku: ['tu-profe-front.herokuapp.com']
                },
                vars: {
                    local: {
                        apiUrl: 'http://localhost:8080/api'
                    },
                    c9: {
                        apiUrl: 'https://tu-profe-api-node-diegoprieto.c9users.io:8080/api'
                    },
                    heroku: {
                        apiUrl: 'https://tu-profe-api-node.herokuapp.com/api'
                    }
                }
            });

            envServiceProvider.check();

        })

        .run(function ($rootScope, $location) {

            $rootScope.$apply(function () {
                angular.element(document).foundation();
            });

        });

})();