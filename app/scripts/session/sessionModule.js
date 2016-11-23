(function() {

    'use strict';

    angular.module('sessionModule', [])

    .config(function($routeProvider, $locationProvider, $httpProvider) {
        var AuthAppConfig = {
            useAuthTokenHeader: true
        };

        /**
         * http interceptor to scan requests and responses.
         */
        $httpProvider.interceptors.push(function($q, $rootScope, $cookies, $injector) {
            return {
                /**
                 * Http interceptor to scan error responses.
                 * @param rejection
                 * @returns {*}
                 */
                responseError: function(rejection) {
                    var status = rejection.status;
                    var method = rejection.method;
                    var url = rejection.url;
                    if (status === 401) {
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
                request: function(config) {
                    if (angular.isDefined($cookies.get('user'))) {
                        console.log(config)
                    }
                    return config || $q.when(config);
                }
            };
        });
    })

    .run(function($cookies, $location, $rootScope, $route) {

        $rootScope.isAuthenticated = function() {
            return angular.isDefined($cookies.getObject('user'));
        };

        $rootScope.logout = function() {
            $cookies.remove('user');
            delete $rootScope.user;
            $location.path('/login');
        };

        $rootScope.$on('$routeChangeStart', function(event, p1, p2) {
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
                        $location.path('/login');
                        break;
                }
            }
        });

    });
})();