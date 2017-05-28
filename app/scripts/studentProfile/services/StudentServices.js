(function () {
    'use strict';

    angular.module('studentProfileModule')
        .factory('ServiceStudents', function ($resource, $http, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Student = $resource(TU_PROFE_API + '/students/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/students',
                    method: 'PUT'
                }
            })

            return {
                getStudent: function (id) {
                    return Student.get({ id: id }).$promise;
                },

                update: function (student) {
                    return Student.update({ id: student.id }, student).$promise;
                },

                uploadPhoto: function (file, studentId) {
                    var fd = new FormData();
                    fd.append('file', file);
                    fd.append('studentId', studentId)

                    return $http({
                        url: TU_PROFE_API + '/students/photo/' + studentId,
                        method: 'POST',
                        data: fd,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    });
                }
            };
        });
})();