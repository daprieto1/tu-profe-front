(function() {

    'use strict';

    angular.module('sessionModule')
        .factory('ServiceSession', function($http, $resource) {

            var Session = $resource('http://localhost:8080/session', {}, {
                signUp: {
                    method: 'POST',
                    url: 'http://localhost:8080/session/signup'
                },
                login: {
                    method: 'POST',
                    params: { username: '@username', password: '@password' },
                    url: 'http://localhost:8080/session/login',
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