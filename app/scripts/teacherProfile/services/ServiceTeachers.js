(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .factory('ServiceTeachers', function ($resource, $http, TU_PROFE_API) {

            var Teacher = $resource(TU_PROFE_API + '/teacher/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/teacher',
                    method: 'PUT'
                }
            })

            return {
                getTeacher: function (id) {
                    return Teacher.get({ id: id }).$promise;
                },

                update: function (teacher) {
                    return Teacher.update({}, teacher).$promise;
                },

                uploadCurriculum: function (file, teacherId) {
                    var fd = new FormData();
                    fd.append('file', file);
                    fd.append('teacherId', teacherId)

                    return $http({
                        url: TU_PROFE_API + '/teacher/upload-curriculum',
                        method: 'POST',
                        data: fd,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    });
                },

                uploadPhoto: function (file, teacherId) {
                    var fd = new FormData();
                    fd.append('file', file);
                    fd.append('teacherId', teacherId)

                    return $http({
                        url: TU_PROFE_API + '/teacher/upload-photo',
                        method: 'POST',
                        data: fd,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    });
                }
            };
        });
})();