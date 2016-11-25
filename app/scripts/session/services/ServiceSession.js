(function() {

    'use strict';

    angular.module('sessionModule')
        .factory('ServiceSession', function($http, $resource, $rootScope) {

            var Session = $resource($rootScope.routeApi + '/session', {}, {
                signUp: {
                    method: 'POST',
                    url: $rootScope.routeApi + '/session/signup'
                },
                login: {
                    method: 'POST',
                    params: { username: '@username', password: '@password' },
                    url: $rootScope.routeApi + '/session/login',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            });

            return {
                login: function(username, password) {
                    return Session.login({ username: username, password: password }).$promise;
                },

                signUp: function(user) {
                    return Session.signUp({}, user).$promise;
                }

            };
        });
})();