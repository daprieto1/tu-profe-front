(function () {

    'use strict';
    angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null
    }

    angular.module('tuProfeApp', [
        'ngRoute',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'mm.foundation',
        'multipleSelect',
        'rzModule',
        'environment',
        'file-model',
        'LocalStorageModule',
        'sessionModule',
        'courseModule',
        'schoolModule',
        'professionModule',
        'interviewModule',
        'trainingModule',
        'teacherProfileModule',
        'studentProfileModule',
        'advisoryServiceModule',
        'advisorySessionModule',
        'notificationModule',
        'scheduleModule',
        'cityModule'
    ])

        .config(function ($routeProvider, $locationProvider, $cookiesProvider, envServiceProvider, localStorageServiceProvider) {


            $cookiesProvider.defaults.path = '/';

            localStorageServiceProvider
                .setPrefix('tu-profe')
                .setStorageType('localStorage');

            $routeProvider
                .when('/', {
                    templateUrl: 'views/home/home.html'
                })
                .when('/team', {
                    templateUrl: 'views/home/team.html'
                })
                .when('/about-us', {
                    templateUrl: 'views/home/aboutUs.html'
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
                    heroku: ['tu-profe-front.herokuapp.com'],
                    AWS_DEV: ['ec2-52-10-106-252.us-west-2.compute.amazonaws.com']
                },
                vars: {
                    local: {
                        apiUrl: 'http://localhost:8080/api',
                        S3TuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe',
                        CloudFrontTuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe'
                    },
                    c9: {
                        apiUrl: 'https://tu-profe-api-node-diegoprieto.c9users.io:8080/api',
                        S3TuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe',
                        CloudFrontTuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe'
                    },
                    heroku: {
                        apiUrl: 'https://tu-profe-api-node.herokuapp.com/api',
                        S3TuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe',
                        CloudFrontTuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe'
                    },
                    AWS_DEV: {
                        apiUrl: 'http://52.10.106.252:8080/api',
                        S3TuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe',
                        CloudFrontTuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe'
                    }
                }
            });

            envServiceProvider.check();


        })

        .run(function ($rootScope, $location, envService) {

            $rootScope.CloudFrontTuProfe = envService.read('CloudFrontTuProfe');
            $rootScope.$apply(function () {
                angular.element(document).foundation();
            });

        });

})();