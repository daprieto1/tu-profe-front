(function () {
    'use strict';

    angular.module('interviewModule')
        .factory('InterviewServices', function ($resource) {
            var Interview = $resource(TU_PROFE_API + '/interview/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/interview',
                    method: 'PUT'
                }
            })

            return {

                getAll: function () {
                    return Interview.query().$promise;
                }

            }
        });
})();