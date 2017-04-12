(function () {
    'use strict';

    angular.module('interviewModule')
        .factory('InterviewServices', function ($resource, TU_PROFE_API) {
            var Interview = $resource(TU_PROFE_API + '/interviews/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/interviews',
                    method: 'PUT'
                },
                getAllActive: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/interviews/active/all',
                    isArray: true,
                    method: 'GET'
                },
                takePlace: {
                    params: { teacherId: '@teacherId', interviewId: '@interviewId' },
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/interviews/take-place',
                    method: 'POST'
                }
            })

            return {

                getAll: function () {
                    return Interview.query().$promise;
                },
                getAllActive: function () {
                    return Interview.getAllActive().$promise;
                },
                takePlace: function (teacherId, interviewId) {
                    return Interview.takePlace({ teacherId: teacherId, interviewId: interviewId }).$promise;
                }

            }
        });
})();