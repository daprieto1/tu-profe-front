(function () {

    'use strict';

    angular.module('sessionModule')
        .factory('ServiceSession', function ($http, $resource, envService) {

            var TU_PROFE_API = envService.read('apiUrl');
            var Session = $resource(TU_PROFE_API + '/session', {}, {
                signUpTeacher: {
                    method: 'POST',
                    url: TU_PROFE_API + '/session/teacher/signup'
                },
                loginTeacher: {
                    method: 'POST',
                    params: { username: '@username', password: '@password' },
                    url: TU_PROFE_API + '/session/teacher/login'
                }
            });

            return {
                loginTeacher: function (username, password) {
                    return Session.loginTeacher({ username: username, password: password }).$promise;
                },

                signUpTeacher: function (teacher) {
                    return Session.signUpTeacher({}, teacher).$promise;
                }

            };
        });
})();