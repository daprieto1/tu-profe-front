(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .factory('ServiceTeachers', function ($resource, $http, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Teacher = $resource(TU_PROFE_API + '/teachers/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/teachers',
                    method: 'PUT'
                },
                activateAccount: {
                    url: TU_PROFE_API + '/teachers/activate-account/:id',
                    params: { id: '@id' },
                    method: 'POST'
                },
                acceptGameRules: {
                    url: TU_PROFE_API + '/teachers/accept-game-rules/:id',
                    params: { id: '@id' },
                    method: 'POST'
                },
                takeExam: {
                    url: TU_PROFE_API + '/teachers/take-exam/:id',
                    params: { id: '@id' },
                    method: 'POST'
                }
            })

            return {
                getTeacher: function (id) {
                    return Teacher.get({ id: id }).$promise;
                },

                update: function (teacher) {
                    return Teacher.update({ id: teacher.id }, teacher).$promise;
                },

                activateAccount: function (teacherId) {
                    return Teacher.activateAccount({ id: teacherId }).$promise;
                },

                acceptGameRules: function (teacherId) {
                    return Teacher.acceptGameRules({ id: teacherId }).$promise;
                },

                takeExam: function (teacherId, exam) {
                    return Teacher.takeExam({ id: teacherId }, exam).$promise;
                },

                uploadCurriculum: function (file, teacherId) {
                    var fd = new FormData();
                    fd.append('file', file);

                    return $http({
                        url: TU_PROFE_API + '/teachers/curriculum/' + teacherId,
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