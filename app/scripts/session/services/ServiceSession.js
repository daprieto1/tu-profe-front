(function() {

    'use strict';

    angular.module('sessionModule')
        .factory('ServiceSession', function($http, $resource) {

            var Session = $resource('http://localhost:8080/session', {}, {
                signUp: {
                    method: 'POST',
                    url: 'http://localhost:8080/session/signup',
                    isArray: true,
                    withCredentials: true
                }
            });

            return {
                login: function(email, password) {
                    var req = {
                        method: 'POST',
                        url: 'http://localhost:1337/login',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            email: email,
                            password: password
                        }
                    };

                    return $http(req);
                },

                signUp: function(user) {
                    return Session.signUp({}, user).$promise;
                }

            };
        });
})();