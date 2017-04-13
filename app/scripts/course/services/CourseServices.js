(function() {
    'use strict';

    angular.module('courseModule')
        .factory('CourseServices', function($resource, TU_PROFE_API) {

            var Course = $resource(TU_PROFE_API + '/courses/:id', { id: '@id' });

            return {

                getAll: function() {
                    return Course.query().$promise;
                }

            }
        });
})();