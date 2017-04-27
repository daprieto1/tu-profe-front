(function () {

    'use strict';

    angular.module('sessionModule')
        .factory('ServiceSession', function ($http, $resource, envService) {
console.log(envService);
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
                },
                signUpStudent: {
                    method: 'POST',
                    url: TU_PROFE_API + '/session/student/signup'
                },
                loginStudent: {
                    method: 'POST',
                    params: { username: '@username', password: '@password' },
                    url: TU_PROFE_API + '/session/student/login'
                }
            });

            return {
                loginTeacher: function (username, password) {
                    return Session.loginTeacher({ username: username, password: password }).$promise;
                },

                signUpTeacher: function (teacher) {
                    return Session.signUpTeacher({}, teacher).$promise;
                },

                loginStudent: function (username, password) {
                    return Session.loginStudent({ username: username, password: password }).$promise;
                },

                signUpStudent: function (student) {
                    return Session.signUpStudent({}, student).$promise;
                }

            };
        });
})();