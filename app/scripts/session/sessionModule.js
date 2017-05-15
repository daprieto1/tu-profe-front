(function () {

    'use strict';

    angular.module('sessionModule', [])

        .config(function ($routeProvider, $locationProvider, $httpProvider) {

            $routeProvider
                .when('/login', {
                    templateUrl: 'views/session/login.html'
                })
                .when('/teacher-sign-up', {
                    templateUrl: 'views/session/teacherSignUp.html'
                })
                .when('/student-sign-up', {
                    templateUrl: 'views/session/studentSignUp.html'
                });

            var AuthAppConfig = {
                useAuthTokenHeader: true
            };

            /**
             * http interceptor to scan requests and responses.
             */
            $httpProvider.interceptors.push(function ($q, $rootScope, $cookies, $injector) {
                return {
                    /**
                     * Http interceptor to scan error responses.
                     * @param rejection
                     * @returns {*}
                     */
                    responseError: function (rejection) {
                        var status = rejection.status;
                        var method = rejection.method;
                        var url = rejection.url;
                        if (status === 403) {
                            $location.path('/login');
                        } else {
                            $rootScope.error = method + ' on ' + url + ' failed with status ' + status;
                        }
                        return $q.reject(rejection);
                    },
                    /**
                     * http interceptor to scan each request.
                     * @param config
                     * @returns {*}
                     */
                    request: function (config) {
                        if (angular.isDefined($cookies.get('token'))) {
                            var authToken = $cookies.get('token');
                            if (AuthAppConfig.useAuthTokenHeader) {
                                config.headers['access_token'] = authToken;
                            } else {
                                config.url = config.url + '?token=' + authToken;
                            }
                        }
                        return config || $q.when(config);
                    }
                };
            });
        })

        .run(function ($cookies, $location, $rootScope, $route, ServiceSession) {

            $rootScope.isAuthenticated = function () {
                return angular.isDefined($cookies.getObject('user'));
            };

            $rootScope.$on('$routeChangeStart', function (event, p1, p2) {
                if ($rootScope.isAuthenticated()) {
                    $rootScope.user = $cookies.getObject('user');
                    switch ($location.path()) {
                        case '/signup':
                        case '/login':
                            $location.path('/dashboard');
                            break;
                        default:
                            break;
                    }
                } else {
                    switch ($location.path()) {
                        case '/signup':
                            break;
                        default:
                            //$location.path('/teacher-profile');
                            //$location.path('/login');
                            break;
                    }
                }
            });

            $rootScope.logout = function () {
                $cookies.remove('username');
                $cookies.remove('token');
                $cookies.remove('userId');
                $location.path('/login');
            };

            $rootScope.loginTeacher = function (username, password) {
                return ServiceSession.loginTeacher(username, password)
                    .then(function (token) {                        
                        $cookies.put('username', token.user.username);
                        $cookies.put('token', token.token);
                        $cookies.put('userId', token.user.userId);
                        $location.path('teacher-profile');
                    });
            };

            $rootScope.loginStudent = function (username, password) {
                return ServiceSession.loginStudent(username, password)
                    .then(function (token) {                        
                        $cookies.put('username', token.user.username);
                        $cookies.put('token', token.token);
                        $cookies.put('userId', token.user.userId);
                        $location.path('student-profile');
                    });
            };

        });
})();