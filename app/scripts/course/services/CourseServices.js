(function () {
    'use strict';

    angular.module('courseModule')
        .factory('CourseServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Course = $resource(TU_PROFE_API + '/courses/:id', { id: '@id' });

            return {

                getAll: function () {
                    return Course.query().$promise;
                }

            }
        });
})();