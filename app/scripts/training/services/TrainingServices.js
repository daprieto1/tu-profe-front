(function () {
    'use strict';

    angular.module('trainingModule')
        .factory('TrainingServices', function ($resource, TU_PROFE_API) {
            var Training = $resource(TU_PROFE_API + '/training/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/training',
                    method: 'PUT'
                }
            })

            return {

                getAll: function () {
                    return Training.query().$promise;
                },

                get: function (trainingId) {
                    return Training.get({ id: trainingId }).$promise;
                }

            }
        });
})();