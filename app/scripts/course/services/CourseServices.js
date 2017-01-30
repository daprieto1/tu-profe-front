(function() {
    'use strict';

    angular.module('courseModule')
        .factory('CourseServices', function($resource, TU_PROFE_API) {

            var Course = $resource(TU_PROFE_API + '/course/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/course',
                    method: 'PUT'
                }
            })

            return {

                getAll: function() {
                    return Course.query().$promise;
                }

            }
        });
})();