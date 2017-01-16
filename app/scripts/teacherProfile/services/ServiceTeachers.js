(function () {
    'use strict';

    angular.module('teacherProfileModule')
        .factory('ServiceTeachers', function ($rootScope, $resource, $http) {

            var Teacher = $resource($rootScope.routeApi + '/teacher/:id', { id: '@id' }, {
                update: {
                    url: $rootScope.routeApi + '/teacher',
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
                        url: $rootScope.routeApi + '/teacher/upload-curriculum',
                        method: 'POST',
                        data: fd,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    });
                }
            };
        });
})();